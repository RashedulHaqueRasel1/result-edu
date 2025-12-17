"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useGetResult, ResultResponse } from "@/lib/hooks/useResult";

export default function Result() {
  const router = useRouter();
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
        onSuccess: (result) => {
          setSearchResults(result);
          // Clear sessionStorage after successful fetch
          sessionStorage.removeItem("resultSearchPayload");
        },
        onError: (error) => {
          toast.error("Failed to fetch result. Please try again.");
          console.error("Error:", error);
          // Redirect back to search page on error
          setTimeout(() => router.push("/"), 2000);
        },
      });
    } catch (error) {
      toast.error("Invalid search data. Redirecting to search page...");
      router.push("/");
    }
  }, [getResult, router]);

  const handleSearchAgain = () => {
    router.push("/");
  };

  // Loading state
  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950 dark:to-teal-950 flex items-center justify-center p-4">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 sm:w-16 sm:h-16 animate-spin text-green-600 dark:text-green-400 mx-auto mb-4" />
          <p className="text-lg sm:text-xl font-semibold text-muted-foreground">
            Loading your results...
          </p>
        </div>
      </div>
    );
  }

  // No results or error state
  if (!searchResults) {
    return null; // Will redirect to homepage
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950 dark:to-teal-950 py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button
          onClick={handleSearchAgain}
          variant="outline"
          className="w-full sm:w-auto mb-4 sm:mb-6 hover:bg-muted transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Search Again
        </Button>

        {/* Results Display */}
        {searchResults.success && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-4 sm:p-6 lg:p-8 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-3 sm:mb-4 shadow-lg">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-2 px-4">
                {searchResults.summary.Result}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base px-4">
                {searchResults.exam}
              </p>
            </div>

            {/* GPA Summary Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-xl p-4 sm:p-6 border-2 border-green-300 dark:border-green-800 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-muted-foreground mb-1">GPA</p>
                  <p className="text-4xl sm:text-5xl font-bold text-green-600 dark:text-green-400">
                    {searchResults.summary.GPA}
                  </p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-sm text-muted-foreground mb-1">Result</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                    {searchResults.summary.Result}
                  </p>
                </div>
              </div>
            </div>

            {/* Student Information */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 px-1">
                Student Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                  <p className="text-lg font-bold">
                    {searchResults.studentInfo.Name}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-muted-foreground mb-1">
                    Father&apos;s Name
                  </p>
                  <p className="text-base font-semibold">
                    {searchResults.studentInfo["Fathers Name"]}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-muted-foreground mb-1">
                    Mother&apos;s Name
                  </p>
                  <p className="text-base font-semibold">
                    {searchResults.studentInfo["Mothers Name"]}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-muted-foreground mb-1">
                    Institute
                  </p>
                  <p className="text-base font-semibold">
                    {searchResults.studentInfo.Institute}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-muted-foreground mb-1">Board</p>
                  <p className="text-base font-semibold">
                    {searchResults.studentInfo.Board}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-muted-foreground mb-1">Roll</p>
                  <p className="text-base font-semibold font-mono">
                    {searchResults.studentInfo["Roll No"]}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-muted-foreground mb-1">
                    Registration
                  </p>
                  <p className="text-base font-semibold font-mono">
                    {searchResults.studentInfo["Reg No"] || "N/A"}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-muted-foreground mb-1">Group</p>
                  <p className="text-base font-semibold">
                    {searchResults.studentInfo.Group}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-muted-foreground mb-1">Type</p>
                  <p className="text-base font-semibold">
                    {searchResults.studentInfo.Type}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-muted-foreground mb-1">
                    Date of Birth
                  </p>
                  <p className="text-base font-semibold">
                    {searchResults.studentInfo["Date of Birth"]}
                  </p>
                </div>
              </div>
            </div>

            {/* Subjects Table */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 px-1">
                Subject-wise Results
              </h3>
              <div className="overflow-x-auto rounded-lg border border-green-200 dark:border-green-800 -mx-4 sm:mx-0">
                <table className="w-full min-w-[400px]">
                  <thead className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50">
                    <tr>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
                        Code
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
                        Subject Name
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-green-100 dark:divide-green-800">
                    {searchResults.subjects.map((subject, index) => (
                      <tr
                        key={subject.code}
                        className={`${
                          index % 2 === 0
                            ? "bg-white dark:bg-gray-800"
                            : "bg-green-50/50 dark:bg-green-950/20"
                        } hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors`}
                      >
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium">
                          {subject.code}
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                          {subject.name}
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-center">
                          <span
                            className={`inline-flex items-center justify-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
                              subject.grade === "A+"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                                : subject.grade === "A"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                                  : subject.grade === "A-"
                                    ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300"
                                    : "bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-300"
                            }`}
                          >
                            {subject.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
