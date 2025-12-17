"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Search, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Form validation schema
const formSchema = z.object({
  board: z.string().min(1, "Board is required"),
  exam: z.string().min(1, "Exam is required"),
  year: z.string().min(1, "Year is required"),
  roll: z.string().min(1, "Roll number is required"),
  registration: z.string().min(1, "Registration number is required"),
  captcha: z.string().min(1, "Captcha is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function Edu_Result() {
  const router = useRouter();
  const [captchaValue] = useState(() =>
    Math.floor(1000 + Math.random() * 9000).toString()
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) =>
    (currentYear - i).toString()
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      board: "",
      exam: "",
      year: "",
      roll: "",
      registration: "",
      captcha: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // Validate captcha
    if (data.captcha !== captchaValue) {
      toast.error("Invalid captcha. Please try again.");
      form.setValue("captcha", "");
      return;
    }

    // Prepare payload for the Result page
    const payload = {
      board: data.board,
      exam: data.exam,
      year: data.year,
      roll: data.roll,
      registration: data.registration,
    };

    // Store payload in sessionStorage for the Result page to consume
    sessionStorage.setItem("resultSearchPayload", JSON.stringify(payload));

    // Navigate to the Result page
    toast.success("Redirecting to result page...");
    router.push("/result");
  };

  const handleReset = () => {
    form.reset();
    toast.info("Form has been reset");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950 dark:to-teal-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-down">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-3 sm:mb-4 shadow-lg">
            <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-2 sm:mb-3 px-4">
            Educational Result Search
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Search and view your educational examination results instantly
          </p>
        </div>

        {/* Search Form Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-4 sm:p-6 lg:p-8 mb-8 animate-fade-in-up">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-6"
            >
              {/* Row 1: Board, Exam, Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <FormField
                  control={form.control}
                  name="board"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Board
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full cursor-pointer">
                            <SelectValue placeholder="Select Board" />
                          </SelectTrigger>
                        </FormControl>  
                        <SelectContent>
                          <SelectItem value="dinajpur">Dinajpur</SelectItem>
                          <SelectItem value="dhaka">Dhaka</SelectItem>
                          <SelectItem value="chittagong">Chittagong</SelectItem>
                          <SelectItem value="rajshahi">Rajshahi</SelectItem>
                          <SelectItem value="comilla">Comilla</SelectItem>
                          <SelectItem value="jessore">Jessore</SelectItem>
                          <SelectItem value="sylhet">Sylhet</SelectItem>
                          <SelectItem value="barisal">Barisal</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="exam"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Exam
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full cursor-pointer">
                            <SelectValue placeholder="Select Exam" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ssc">SSC</SelectItem>
                          <SelectItem value="hsc">HSC</SelectItem>
                          <SelectItem value="jsc">JSC</SelectItem>
                          <SelectItem value="dakhil">Dakhil</SelectItem>
                          <SelectItem value="alim">Alim</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Year
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full cursor-pointer">
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 2: Roll, Registration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <FormField
                  control={form.control}
                  name="roll"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Roll Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 438173"
                          {...field}
                          className="transition-all duration-200 focus:scale-[1.02]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="registration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Registration Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 4362836283"
                          {...field}
                          className="transition-all duration-200 focus:scale-[1.02]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Captcha */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <FormField
                  control={form.control}
                  name="captcha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Enter Captcha Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the code shown"
                          {...field}
                          className="transition-all duration-200 focus:scale-[1.02]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-center">
                  <div className="w-full max-w-xs bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg p-4 sm:p-6 border-2 border-dashed border-green-300 dark:border-green-700">
                    <p className="text-2xl sm:text-3xl font-bold text-center font-mono tracking-widest text-green-700 dark:text-green-300">
                      {captchaValue}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 ">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] h-12 sm:h-auto py-3 cursor-pointer"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search Result
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                  className="w-full sm:w-auto sm:flex-initial border-2 hover:bg-muted transition-all duration-300 h-12 sm:h-auto cursor-pointer"
                >
                  Reset Form
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
