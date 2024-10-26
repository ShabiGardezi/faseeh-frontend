"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Save, FileDown, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import LoadingOverlay from "@/components/shared/LoadingOverlay";

export function MarketingTextGeneratorComponent() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [benefits, setBenefits] = useState("");
  const [cta, setCta] = useState("");
  const [marketingText, setMarketingText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateText = async () => {
    setIsLoading(true);
    // Placeholder for API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setMarketingText(
      `اهتمام ${audience}! اكتشف ${product} الرائع الذي ${benefits}. لا تفوت الفرصة - ${cta}!`
    );
    setIsLoading(false);
  };

  const handleSaveText = () => {
    // Placeholder for saving functionality
    toast({
      title: "تم حفظ النص التسويقي",
      description:
        "لقد تم حفظ نصك التسويقي بنجاح في سجل نشاطك.",
    });
  };

  const handleExportText = () => {
    // Placeholder for export functionality
    toast({
      title: "تم تصدير النص التسويقي",
      description: "لقد تم تصدير نصك التسويقي كملف PDF.",
    });
  };

  const handleReset = () => {
    setProduct("");
    setAudience("");
    setBenefits("");
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
              مول النصوص التسويقية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2" dir="rtl">
              <Label htmlFor="product">اسم المنتج/الخدمة</Label>
              <Input
                id="product"
                placeholder="أدخل اسم المنتج أو الخدمة"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="border-[#1C9AAF] focus:ring-[#20b1c9]"
              />
            </div>
            <div className="space-y-2" dir="rtl">
              <Label htmlFor="audience">الجمهور المستهدف</Label>
              <Input
                id="audience"
                placeholder="وصف جمهورك المستهدف"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="border-[#1C9AAF] focus:ring-[#20b1c9]"
              />
            </div>
            <div className="space-y-2" dir="rtl">
              <Label htmlFor="benefits">الفوائد/المميزات الرئيسية</Label>
              <Textarea
                id="benefits"
                placeholder="أدخل الميزات/الفوائد الرئيسية"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                className="border-[#1C9AAF] focus:ring-[#20b1c9]"
              />
            </div>
            <div className="space-y-2" dir="rtl">
              <Label htmlFor="cta">نداء للعمل (CTA)</Label>
              <Input
                id="cta"
                placeholder="أدخل نداء العمل المرغوب (مثل 'اشترِ الآن'، 'تعلم المزيد')"
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                className="border-[#1C9AAF] focus:ring-[#20b1c9]"
              />
            </div>
            <Button
              onClick={handleGenerateText}
              disabled={isLoading || !product || !audience || !benefits || !cta}
              className="w-full bg-[#20b1c9] hover:bg-[#1C9AAF] text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> جاري
                  إنشاء النص...
                </>
              ) : (
                "إنشاء نص تسويقي"
              )}
            </Button>

            {marketingText && (
              <div className="p-4 border-2 border-[#1C9AAF] rounded-md bg-[#f0f9fa]" dir="rtl">
                <h2 className="text-xl font-semibold mb-2 text-[#20b1c9]">
                  النص التسويقي الذي تم إنشاؤه:
                </h2>
                <p className="text-lg">{marketingText}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={handleSaveText}
              disabled={!marketingText}
              className="bg-[#1C9AAF] hover:bg-[#20b1c9] text-white"
            >
              <Save className="mr-2 h-4 w-4" /> حفظ النتيجة
            </Button>
            <Button
              onClick={handleExportText}
              disabled={!marketingText}
              className="bg-[#1C9AAF] hover:bg-[#20b1c9] text-white"
            >
              <FileDown className="mr-2 h-4 w-4" /> تصدير النتائج
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
