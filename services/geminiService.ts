
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

const prompt = `You are a professional radiologist AI assistant named Anviksha AI, specializing in the analysis of chest X-rays. Your primary task is to identify abnormalities, with a special focus on detecting Tuberculosis (TB).

Analyze the provided chest X-ray image and generate a detailed report in the specified JSON format.

When analyzing for Tuberculosis, pay extremely close attention to:
- Apical infiltrates or consolidations, particularly in the upper lobes.
- Cavitations (hollow spaces within the lung).
- Miliary patterning (numerous small nodules scattered throughout the lungs).
- Hilar or mediastinal lymphadenopathy (enlarged lymph nodes).
- Ghon complex (a calcified lung nodule and an associated lymph node).
- Pleural effusion (fluid around the lung).

Your JSON report must include:
1.  'overallAssessment': A concise, professional summary of all findings. If the image is not a chest X-ray, state this and do not proceed with analysis.
2.  'isTuberculosisDetected': A boolean value. Set this to 'true' if any signs suggestive of TB are present, even with low confidence. Be conservative and flag potential cases.
3.  'tuberculosisReport': If 'isTuberculosisDetected' is true, provide a detailed report on the specific TB-related findings observed. Otherwise, this can be null.
4.  'findings': An array of all key findings (including but not limited to TB).
    - For each finding: 'condition', 'category' ('Pulmonary', 'Cardiac', 'Skeletal', 'Other'), 'severity' ('Low', 'Medium', 'High', 'Critical'), 'confidence' score (0.0 to 1.0), 'description', 'recommendation', and optional 'boundingBox' ([x_min, y_min, x_max, y_max] as percentages).
    - If TB is detected, ensure it is listed as a finding in this array.
    - If there are no significant abnormalities, return an empty 'findings' array.`;


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
                    temperature: 0.3,
                },
            });

            // Safely access the text response
            const responseText = response.text;
            if (typeof responseText !== 'string' || responseText.trim() === '') {
                throw new Error('Received an empty or invalid response from the model.');
            }

            const result = JSON.parse(responseText) as GeminiAnalysisResponse;
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
