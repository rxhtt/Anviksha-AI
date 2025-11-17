
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiAnalysisResponse } from '../types';

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        overallAssessment: { type: Type.STRING },
        isTuberculosisDetected: { type: Type.BOOLEAN },
        tuberculosisReport: { type: Type.STRING, nullable: true },
        findings: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    condition: { type: Type.STRING },
                    category: { 
                        type: Type.STRING,
                        description: "Must be one of: 'Pulmonary', 'Cardiac', 'Skeletal', 'Other'."
                    },
                    severity: { 
                        type: Type.STRING,
                        description: "Must be one of: 'Low', 'Medium', 'High', 'Critical'."
                    },
                    confidence: { type: Type.NUMBER },
                    description: { type: Type.STRING },
                    recommendation: { type: Type.STRING },
                    boundingBox: {
                        type: Type.ARRAY,
                        items: { type: Type.NUMBER },
                        nullable: true,
                        description: "An array of four numbers [x_min, y_min, x_max, y_max] representing the bounding box as percentages of the image dimensions."
                    },
                },
                required: ['condition', 'category', 'severity', 'confidence', 'description', 'recommendation'],
            },
        },
    },
    required: ['overallAssessment', 'isTuberculosisDetected', 'tuberculosisReport', 'findings'],
};

const prompt = `You are a professional radiologist AI assistant. Your name is Anviksha AI.
Analyze the provided chest X-ray image. Provide a detailed report strictly in the requested JSON format.
The report must include:
1.  'overallAssessment': A concise, professional summary of the findings.
2.  'isTuberculosisDetected': A boolean value indicating if tuberculosis is detected.
3.  'tuberculosisReport': If tuberculosis is detected, provide a brief report. Otherwise, this can be null or a negative statement.
4.  'findings': An array of key findings.
    - For each finding, detail the 'condition', 'category' ('Pulmonary', 'Cardiac', 'Skeletal', or 'Other'), 'severity' ('Low', 'Medium', 'High', or 'Critical'), a 'confidence' score (from 0.0 to 1.0), a 'description', a 'recommendation', and an optional 'boundingBox'.
    - The boundingBox coordinates must be normalized between 0 and 1.
    - If no significant findings are present, return an empty 'findings' array.
    - If the uploaded image is not a chest X-ray, state this clearly in the 'overallAssessment' and return an empty 'findings' array. Do not attempt to analyze non-medical images.
`;


export const analyzeXray = async (imageBase64: string, mimeType: string): Promise<GeminiAnalysisResponse> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const modelsToTry = ['gemini-2.5-pro', 'gemini-2.5-flash'];

    const imagePart = {
        inlineData: {
            data: imageBase64,
            mimeType: mimeType,
        },
    };

    const textPart = {
        text: prompt,
    };

    let lastError: unknown = null;

    for (const model of modelsToTry) {
        try {
            console.log(`Attempting analysis with model: ${model}`);
            const response = await ai.models.generateContent({
                model: model,
                contents: { parts: [imagePart, textPart] },
                config: {
                    responseMimeType: "application/json",
                    responseSchema: responseSchema,
                    temperature: 0.2,
                },
            });

            const jsonText = response.text.trim();
            const result = JSON.parse(jsonText) as GeminiAnalysisResponse;
            console.log(`Successfully analyzed with model: ${model}`);
            return result; // Success!
        } catch (error) {
            console.error(`Analysis with ${model} failed:`, error);
            lastError = error;
        }
    }
    
    // If the loop completes without returning, all models have failed.
    console.error("All model attempts failed.", lastError);
    return {
        overallAssessment: "An error occurred during analysis. The AI model could not process the request after multiple attempts. This might be due to a safety policy violation, an invalid image, or a network issue. Please try again with a different image.",
        isTuberculosisDetected: false,
        findings: [],
    };
};
