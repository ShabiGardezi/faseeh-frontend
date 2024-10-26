"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Save, FileDown, RefreshCw, Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import LoadingOverlay from "@/components/shared/LoadingOverlay";
import axiosInstance from "@/lib/axios";
import useDownloadPdf from "@/hooks/useDownloadPdf";

export function MarketingTextGeneratorComponent() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [benefits, setBenefits] = useState([]);
  const [currentBenefit, setCurrentBenefit] = useState("");
  const [cta, setCta] = useState("");
  const [marketingText, setMarketingText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { downloadPdf } = useDownloadPdf();


  const handleAddBenefit = () => {
    if (currentBenefit.trim()) {
      setBenefits([...benefits, currentBenefit.trim()]);
      setCurrentBenefit("");
    }
  };

  const handleRemoveBenefit = (index) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const handleGenerateText = async () => {
    setIsLoading(true);

    try {
      // Make the API request with axiosInstance
      const response = await axiosInstance.post("/marketing-text", {
        productService: product,
        targetAudience: audience,
        keyBenefits: benefits,
        callToAction: cta,
      });

      // Get the generated text from the response
      const generatedText = response?.data?.generated_text;

      setMarketingText(generatedText);
    } catch (error) {
      console.error("Error generating child stories:", error);
      toast({
        title: "Error",
        description: "Failed to generate email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveText = () => {
    // Placeholder for saving functionality
    toast({
      title: "تم حفظ النص التسويقي",
      description: "تم حفظ النص التسويقي بنجاح في سجل نشاطك.",
    });
  };

  const handleExportText = () => {
    if (marketingText) {
      downloadPdf(marketingText, "story.pdf");
    // Placeholder for export functionality
    toast({
      title: "تم تصدير النص التسويقي",
      description: "تم تصدير النص التسويقي كوثيقة PDF.",
    });
  }
  };

  const handleReset = () => {
    setProduct("");
    setAudience("");
    setBenefits([]);
    setCurrentBenefit("");
    setCta("");
    setMarketingText("");
  };

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />

      <div className="min-h-screen bg-white p-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-[#20b1c9] text-center my-5">
              مولد النص التسويقي
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6" dir="rtl">
            <div className="space-y-2">
              <Label htmlFor="product">اسم المنتج/الخدمة</Label>
              <Input
                id="product"
                placeholder="أدخل اسم المنتج أو الخدمة"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="border-[#1C9AAF] focus:ring-[#20b1c9]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience">الجمهور المستهدف</Label>
              <Input
                id="audience"
                placeholder="صف جمهورك المستهدف"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="border-[#1C9AAF] focus:ring-[#20b1c9]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="benefits">الفوائد/المزايا الرئيسية</Label>
              <div className="flex space-x-2">
                <Input
                  id="benefits"
                  placeholder="أدخل ميزة أو فائدة رئيسية"
                  value={currentBenefit}
                  onChange={(e) => setCurrentBenefit(e.target.value)}
                  className="border-[#1C9AAF] focus:ring-[#20b1c9] ml-2"
                />
                <Button
                  onClick={handleAddBenefit}
                  className="bg-[#20b1c9] hover:bg-[#1C9AAF] text-white ml-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-[#f0f9fa] text-[#1C9AAF] px-3 py-1 rounded-full flex items-center"
                  >
                    <button
                      onClick={() => handleRemoveBenefit(index)}
                      className="ml-2 text-[#1C9AAF] hover:text-[#20b1c9]"
                      >
                      <X className="h-4 w-4" />
                    </button>
                      <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta">الدعوة إلى العمل (CTA)</Label>
              <Input
                id="cta"
                placeholder="أدخل CTA المطلوب (مثل، 'اشتري الآن'، 'تعلم المزيد')"
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                className="border-[#1C9AAF] focus:ring-[#20b1c9]"
              />
            </div>
            <Button
              onClick={handleGenerateText}
              disabled={
                isLoading ||
                !product ||
                !audience ||
                benefits.length === 0 ||
                !cta
              }
              className="w-full bg-[#20b1c9] hover:bg-[#1C9AAF] text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> يتم إنشاء
                  النص...
                </>
              ) : (
                "إنشاء نص تسويقي"
              )}
            </Button>

            {marketingText && (
              <div className="p-4 border-2 border-[#1C9AAF] rounded-md bg-[#f0f9fa]">
                <h2 className="text-xl font-semibold mb-2 text-[#20b1c9]">
                  النص التسويقي الناتج:
                </h2>
                <p className="text-lg">{marketingText}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center gap-4 md:justify-between md:gap-0 flex-wrap">
            <Button
              onClick={handleSaveText}
              disabled={!marketingText}
              className="bg-[#1C9AAF] hover:bg-[#20b1c9] text-white"
            >
              <Save className="mr-2 h-4 w-4" /> حفظ النص
            </Button>
            <Button
              onClick={handleExportText}
              disabled={!marketingText}
              className="bg-[#1C9AAF] hover:bg-[#20b1c9] text-white"
            >
              <FileDown className="mr-2 h-4 w-4" /> تصدير النص
            </Button>
            <Button
              onClick={handleReset}
              className="bg-white text-[#20b1c9] border-2 border-[#20b1c9] hover:bg-[#20b1c9] hover:text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> إعادة تعيين
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
