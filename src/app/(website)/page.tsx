import Edu_Result from "@/components/website/Edu_Result/Edu_Result";
import SEOContent from "@/components/website/SEOContent/SEOContent";
import FAQ from "@/components/website/FAQ/FAQ";

export default function page() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Edu_Result />
      <SEOContent />
      <FAQ />
    </main>
  );
}
