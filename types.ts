
export type AnalysisCategory = 'Pulmonary' | 'Cardiac' | 'Skeletal' | 'Other';
export type AnalysisSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface AnalysisFinding {
  condition: string;
  category: AnalysisCategory;
  severity: AnalysisSeverity;
  confidence: number; // 0-1
  description: string;
  recommendation: string;
  boundingBox?: [number, number, number, number]; // [x_min, y_min, x_max, y_max] as percentages
}

export interface AnalysisResult {
  overallAssessment: string;
  isTuberculosisDetected: boolean;
  tuberculosisReport?: string;
  findings: AnalysisFinding[];
}

// For Gemini JSON response
export type GeminiAnalysisResponse = AnalysisResult;