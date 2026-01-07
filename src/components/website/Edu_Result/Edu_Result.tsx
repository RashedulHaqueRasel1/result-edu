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
  const [captchaMath, setCaptchaMath] = useState({ num1: 0, num2: 0, sum: 0 });

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    setCaptchaMath({ num1, num2, sum: num1 + num2 });
  };

  React.useEffect(() => {
    generateCaptcha();
  }, []);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) =>
    (currentYear - i).toString()
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exam: "",
      year: "",
      board: "",
      roll: "",
      registration: "",
      captcha: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // Validate captcha
    if (parseInt(data.captcha) !== captchaMath.sum) {
      toast.error("Invalid calculation. Please try again.");
      form.setValue("captcha", "");
      generateCaptcha();
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
    // toast.success("Redirecting to result page...");
    router.push("/result");
  };

  const handleReset = () => {
    form.reset();
    generateCaptcha(); // Reset captcha as well
    toast.info("Form has been reset");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950 dark:to-teal-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-6 sm:p-10 lg:p-12 mb-8 animate-fade-in-up">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 max-w-2xl mx-auto"
            >
              {/* Examination */}
              <FormField
                control={form.control}
                name="exam"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 space-y-0">
                    <FormLabel className="text-base font-bold text-gray-800 dark:text-gray-200 sm:text-right">
                      Examination
                    </FormLabel>
                    <div className="col-span-1 sm:col-span-3">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-700/50">
                            <SelectValue placeholder="SSC/Dakhil/Equivalent" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ssc">SSC/Dakhil/Equivalent</SelectItem>
                          <SelectItem value="jsc">JSC/JDC</SelectItem>
                          <SelectItem value="jsc">SSC(Vocational)</SelectItem>
                          <SelectItem value="jsc">HSC/Alim</SelectItem>
                          <SelectItem value="jsc">HSC(Vocational)</SelectItem>
                          <SelectItem value="jsc">HSC(BM)</SelectItem>
                          <SelectItem value="jsc">Diploma in Commerce</SelectItem>
                          <SelectItem value="jsc">Diploma in Business Studies</SelectItem>
                          <SelectItem value="hsc">HSC/Alim/Equivalent</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Year */}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 space-y-0">
                    <FormLabel className="text-base font-bold text-gray-800 dark:text-gray-200 sm:text-right">
                      Year
                    </FormLabel>
                    <div className="col-span-1 sm:col-span-3">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-700/50">
                            <SelectValue placeholder="Select One" />
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
                    </div>
                  </FormItem>
                )}
              />

              {/* Board */}
              <FormField
                control={form.control}
                name="board"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 space-y-0">
                    <FormLabel className="text-base font-bold text-gray-800 dark:text-gray-200 sm:text-right">
                      Board
                    </FormLabel>
                    <div className="col-span-1 sm:col-span-3">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-700/50">
                            <SelectValue placeholder="Select One" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="dhaka">Dhaka</SelectItem>
                          <SelectItem value="rajshahi">Rajshahi</SelectItem>
                          <SelectItem value="comilla">Comilla</SelectItem>
                          <SelectItem value="jessore">Jessore</SelectItem>
                          <SelectItem value="chittagong">Chittagong</SelectItem>
                          <SelectItem value="barisal">Barisal</SelectItem>
                          <SelectItem value="sylhet">Sylhet</SelectItem>
                          <SelectItem value="dinajpur">Dinajpur</SelectItem>
                          <SelectItem value="madrasah">Madrasah</SelectItem>
                          <SelectItem value="tec">Technical</SelectItem>
                          <SelectItem value="tec">DIBS(Dhaka)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Roll */}
              <FormField
                control={form.control}
                name="roll"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 space-y-0">
                    <FormLabel className="text-base font-bold text-gray-800 dark:text-gray-200 sm:text-right">
                      Roll
                    </FormLabel>
                    <div className="col-span-1 sm:col-span-3">
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-50 dark:bg-gray-700/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Reg: No */}
              <FormField
                control={form.control}
                name="registration"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 space-y-0">
                    <FormLabel className="text-base font-bold text-gray-800 dark:text-gray-200 sm:text-right">
                      Reg: No
                    </FormLabel>
                    <div className="col-span-1 sm:col-span-3">
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-50 dark:bg-gray-700/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Captcha */}
              <FormField
                control={form.control}
                name="captcha"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 space-y-0">
                    <FormLabel className="text-base font-bold text-gray-800 dark:text-gray-200 sm:text-right">
                      {captchaMath.num1} + {captchaMath.num2}
                    </FormLabel>
                    <div className="col-span-1 sm:col-span-3 flex items-center gap-2">
                       <span className="font-bold text-lg">=</span>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-50 dark:bg-gray-700/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                 <div className="col-span-1 sm:col-span-1"></div>
                 <div className="col-span-1 sm:col-span-3 flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      className="cursor-pointer"
                    >
                      Reset
                    </Button>
                     <Button
                      type="submit"
                      className="bg-gray-200 hover:bg-gray-300 text-black border border-gray-300 cursor-pointer"
                    >
                      Submit
                    </Button>
                 </div>
              </div>

            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
