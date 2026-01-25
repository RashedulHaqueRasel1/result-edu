
export default function SEOContent() {
    return (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fade-in-up">
            {/* Primary Heading Section */}
            <div className="text-center space-y-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                    Bangladesh Education Board Result Checker – SSC, JSC & HSC Results
                    Online
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Welcome to the most trusted **Web Based Result Publication System for
                    Bangladesh**. Search individual and detailed results for **SSC,
                    Dakhil, HSC, Alim, and JSC/JDC examinations**.
                </p>
            </div>

            {/* Feature Grids (H2 Sections) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-3">
                        Check SSC, JSC & HSC Results by Roll and Registration
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        You can easily check your **SSC Result 2026** or **HSC Result
                        2026** by entering your Roll and Registration number. Our system
                        fetches data directly from the education board database to ensure
                        accuracy.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-3">
                        Institute-Wise Result Search Using EIIN Number
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Institutions can download complete result sheets using their **EIIN
                        number**. Get analytics and performance reports for your school or
                        college effortlessly.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-3">
                        Get Detailed Marksheet with Subject-Wise Grades
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Need more than just the GPA? View and print your full **marksheet
                        with subject-wise numbers**. Available for all education boards
                        including Dhaka, Rajshahi, Comilla, and Madrasah Board.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-3">
                        Fast, Secure & Mobile-Friendly Result Checking Platform
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Optimized for low-bandwidth connections, our platform allows you to
                        **check education board results online** quickly, even on mobile
                        data.
                    </p>
                </div>
            </div>

            {/* Trust & Transparency */}
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-6 rounded-xl border border-emerald-100 dark:border-emerald-900 mt-8">
                <p className="text-sm text-center text-emerald-800 dark:text-emerald-300">
                    <strong>Note:</strong> This is a non-government educational result
                    information platform designed to help students easily access publicly
                    available examination results. All data is presented in a structured
                    and user-friendly manner for educational purposes only.
                </p>
            </div>
        </section>
    );
}
