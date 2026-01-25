"use client";

import React, { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";

export default function SplashScreen() {
    return (
        <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 flex flex-col items-center justify-center text-white animate-fade-out">
            {/* Icon Card */}
            <div className="bg-white/10 backdrop-blur-md w-32 h-32 rounded-3xl flex items-center justify-center mb-8 shadow-2xl border border-white/20 ring-1 ring-white/10">
                <GraduationCap className="w-16 h-16 text-white drop-shadow-md" />
            </div>

            {/* Text Content */}
            <div className="text-center space-y-2 mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Education Result
                </h1>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Portal
                </h2>
                <p className="text-emerald-100 text-lg mt-4 font-light">
                    Check your exam results in seconds
                </p>
            </div>

            {/* Loading Dots */}
            <div className="flex gap-3">
                <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
        </div>
    );
}
