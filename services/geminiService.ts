import { GoogleGenAI, Type, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { GeminiAnalysisResponse } from '../types';

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];

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


export const analyzeXray = async (imageBase64: string, mimeType: string, apiKey: string): Promise<GeminiAnalysisResponse> => {
    if (!apiKey) {
        throw new Error("Authentication Error: The Gemini API key is missing. Please provide your API key to proceed.");
    }
    
    const model = 'gemini-2.5-flash';

    const imagePart = {
        inlineData: {
            data: imageBase64,
            mimeType: mimeType,
        },
    };

    const textPart = {
        text: prompt,
    };

    try {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        
        console.log(`Attempting analysis with model: ${model}`);
        const response = await ai.models.generateContent({
            model: model,
            contents: [{ parts: [imagePart, textPart] }],
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.3,
            },
            safetySettings: safetySettings,
        });

        const responseText = response.text;
        if (typeof responseText !== 'string' || responseText.trim() === '') {
            throw new Error('Invalid Response: The AI model returned an unexpected or empty response. This could be a temporary issue. Please try again.');
        }

        const result = JSON.parse(responseText) as GeminiAnalysisResponse;
        console.log(`Successfully analyzed with model: ${model}`);
        return result;
    } catch (error) {
        console.error(`Analysis with ${model} failed:`, error);
        
        let errorMessage = "An unknown error occurred during analysis. Please check the console for details.";

        if (error instanceof Error) {
            const lowerCaseMessage = error.message.toLowerCase();
            
            if (lowerCaseMessage.includes('api key not valid') || lowerCaseMessage.includes('invalid api key')) {
                 errorMessage = "Authentication Error: The provided Gemini API key appears to be invalid. Please double-check that the key is correct and has not expired, then try again.";
            } else if (lowerCaseMessage.includes('permission denied')) {
                 errorMessage = "Permission Error: Your API key is valid, but it lacks the necessary permissions. Please check your Google AI Studio or Cloud project settings to ensure the Gemini API is enabled for your key.";
            } else if (lowerCaseMessage.includes('api key') || lowerCaseMessage.includes('api_key') || lowerCaseMessage.includes('authentication')) {
                errorMessage = "Authentication Error: The Gemini API key is invalid or missing permissions. Please check your key and try again.";
            } else if (error.message.includes('400')) {
                errorMessage = "Bad Request: The image may be corrupted, in an unsupported format, or the request to the AI service was malformed. Please try a different image.";
            } else if (error.message.includes('500') || error.message.includes('503')) {
                errorMessage = "Server Error: The AI service is temporarily unavailable. Please try again in a few moments.";
            } else if (lowerCaseMessage.includes('safety') || lowerCaseMessage.includes('blocked')) {
                errorMessage = "Content Blocked: The image was blocked due to the platform's safety policy. This can occasionally happen with medical imaging. Please try a different image if possible."
            } else {
                errorMessage = error.message;
            }
        }
        
        throw new Error(errorMessage);
    }
};