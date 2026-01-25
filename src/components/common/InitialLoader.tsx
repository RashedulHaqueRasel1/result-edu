"use client";

import React, { useState, useEffect } from "react";
import SplashScreen from "./SplashScreen";

export default function InitialLoader({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If the page is already fully loaded, hide splash immediately
        if (document.readyState === "complete") {
            setLoading(false);
        } else {
            // Otherwise, wait for the window load event
            const handleLoad = () => setLoading(false);
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    return (
        <>
            {loading && <SplashScreen />}
            {children}
        </>
    );
}
