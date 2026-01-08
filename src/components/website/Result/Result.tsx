"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useGetResult, ResultResponse } from "@/lib/hooks/useResult";


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

      // Fetch the result using the hook
      getResult(payload, {
        onSuccess: async (result) => {
          setSearchResults(result);

          // console.log(result)
          // // console.log()

          // Clear sessionStorage after successful fetch
          sessionStorage.removeItem("resultSearchPayload");
        },
        onError: (error) => {
          toast.error("Failed to fetch result. Please try again.");
          setTimeout(() => router.push("/"), 2000);
        },
      });
    } catch (error) {
      toast.error("Invalid search data. Redirecting to search page...");
      router.push("/");
    }
  }, [getResult, router]);

  // this is for search again button
  const handleSearchAgain = () => {
    router.push("/");
  };


  // Loading state
  if (isPending) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-4">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-[#6b7280] mx-auto mb-4" />
          <p className="text-xl font-semibold text-[#374151]">
            Searching Result...
          </p>
        </div>
      </div>
    );
  }

  // No results or error state
  if (!searchResults) {
    return null;
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
