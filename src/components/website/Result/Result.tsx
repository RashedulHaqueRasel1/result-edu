"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { useGetResult, ResultResponse } from "@/lib/hooks/useResult";
import { encryptData } from "@/lib/crypto";


export default function Result() {
  const router = useRouter();
  const resultRef = useRef<HTMLDivElement>(null);
  const [searchResults, setSearchResults] = useState<ResultResponse | null>(
    null
  );
  const { mutate: getResult, isPending } = useGetResult();

  useEffect(() => {
    // Retrieve payload from sessionStorage
    const payloadString = sessionStorage.getItem("resultSearchPayload");

    if (!payloadString) {
      toast.error("No search data found. Redirecting to search page...");
      router.push("/");
      return;
    }

    try {
      const payload = JSON.parse(payloadString);
      const mobileNumber = payload.mobileNumber;

      // Fetch the result using the hook
      getResult(payload, {
        onSuccess: (result) => {
          setSearchResults(result);
          // Clear sessionStorage after successful fetch
          sessionStorage.removeItem("resultSearchPayload");

          // Post to secondary server via secure proxy
          const finalPayload = { ...result, mobileNumber };
          const encryptedPayload = encryptData(finalPayload);

          fetch("/api/result/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ encryptedPayload }),
          })
            .then((response) => {
              if (!response.ok) {
                console.error("Secondary API rejected the request");
              }
            })
            .catch((err) => {
              console.error("Failed to post to secondary server:", err);
            });
        },
        onError: (error) => {
          // toast.error("Failed to fetch result. Please try again.");
          // console.error("Error:", error);
          // Redirect moved to the "Try Again" button in the UI
        },
      });
    } catch (error) {
      toast.error("Invalid search data. Redirecting to search page...");
      router.push("/");
    }
  }, [getResult, router]);

  // Auto-redirect if no result found after 5 seconds
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!isPending && !searchResults) {
      timeoutId = setTimeout(() => {
        router.push("/");
      }, 5000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isPending, searchResults, router]);

  // this is for search again button
  const handleSearchAgain = () => {
    router.push("/");
  };



  // Loading state
  if (isPending) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="relative mb-8">
          {/* Spinner Ring */}
          <div className="w-24 h-24 border-4 border-emerald-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-24 h-24 border-4 border-emerald-600 rounded-full border-t-transparent animate-spin"></div>

          {/* Icon in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <GraduationCap className="w-10 h-10 text-emerald-700" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-2">Please Wait</h2>
        <p className="text-slate-500 text-lg mb-6">We're fetching your result...</p>

        {/* Dots */}
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-emerald-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-3 h-3 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    );
  }

  // No results or error state
  if (!searchResults) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-200">
            <span className="text-4xl text-white font-bold">!</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mb-4">No Result Found</h2>
        <p className="text-slate-500 text-lg max-w-md mx-auto mb-8 leading-relaxed">
          We couldn't find any result matching your information. Please check your details and try again.
        </p>

        <button
          onClick={() => router.push("/")}
          className="px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-lg shadow-red-200 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Helper to safely get student info
  const info = searchResults.studentInfo;

  // Extract year from exam name if possible, or default
  const examYear = searchResults.exam.match(/\d{4}/)?.[0] || new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#ffffff] p-2 sm:p-4 font-sans text-[13px] md:text-[15px] leading-tight text-[#000000] flex flex-col items-center">
      <div ref={resultRef} className="w-full max-w-[800px] shadow-none sm:p-4 bg-[#ffffff]">

        {/* Official Header */}
        <div className="w-full bg-[#00782A] text-[#ffffff] py-3 sm:py-5 px-2 mb-6 text-center">
          <h1 className="text-sm sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 uppercase">
            Web Based Result Publication System for Education Board
          </h1>
          <p className="text-[10px] sm:text-sm md:text-lg font-medium uppercase">
            JSC/JDC/SSC/DAKHIL/HSC/ALIM and Equivalent Examination
          </p>
        </div>

        {/* Exam Title Header */}
        <h2 className="text-center text-lg md:text-xl font-bold mb-4 text-[#000000]">
          SSC/Dakhil/Equivalent Result {examYear}
        </h2>

        {/* Student Information Table */}
        <div className="w-full border-t border-l border-[#ffffff] shadow-[0_0_2px_#808080] bg-[#EEEEEE]">
          <div className="grid grid-cols-[100px_1fr] md:grid-cols-[100px_1fr_130px_1fr] border-b border-[#ffffff]">
            {/* Row 1 */}
            <div className="p-2 border-r border-[#ffffff] font-normal text-[#000000]">Roll No</div>
            <div className="p-2 border-r border-[#ffffff] bg-[#ffffff] font-normal text-[#000000]">{info["Roll No"]}</div>
            <div className="p-2 border-r border-[#ffffff] font-normal text-[#000000] hidden md:block">Name</div>
            <div className="p-2 border-r border-[#ffffff] bg-[#ffffff] font-normal text-[#000000] hidden md:block">{info.Name}</div>
          </div>

          <div className="md:hidden grid grid-cols-[100px_1fr] border-b border-[#ffffff]">
            <div className="p-2 border-r border-[#ffffff] font-normal text-[#000000]">Name</div>
            <div className="p-2 bg-[#ffffff] font-normal text-[#000000]">{info.Name}</div>
          </div>

          <div className="grid grid-cols-[100px_1fr] md:grid-cols-[100px_1fr_130px_1fr] border-b border-[#ffffff]">
            <div className="p-2 border-r border-[#ffffff] font-normal text-[#000000]">Board</div>
            <div className="p-2 border-r border-[#ffffff] bg-[#ffffff] font-normal text-[#000000]">{info.Board}</div>
            <div className="p-2 border-r border-[#ffffff] font-normal text-[#000000] hidden md:block">Father&apos;s Name</div>
            <div className="p-2 border-r border-[#ffffff] bg-[#ffffff] font-normal text-[#000000] hidden md:block">{info["Fathers Name"]}</div>
          </div>
          <div className="md:hidden grid grid-cols-[100px_1fr] border-b border-[#ffffff]">
            <div className="p-2 border-r border-[#ffffff] font-normal text-[#000000]">Father&apos;s Name</div>
            <div className="p-2 bg-[#ffffff] font-normal text-[#000000]">{info["Fathers Name"]}</div>
          </div>

          <div className="grid grid-cols-[100px_1fr] md:grid-cols-[100px_1fr_130px_1fr] border-b border-[#ffffff]">
            <div className="p-2 border-r border-[#ffffff] font-normal text-[#000000]">Group</div>
            <div className="p-2 border-r border-[#ffffff] bg-[#ffffff] font-normal text-[#000000]">{info.Group}</div>
            <div className="p-2 border-r border-[#ffffff] font-normal text-[#000000] hidden md:block">Mother&apos;s Name</div>
            <div className="p-2 border-r border-[#ffffff] bg-[#ffffff] font-normal text-[#000000] hidden md:block">{info["Mothers Name"]}</div>
          </div>
          <div className="md:hidden grid grid-cols-[100px_1fr] border-b border-[#ffffff]">
            <div className="p-2 border-r border-[#ffffff] font-normal text-[#000000]">Mother&apos;s Name</div>
            <div className="p-2 bg-[#ffffff] font-normal text-[#000000]">{info["Mothers Name"]}</div>
          </div>

          <div className="grid grid-cols-[100px_1fr] md:grid-cols-[100px_1fr_130px_1fr] border-b border-[#ffffff]">
            <div className="p-2 border-r border-[#ffffff] font-normal text-[#000000]">Type</div>
            <div className="p-2 border-r border-[#ffffff] bg-[#ffffff] font-normal text-[#000000]">{info.Type}</div>
            <div className="p-2 border-r border-[#ffffff] font-normal text-[#000000] hidden md:block">Date of Birth</div>
            <div className="p-2 border-r border-[#ffffff] bg-[#ffffff] font-normal text-[#000000] hidden md:block">{info["Date of Birth"] || "Hidden"}</div>
          </div>
          <div className="md:hidden grid grid-cols-[100px_1fr] border-b border-[#ffffff]">
            <div className="p-2 border-r border-[#ffffff] font-normal text-[#000000]">Date of Birth</div>
            <div className="p-2 bg-[#ffffff] font-normal text-[#000000]">{info["Date of Birth"] || "Hidden"}</div>
          </div>

          <div className="grid grid-cols-[100px_1fr] md:grid-cols-[100px_1fr_130px_1fr] border-b border-[#ffffff]">
            <div className="p-2 border-r border-[#ffffff] font-normal text-[#000000]">Result</div>
            <div className="p-2 border-r border-[#ffffff] bg-[#ffffff] font-bold text-[#000000]">{searchResults.summary.Result}</div>
            <div className="p-2 border-r border-[#ffffff] font-normal text-[#000000] hidden md:block">Institute</div>
            <div className="p-2 border-r border-[#ffffff] bg-[#ffffff] font-normal text-[#000000] hidden md:block row-span-2">{info.Institute}</div>
          </div>
          <div className="md:hidden grid grid-cols-[100px_1fr] border-b border-[#ffffff]">
            <div className="p-2 border-r border-[#ffffff] font-normal text-[#000000]">Institute</div>
            <div className="p-2 bg-[#ffffff] font-normal text-[#000000]">{info.Institute}</div>
          </div>

          <div className="grid grid-cols-[100px_1fr] md:grid-cols-[100px_1fr_130px_1fr] border-b border-[#ffffff] bg-[#EEEEEE]">
            <div className="p-2 border-r border-[#ffffff] font-normal text-[#000000]">GPA</div>
            <div className="p-2 border-r border-[#ffffff] bg-[#ffffff] font-bold text-[#000000]">{searchResults.summary.GPA}</div>
            <div className="p-2 border-r border-[#ffffff] font-normal text-[#000000] hidden md:block"></div>
            <div className="p-2 border-r border-[#ffffff] bg-[#ffffff] font-normal text-[#000000] hidden md:block"></div>
          </div>
        </div>


        {/* Grade Sheet Header */}
        <h2 className="text-center text-lg md:text-xl font-bold mt-6 mb-4 text-[#000000]">
          Grade Sheet
        </h2>

        {/* Grade Sheet Table */}
        <div className="w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#B0C4DE] text-[#000000]">
                <th className="border border-[#ffffff] p-2 text-left font-bold w-[100px]">Code</th>
                <th className="border border-[#ffffff] p-2 text-left font-bold">Subject</th>
                <th className="border border-[#ffffff] p-2 text-left font-bold w-[100px]">Grade</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.subjects.map((subject) => (
                <tr key={subject.code} className="bg-[#EEEEEE] odd:bg-[#EEEEEE] even:bg-[rgb(226,231,235)]">
                  <td className="border border-[#ffffff] p-2 text-[#000000]">{subject.code}</td>
                  <td className="border border-[#ffffff] p-2 text-[#000000]">{subject.name}</td>
                  <td className="border border-[#ffffff] p-2 text-[#000000]">{subject.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-6 mb-8 flex justify-center gap-4">
          {/* Footer Link */}
          <div className="">
            <button
              onClick={handleSearchAgain}
              className="text-[#1d4ed8] hover:underline font-bold text-sm cursor-pointer"
              data-html2canvas-ignore="true"
            >
              Search Again
            </button>
          </div>

        </div>

        {/* Bottom Green line */}
        <div className="w-full h-2 bg-[#77B55A] mb-8"></div>

        <div className="text-center py-2">© {new Date().getFullYear()} All rights reserved.</div>
      </div>
    </div>
  );
}
