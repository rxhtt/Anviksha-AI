import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { analyzeXray } from '../../services/geminiService';
import { AnalysisResult, AnalysisFinding, AnalysisSeverity } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { IconAlert, IconCheckCircle, IconLung, IconHeart, IconBone, IconCircleDot, IconFileCheck, IconUpload, IconKey } from '../Icons';


const severityConfig: Record<AnalysisSeverity, { color: string, icon: React.ElementType }> = {
    'Low': { color: 'text-green-600', icon: IconCheckCircle },
    'Medium': { color: 'text-yellow-600', icon: IconAlert },
    'High': { color: 'text-orange-500', icon: IconAlert },
    'Critical': { color: 'text-red-600', icon: IconAlert },
};

const categoryConfig: Record<AnalysisFinding['category'], { icon: React.ElementType }> = {
    'Pulmonary': { icon: IconLung },
    'Cardiac': { icon: IconHeart },
    'Skeletal': { icon: IconBone },
    'Other': { icon: IconCircleDot },
};

const loadingTexts = [
    "Initializing AI Core...",
    "Loading Deep Learning Models...",
    "Analyzing Pixel Matrix...",
    "Identifying Key Structures...",
    "Cross-Referencing Anatomical Atlas...",
    "Compiling Findings...",
    "Finalizing Report..."
];

const AnalysisLoader: React.FC = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex(prev => (prev + 1) % loadingTexts.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const pathVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i: number) => ({
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay: i * 0.1, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay: i * 0.1, duration: 0.1 }
            }
        })
    };

    return (
        <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center flex flex-col items-center justify-center h-full">
            <motion.svg width="80" height="80" viewBox="0 0 24 24" initial="hidden" animate="visible">
                <defs>
                    <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                </defs>
                 {/* Neuron paths */}
                <motion.path custom={0} variants={pathVariants} d="M4 12 L9 12" stroke="url(#loaderGradient)" strokeWidth="1" />
                <motion.path custom={1} variants={pathVariants} d="M15 12 L20 12" stroke="url(#loaderGradient)" strokeWidth="1" />
                <motion.path custom={2} variants={pathVariants} d="M9 12 L12 8" stroke="url(#loaderGradient)" strokeWidth="1" />
                <motion.path custom={3} variants={pathVariants} d="M9 12 L12 16" stroke="url(#loaderGradient)" strokeWidth="1" />
                <motion.path custom={4} variants={pathVariants} d="M15 12 L12 8" stroke="url(#loaderGradient)" strokeWidth="1" />
                <motion.path custom={5} variants={pathVariants} d="M15 12 L12 16" stroke="url(#loaderGradient)" strokeWidth="1" />
                 {/* Nodes */}
                <motion.circle initial={{scale:0}} animate={{scale:1, transition:{delay:0.7}}} cx="4" cy="12" r="2" fill="#2563eb" />
                <motion.circle initial={{scale:0}} animate={{scale:1, transition:{delay:0.8}}} cx="9" cy="12" r="2.5" fill="#2563eb" />
                <motion.circle initial={{scale:0}} animate={{scale:1, transition:{delay:1.0}}} cx="12" cy="8" r="2" fill="#60a5fa" />
                <motion.circle initial={{scale:0}} animate={{scale:1, transition:{delay:1.0}}} cx="12" cy="16" r="2" fill="#60a5fa" />
                <motion.circle initial={{scale:0}} animate={{scale:1, transition:{delay:0.9}}} cx="15" cy="12" r="2.5" fill="#2563eb" />
                <motion.circle initial={{scale:0}} animate={{scale:1, transition:{delay:0.7}}} cx="20" cy="12" r="2" fill="#2563eb" />
            </motion.svg>
            <AnimatePresence mode="wait">
                <motion.p
                    key={currentTextIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-slate-500"
                >
                    {loadingTexts[currentTextIndex]}
                </motion.p>
            </AnimatePresence>
        </motion.div>
    );
};


