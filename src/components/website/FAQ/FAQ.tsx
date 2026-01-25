import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqData = [
    {
        question: "How can I check SSC result 2026 in Bangladesh?",
        answer:
            "You can check your SSC Result 2026 by selecting 'SSC/Dakhil/Equivalent' from the examination menu, choosing the year '2026', selecting your Board, and entering your Roll and Registration numbers.",
    },
    {
        question: "Can I check result using roll and registration number?",
        answer:
            "Yes, the most accurate way to check your individual result is by providing both your Roll Number and Registration Number.",
    },
    {
        question: "How to check institute result by EIIN number?",
        answer:
            "To check institute-wise results, you need to use the 'Institution Result' option (if available) or search using the specific EIIN number provided by your education board.",
    },
    {
        question: "What is individual or detailed result?",
        answer:
            "An individual result provides the GPA, grade sheet, and subject-wise marks (if released) for a single student, accessible via Roll and Registration number.",
    },
    {
        question: "How to get marksheet with subject-wise numbers?",
        answer:
            "After submitting your valid Roll and Registration number, if the Education Board has published the detailed marks, you will see a 'Grade Sheet' section displaying subject-wise grades and numbers.",
    },
    {
        question: "Which education boards are supported?",
        answer:
            "We support all education boards in Bangladesh including Dhaka, Rajshahi, Comilla, Jessore, Chittagong, Barisal, Sylhet, Dinajpur, Madrasah, and Technical Boards.",
    },
    {
        question: "What should I do if CAPTCHA or security key is incorrect?",
        answer:
            "If the CAPTCHA is incorrect, simply click the 'Reset' button to generate a new math problem, calculate the sum, and enter the correct value.",
    },
];

export default function FAQ() {
    // JSON-LD Schema for FAQ Page
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqData.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 animate-fade-in-up">
            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 mb-4">
                    <HelpCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Frequently Asked Questions
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Common questions about checking education board results
                </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium text-gray-800 dark:text-gray-200">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-300">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
