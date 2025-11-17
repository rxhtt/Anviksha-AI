import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import toast from 'react-hot-toast';
import { AnalysisResult, AnalysisFinding, AnalysisSeverity } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { IconAlert, IconCheckCircle, IconLung, IconHeart, IconBone, IconCircleDot, IconFileCheck, IconUpload, IconArrowRight } from '../Icons';


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
    "Initializing Analysis...",
    "Loading Diagnostic Models...",
    "Scanning Image Layers...",
    "Identifying Key Structures...",
    "Compiling Findings...",
    "Generating Report..."
];

const mockAbnormalResult: AnalysisResult = {
  overallAssessment: "The chest X-ray shows signs of right upper lobe consolidation and a potential cavitary lesion, highly suggestive of active pulmonary tuberculosis. Additionally, mild cardiomegaly is noted. No acute skeletal abnormalities are observed.",
  isTuberculosisDetected: true,
  tuberculosisReport: "Evidence of active tuberculosis is observed, characterized by consolidation in the right upper lobe. A cavitary lesion appears to be present, which is a classic sign of post-primary TB. Further microbiological tests are strongly recommended for confirmation.",
  findings: [
    {
      condition: "Pulmonary Consolidation",
      category: "Pulmonary",
      severity: "High",
      confidence: 0.92,
      description: "Opacity in the right upper lobe consistent with consolidation.",
      recommendation: "Sputum smear microscopy and culture for AFB are recommended.",
      boundingBox: [0.55, 0.1, 0.85, 0.4]
    },
    {
      condition: "Cavitary Lesion",
      category: "Pulmonary",
      severity: "Critical",
      confidence: 0.85,
      description: "A lucent area within the consolidation in the right upper lobe suggests a cavity.",
      recommendation: "Immediate clinical evaluation and initiation of anti-tuberculosis therapy is advised.",
      boundingBox: [0.65, 0.18, 0.8, 0.3]
    },
    {
      condition: "Cardiomegaly",
      category: "Cardiac",
      severity: "Low",
      confidence: 0.78,
      description: "The cardiothoracic ratio is slightly elevated, suggesting mild enlargement of the heart.",
      recommendation: "Monitor blood pressure and consider an ECG for further cardiac evaluation.",
      boundingBox: [0.25, 0.45, 0.75, 0.85]
    }
  ]
};

const mockNormalResult: AnalysisResult = {
    overallAssessment: "The chest X-ray appears clear. Lungs are well-aerated with no signs of consolidation, nodules, or pneumothorax. The cardiac silhouette and skeletal structures are within normal limits.",
    isTuberculosisDetected: false,
    findings: []
};

const samples = {
    normal: {
        id: 'normal',
        title: 'Normal Chest X-ray',
        description: 'A healthy scan with no significant findings.',
        imageUrl: '/images/xray-normal.jpg',
        analysisResult: mockNormalResult,
    },
    abnormal: {
        id: 'abnormal',
        title: 'Abnormal Chest X-ray',
        description: 'Shows signs of active pulmonary tuberculosis.',
        imageUrl: '/images/xray-abnormal.jpg',
        analysisResult: mockAbnormalResult,
    }
};

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
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [hoveredFinding, setHoveredFinding] = useState<AnalysisFinding | null>(null);
    const [selectedSample, setSelectedSample] = useState<'normal' | 'abnormal' | null>(null);

    const handleSelectSample = (sampleId: 'normal' | 'abnormal') => {
        setSelectedSample(sampleId);
        setAnalysisResult(null);
        setHoveredFinding(null);
    };

    const handleStartAnalysis = () => {
        if (!selectedSample) {
            toast.error('Please select a sample X-ray first.');
            return;
        }

        setIsAnalyzing(true);
        setAnalysisResult(null);

        // Simulate AI analysis time for the demo
        setTimeout(() => {
            setAnalysisResult(samples[selectedSample].analysisResult);
            setIsAnalyzing(false);
            toast.success('Analysis Complete!');
        }, 3500);
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
                        Select a sample chest X-ray and run the analysis to see how our platform identifies and reports on clinical findings in seconds.
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
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                            {/* Image Uploader Column */}
                            <div className="lg:col-span-3 flex flex-col">
                                <h3 className="text-xl font-semibold text-slate-800 text-center">1. Select a Sample X-Ray</h3>
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {(Object.keys(samples) as Array<keyof typeof samples>).map(key => {
                                        const sample = samples[key];
                                        const isSelected = selectedSample === key;
                                        return (
                                            <Card 
                                                key={sample.id}
                                                className={`p-4 cursor-pointer relative overflow-hidden transition-all duration-300 ${isSelected ? 'border-blue-500 ring-2 ring-blue-500' : 'hover:border-slate-300'}`}
                                                onClick={() => handleSelectSample(key)}
                                            >
                                                <img src={sample.imageUrl} alt={sample.title} className="absolute inset-0 w-full h-full object-cover opacity-10" />
                                                <div className="absolute inset-0 bg-white/80"></div>

                                                <div className="relative z-10">
                                                    <h4 className="font-bold text-slate-800">{sample.title}</h4>
                                                    <p className="text-sm text-slate-600 mt-1">{sample.description}</p>
                                                    <div className={`mt-3 flex items-center text-sm font-semibold ${isSelected ? 'text-blue-600' : 'text-slate-500'}`}>
                                                        {isSelected ? 'Selected' : 'Select Case'}
                                                        {isSelected && <IconCheckCircle className="w-4 h-4 ml-1" />}
                                                    </div>
                                                </div>
                                            </Card>
                                        )
                                    })}
                                </div>
                                <Card className="mt-4 w-full aspect-square overflow-hidden relative bg-slate-100 flex items-center justify-center border-slate-200" onMouseLeave={() => setHoveredFinding(null)}>
                                    {!selectedSample && (
                                        <div className="w-full h-full cursor-pointer flex flex-col items-center justify-center p-8 text-center">
                                            <IconFileCheck className="w-12 h-12 text-slate-400 mb-4" />
                                            <p className="text-slate-500">Select a sample case to view the X-ray here.</p>
                                        </div>
                                    )}
                                    <AnimatePresence>
                                        {selectedSample && (
                                            <motion.img 
                                                key={selectedSample}
                                                src={samples[selectedSample].imageUrl} 
                                                alt={samples[selectedSample].title} 
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
                                <Button onClick={handleStartAnalysis} disabled={!selectedSample || isAnalyzing} className="mt-6 w-full max-w-sm mx-auto" size="lg">
                                    {isAnalyzing ? 'Analyzing...' : '2. Run AI Analysis'}
                                </Button>
                            </div>
                            {/* Analysis Report Column */}
                            <div className="lg:col-span-2 flex flex-col">
                                <h3 className="text-xl font-semibold text-slate-800 text-center">3. AI Analysis Report</h3>
                                <Card className="mt-4 flex-grow flex flex-col min-h-[480px] bg-slate-50 border border-slate-200">
                                    <AnimatePresence mode="wait">
                                        {isAnalyzing ? (
                                            <AnalysisLoader key="loader" />
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
                                                        <motion.div variants={itemVariants} className="text-center p-4 rounded-lg bg-green-50 border border-green-200 mt-2">
                                                            <IconCheckCircle className="w-8 h-8 text-green-600 mx-auto"/>
                                                             <p className="text-sm text-green-800 mt-2 font-semibold">No significant abnormalities were detected in the analysis.</p>
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                            </motion.div>
                                        ) : (
                                            <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-grow flex flex-col items-center justify-center text-center p-4">
                                                <IconFileCheck className="w-12 h-12 text-slate-400" />
                                                <p className="mt-4 text-slate-500">Your analysis report will appear here after selecting a sample and running the AI.</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Card>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductDemo;