
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { 
    IconActivity, 
    IconCheckCircle, 
    IconAlert, 
    IconPill, 
    IconSearch, 
    IconZap,
    IconBrain,
    IconStethoscope,
    IconFileText,
    IconUser,
    IconSettings,
    IconMenu
} from '../Icons';

const ProductDemo: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    
    // Parallax Tilt Effect Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section id="product" className="py-20 lg:py-32 bg-slate-950 overflow-hidden relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-4xl mx-auto mb-16"
                >
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
                        Platform Preview
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        The Digital Hospital Operating System
                    </h2>
                    <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
                        Experience the power of a fully integrated medical ecosystem. From complex diagnostics to pharmacy savings, everything happens in real-time.
                    </p>
                    
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <a href="https://anviksha-device.vercel.app/" target="_blank" rel="noopener noreferrer">
                            <Button size="xl" variant="primary" icon={<IconActivity />} className="shadow-blue-500/25 shadow-xl">
                                Launch Application
                            </Button>
                        </a>
                    </div>
                </motion.div>

                {/* 3D Dashboard Mockup Container */}
                <div 
                    className="perspective-1000 py-10" 
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    ref={ref}
                >
                    <motion.div
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        className="relative mx-auto max-w-6xl bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl shadow-black/50 overflow-hidden"
                    >
                        {/* Browser/App Window Header */}
                        <div className="h-14 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-6 justify-between backdrop-blur-md">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-2 mr-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="hidden md:flex items-center px-3 py-1.5 bg-slate-950/50 rounded-md border border-slate-700/50 text-slate-400 text-xs font-mono">
                                    <IconSearch size={12} className="mr-2" />
                                    app.anviksha.ai/dashboard/patient/AX-9921
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    System Online
                                </div>
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                                    DR
                                </div>
                            </div>
                        </div>

                        {/* App Body */}
                        <div className="flex h-[600px] md:h-[700px] bg-slate-950 text-slate-200">
                            {/* Sidebar */}
                            <div className="w-20 bg-slate-900/30 border-r border-slate-800 flex flex-col items-center py-6 gap-8 hidden md:flex">
                                <div className="p-2 bg-blue-600/20 rounded-lg text-blue-400"><IconActivity /></div>
                                <div className="text-slate-500 hover:text-slate-300 cursor-pointer"><IconStethoscope /></div>
                                <div className="text-slate-500 hover:text-slate-300 cursor-pointer"><IconPill /></div>
                                <div className="text-slate-500 hover:text-slate-300 cursor-pointer"><IconBrain /></div>
                                <div className="mt-auto text-slate-500 hover:text-slate-300 cursor-pointer"><IconSettings /></div>
                            </div>

                            {/* Main Content Grid */}
                            <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                    
                                    {/* Top Stats Row */}
                                    <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
                                        {/* Stat 1: Triage Score */}
                                        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Triage Risk</p>
                                                    <h4 className="text-2xl font-bold text-white mt-1">High Priority</h4>
                                                </div>
                                                <div className="p-2 bg-red-500/20 rounded-lg text-red-400"><IconAlert size={20} /></div>
                                            </div>
                                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: '85%' }}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                    className="h-full bg-red-500"
                                                />
                                            </div>
                                            <p className="text-xs text-slate-500 mt-2">Score: 85/100 (Immediate Attention)</p>
                                        </div>

                                        {/* Stat 2: Active Vitals */}
                                        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl">
                                            <div className="flex justify-between items-start mb-2">
                                                 <div>
                                                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Heart Rate</p>
                                                    <h4 className="text-2xl font-bold text-white mt-1">98 <span className="text-sm font-normal text-slate-500">BPM</span></h4>
                                                </div>
                                                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><IconActivity size={20} /></div>
                                            </div>
                                            {/* Fake Chart */}
                                            <div className="flex items-end justify-between gap-1 h-10 mt-2 opacity-50">
                                                {[40, 60, 45, 70, 55, 80, 65, 90, 60, 75, 50, 60].map((h, i) => (
                                                    <motion.div 
                                                        key={i}
                                                        initial={{ height: '20%' }}
                                                        animate={{ height: `${h}%` }}
                                                        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'mirror', delay: i * 0.1 }}
                                                        className="w-full bg-blue-500 rounded-t-sm" 
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Stat 3: Pharmacy Savings */}
                                        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl relative overflow-hidden">
                                             <div className="absolute top-0 right-0 p-2">
                                                 <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500 text-white">SAVED 85%</span>
                                             </div>
                                             <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Pharmacy Match</p>
                                                    <h4 className="text-2xl font-bold text-white mt-1">₹1,240 <span className="text-sm font-normal text-slate-500 line-through">₹8,400</span></h4>
                                                </div>
                                                <div className="p-2 bg-green-500/20 rounded-lg text-green-400"><IconPill size={20} /></div>
                                            </div>
                                            <p className="text-xs text-slate-400">Switched to Generic Equivalent (Jan Aushadhi)</p>
                                        </div>
                                    </div>

                                    {/* Main Feature: Radiology Viewer */}
                                    <div className="md:col-span-8 bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden flex flex-col relative group">
                                        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/80 backdrop-blur">
                                            <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                                                <IconStethoscope size={16} className="text-blue-400"/> Chest X-Ray Analysis
                                            </h3>
                                            <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">Model: CXR-DenseNet-121</span>
                                        </div>
                                        <div className="relative flex-1 bg-black min-h-[300px] flex items-center justify-center overflow-hidden">
                                            {/* X-Ray Image Background */}
                                            <img 
                                                src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=2000&auto=format&fit=crop" 
                                                alt="Chest X-Ray" 
                                                className="opacity-80 w-full h-full object-cover mix-blend-screen"
                                            />
                                            
                                            {/* Scanning Line Animation */}
                                            <motion.div 
                                                initial={{ top: '0%' }}
                                                animate={{ top: '100%' }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                className="absolute left-0 right-0 h-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] z-10"
                                            />

                                            {/* Bounding Boxes - Simulated Findings */}
                                            <motion.div 
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 1.5, duration: 0.5 }}
                                                className="absolute top-[35%] right-[30%] w-24 h-24 border-2 border-red-500 rounded-sm shadow-[0_0_15px_rgba(239,68,68,0.5)] flex flex-col items-end justify-start p-1"
                                            >
                                                <div className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                                                    Nodule 98%
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Right Side: Analysis Feed */}
                                    <div className="md:col-span-4 flex flex-col gap-6">
                                        {/* Findings Card */}
                                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex-1">
                                            <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                                                <IconFileText size={16}/> Clinical Findings
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                                    <IconAlert size={16} className="text-red-400 mt-0.5 shrink-0" />
                                                    <div>
                                                        <p className="text-sm font-medium text-red-200">Abnormal Opacity Detected</p>
                                                        <p className="text-xs text-red-400/80 mt-0.5">Right upper lobe density consistent with consolidation.</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                                                    <IconCheckCircle size={16} className="text-green-400 mt-0.5 shrink-0" />
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-300">Cardiac Silhouette Normal</p>
                                                        <p className="text-xs text-slate-500 mt-0.5">No signs of cardiomegaly.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-6 pt-4 border-t border-slate-800">
                                                <Button variant="primary" size="md" className="w-full justify-center text-sm">
                                                    Generate PDF Report
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProductDemo;