const ProductDemo: React.FC = () => {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [tempApiKey, setTempApiKey] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [analysisError, setAnalysisError] = useState<string | null>(null);
    const [hoveredFinding, setHoveredFinding] = useState<AnalysisFinding | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const storedKey = sessionStorage.getItem('gemini-api-key');
        if (storedKey) {
            setApiKey(storedKey);
        }
    }, []);

    const handleSaveKey = () => {
        if (tempApiKey.trim()) {
            setApiKey(tempApiKey);
            sessionStorage.setItem('gemini-api-key', tempApiKey);
            toast.success('API Key saved for this session.');
            setTempApiKey('');
        } else {
            toast.error('Please enter a valid API key.');
        }
    };
    
    const handleClearKey = () => {
        setApiKey(null);
        sessionStorage.removeItem('gemini-api-key');
        toast.success('API Key cleared.');
    };


    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload a valid image file (JPEG, PNG).');
                return;
            }
            setImageFile(file);
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);

            setAnalysisResult(null);
            setAnalysisError(null);
            setHoveredFinding(null);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/jpeg': [], 'image/png': [] },
        multiple: false
    });

    const fileToBase64 = (file: File): Promise<{base64: string, mimeType: string}> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;
                const base64 = result.split(',')[1];
                const mimeType = result.substring(result.indexOf(':') + 1, result.indexOf(';'));
                resolve({ base64, mimeType });
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleStartAnalysis = async () => {
        if (!imageFile) {
            toast.error('Please upload an X-ray image first.');
            return;
        }
        if (!apiKey) {
            toast.error('Please set your Gemini API key before running the analysis.');
            return;
        }
        setIsAnalyzing(true);
        setAnalysisResult(null);
        setAnalysisError(null);
        try {
            const { base64, mimeType } = await fileToBase64(imageFile);
            const result = await analyzeXray(base64, mimeType, apiKey);
            setAnalysisResult(result);
        } catch (error) {
            console.error("Analysis failed:", error);
            const message = error instanceof Error ? error.message : 'An unknown error occurred.';

            if (message.includes('Authentication Error') || message.includes('Permission Error')) {
                handleClearKey();
                toast.error('API Key authentication failed.');
            } else {
                toast.error('Analysis Failed');
            }
            setAnalysisError(message);

        } finally {
            setIsAnalyzing(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    return (
        <section id="product" className="py-20 lg:py-32 bg-slate-100 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y:20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Experience the Platform</h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Upload a chest X-ray and run the analysis to see how our platform identifies and reports on clinical findings in seconds.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-16 max-w-7xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-200"
                >
                    <div className="p-4 border-b border-slate-200 flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>

                    <div className="p-4 sm:p-8">
                        {!apiKey ? (
                             <div className="flex flex-col items-center justify-center p-8 lg:col-span-5 min-h-[480px] text-center">
                                <IconKey className="w-12 h-12 text-blue-500" />
                                <h3 className="mt-4 text-xl font-bold text-slate-800">Gemini API Key Required</h3>
                                <p className="mt-2 text-slate-600 max-w-md">
                                    To use this interactive demo, please enter your Gemini API key below. Your key is stored only in your browser for this session.
                                </p>
                                <div className="mt-6 w-full max-w-sm">
                                    <input 
                                        type="password"
                                        value={tempApiKey}
                                        onChange={(e) => setTempApiKey(e.target.value)}
                                        placeholder="Enter your Gemini API Key"
                                        className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    <Button onClick={handleSaveKey} className="mt-3 w-full" size="lg">
                                        Save API Key
                                    </Button>
                                </div>
                                <p className="mt-4 text-sm text-slate-500 max-w-md">
                                  You can get your key from Google AI Studio. Charges may apply for API usage. For details, see the <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">billing documentation</a>.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                                {/* Image Uploader Column */}
                                <div className="lg:col-span-3 flex flex-col items-center">
                                    <h3 className="text-xl font-semibold text-slate-800">1. Upload X-Ray Image</h3>
                                    <Card className="mt-4 w-full aspect-square overflow-hidden relative bg-slate-100 flex items-center justify-center border-slate-200" onMouseLeave={() => setHoveredFinding(null)}>
                                        {!imageUrl && (
                                            <div {...getRootProps()} className="w-full h-full cursor-pointer flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-slate-300 rounded-lg hover:bg-slate-200/50 hover:border-blue-500 transition-colors duration-300">
                                                <input {...getInputProps()} />
                                                <IconUpload className="w-12 h-12 text-slate-400 mb-4" />
                                                {isDragActive ? (
                                                    <p className="text-blue-600">Drop the image here...</p>
                                                ) : (
                                                    <p className="text-slate-500">Drag & drop an X-ray image here, or click to select a file.</p>
                                                )}
                                                <p className="text-xs text-slate-400 mt-2">Supports PNG, JPG</p>
                                            </div>
                                        )}
                                        <AnimatePresence>
                                            {imageUrl && (
                                                <motion.img 
                                                    key={imageUrl}
                                                    src={imageUrl} 
                                                    alt="Uploaded Chest X-ray" 
                                                    className="w-full h-full object-contain absolute top-0 left-0" 
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            )}
                                        </AnimatePresence>
                                        {hoveredFinding?.boundingBox && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 1.2 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{type: 'spring', stiffness: 300, damping: 20}}
                                                className="absolute border-2 border-blue-500 pointer-events-none rounded-md shadow-[0_0_15px_rgba(59,130,246,0.7)]"
                                                style={{
                                                    left: `${hoveredFinding.boundingBox[0] * 100}%`,
                                                    top: `${hoveredFinding.boundingBox[1] * 100}%`,
                                                    width: `${(hoveredFinding.boundingBox[2] - hoveredFinding.boundingBox[0]) * 100}%`,
                                                    height: `${(hoveredFinding.boundingBox[3] - hoveredFinding.boundingBox[1]) * 100}%`,
                                                }}
                                            />
                                        )}
                                    </Card>
                                    <Button onClick={handleStartAnalysis} disabled={!imageFile || isAnalyzing} className="mt-6 w-full max-w-sm" size="lg">
                                        {isAnalyzing ? 'Analyzing...' : '2. Run AI Analysis'}
                                    </Button>
                                </div>
                                {/* Analysis Report Column */}
                                <div className="lg:col-span-2 flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-semibold text-slate-800 text-center">3. AI Analysis Report</h3>
                                        <Button onClick={handleClearKey} variant="outline" size="md" className="py-1 px-3 text-xs">Change Key</Button>
                                    </div>
                                    <Card className="mt-4 flex-grow flex flex-col min-h-[480px] bg-slate-50 border border-slate-200">
                                        <AnimatePresence mode="wait">
                                            {isAnalyzing ? (
                                                <AnalysisLoader key="loader" />
                                            ) : analysisError ? (
                                                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-grow flex flex-col items-center justify-center text-center p-6">
                                                    <IconAlert className="w-12 h-12 text-red-500" />
                                                    <h4 className="mt-4 font-bold text-red-700">Analysis Failed</h4>
                                                    <p className="mt-2 text-sm text-slate-600 max-w-sm">{analysisError}</p>
                                                </motion.div>
                                            ) : analysisResult ? (
                                                <motion.div key="results" variants={containerVariants} initial="hidden" animate="visible" className="p-4 overflow-y-auto space-y-4">
                                                    <motion.div variants={itemVariants}>
                                                        <h4 className="font-bold text-slate-800">Overall Assessment</h4>
                                                        <p className="mt-1 text-sm text-slate-600">{analysisResult.overallAssessment}</p>
                                                    </motion.div>

                                                    {analysisResult.isTuberculosisDetected && (
                                                        <motion.div variants={itemVariants} className="p-3 rounded-lg bg-red-50 border border-red-200">
                                                            <div className="flex items-center">
                                                                <IconAlert className="h-5 w-5 text-red-600 mr-2" />
                                                                <h4 className="font-bold text-red-800">Potential Tuberculosis Detected</h4>
                                                            </div>
                                                            <p className="mt-1 text-sm text-red-700">{analysisResult.tuberculosisReport}</p>
                                                        </motion.div>
                                                    )}

                                                    <motion.div variants={itemVariants}>
                                                        <h4 className="font-bold text-slate-800">Key Findings</h4>
                                                        {analysisResult.findings.length > 0 ? (
                                                            <ul className="mt-2 space-y-3">
                                                                {analysisResult.findings.map((finding, index) => {
                                                                    const SeverityIcon = severityConfig[finding.severity].icon;
                                                                    const severityColor = severityConfig[finding.severity].color;
                                                                    const CategoryIcon = categoryConfig[finding.category].icon;
                                                                    return (
                                                                        <motion.li 
                                                                            key={index} 
                                                                            variants={itemVariants} 
                                                                            className="p-3 rounded-md border border-slate-200 bg-white hover:bg-slate-100/70 cursor-pointer"
                                                                            onMouseEnter={() => setHoveredFinding(finding)}
                                                                        >
                                                                            <div className="flex items-center justify-between">
                                                                                <div className="flex items-center gap-2">
                                                                                    <CategoryIcon className="h-5 w-5 text-slate-500" />
                                                                                    <span className="font-semibold text-sm text-slate-700">{finding.condition}</span>
                                                                                </div>
                                                                                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${severityColor} bg-opacity-10`}>
                                                                                    <SeverityIcon className="h-3 w-3" />
                                                                                    <span>{finding.severity}</span>
                                                                                </div>
                                                                            </div>
                                                                            <p className="text-xs text-slate-500 mt-1 pl-7">{finding.description}</p>
                                                                        </motion.li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        ) : (
                                                            <p className="text-sm text-slate-500 mt-2">No significant abnormalities were detected in the analysis.</p>
                                                        )}
                                                    </motion.div>
                                                </motion.div>
                                            ) : (
                                                <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-grow flex flex-col items-center justify-center text-center p-4">
                                                    <IconFileCheck className="w-12 h-12 text-slate-400" />
                                                    <p className="mt-4 text-slate-500">Your analysis report will appear here after uploading an image and running the AI.</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Card>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductDemo;