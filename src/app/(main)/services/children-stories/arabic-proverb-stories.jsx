"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import axiosInstance from "@/lib/axios";
import useDownloadPdf from "@/hooks/useDownloadPdf";
import { useUser } from "@/contexts/UserContext";
import { useActivityLog } from "@/contexts/ActivityLogContext";
import SignInModal from "@/components/shared/SignInModal";

const proverbs = [
  "من طلب العلا سهر الليالي",
  "الوقت كالسيف إن لم تقطعه قطعك",
  "العلم في الصغر كالنقش على الحجر",
  "من جد وجد ومن زرع حصد",
  "الصديق وقت الضيق",
  "العقل السليم في الجسم السليم",
];

export function ArabicProverbStoriesComponent() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [proverb, setProverb] = useState("");
  const [story, setStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { downloadPdf } = useDownloadPdf();
  const { isAuthenticated, user } = useUser();
  const { addActivityLog } = useActivityLog();
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleSignIn = () => {
    setShowSignInModal(false);
    router.push("/login");
  };

  const handleCloseSignInModal = () => {
    setShowSignInModal(false);
  };

  const handleGenerateStory = async () => {
    setIsLoading(true);

    try {
      // Make the API request with axiosInstance
      const response = await axiosInstance.post("/watson/children-story", {
        childName: name,
        age: age,
        proverb: proverb,
      });

      // Get the generated text from the response
      const generatedText = response?.data?.generated_text;

      setStory(generatedText);
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

  const handleSaveStory = () => {
    if (!isAuthenticated) {
      setShowSignInModal(true);
      return;
    }

    addActivityLog({
      input: proverb,
      output: story,
      userId: user?.id,
      serviceType: "CHILDREN_STORY",
    });

    toast({
      title: "القصة محفوظة",
      description: "تم حفظ قصتك بنجاح في سجل الأنشطة الخاص بك.",
    });
  };

  const handleExportStory = () => {
    if (story) {
      downloadPdf(story, "story.pdf");

      // Placeholder for export functionality
      toast({
        title: "القصة تم تصديرها",
        description: "تم تصدير قصتك كملف PDF.",
      });
    }
  };

  const handleReset = () => {
    setName("");
    setAge("");
    setProverb("");
    setStory("");
  };

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />

      <SignInModal
        open={showSignInModal}
        onSignIn={handleSignIn}
        onClose={handleCloseSignInModal}
      />

      <div className="min-h-screen bg-white p-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-[#20b1c9] text-center my-5">
              قصص الأطفال بناءً على الأمثال العربية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2" dir="rtl">
              <Label htmlFor="name">اسم الطفل</Label>
              <Input
                id="name"
                placeholder="أدخل اسم الطفل"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-[#1C9AAF] focus:ring-[#20b1c9]"
              />
            </div>
            <div className="space-y-2" dir="rtl">
              <Label htmlFor="age">عمر الطفل</Label>
              <Input
                id="age"
                type="number"
                placeholder="أدخل عمر الطفل"
                value={age}
                min={1}
                max={18}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (value >= 1 && value <= 18) {
                    setAge(value);
                  } else if (!e.target.value) {
                    setAge(""); // Allow empty input to clear the field
                    toast({
                      title: "خطأ",
                      description: "يرجى إدخال عمر صالح.",
                      variant: "error",
                    });
                  }
                }}
                className="border-[#1C9AAF] focus:ring-[#20b1c9]"
              />
            </div>
            <div className="space-y-2" dir="rtl">
              <Label htmlFor="proverb">اختر مثل عربي</Label>
              <Select value={proverb} onValueChange={setProverb} dir="rtl">
                <SelectTrigger className="border-[#1C9AAF] focus:ring-[#20b1c9]">
                  <SelectValue placeholder="اختر مثل عربي" />
                </SelectTrigger>
                <SelectContent>
                  {proverbs.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleGenerateStory}
              disabled={isLoading || !name || !age || !proverb}
              className="w-full bg-[#20b1c9] hover:bg-[#1C9AAF] text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> جاري إنشاء
                  القصة...
                </>
              ) : (
                "إنشاء القصة"
              )}
            </Button>
            <p className="text-sm text-gray-600" dir="rtl">
              انقر لإنشاء القصة بناءً على التفاصيل المدخلة.
            </p>

            {story && (
              <div
                className="p-4 border-2 border-[#1C9AAF] rounded-md bg-[#f0f9fa]"
                dir="rtl"
              >
                <h2 className="text-xl font-semibold mb-2 text-[#20b1c9]">
                  القصة التي تم إنشاؤها:
                </h2>
                <p className="text-lg font-comic-sans">{story}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center gap-4 md:justify-between md:gap-0 flex-wrap">
            <Button
              onClick={handleSaveStory}
              disabled={!story}
              className="bg-[#1C9AAF] hover:bg-[#20b1c9] text-white"
            >
              <Save className="mr-2 h-4 w-4" /> حفظ النتيجة
            </Button>
            <Button
              onClick={handleExportStory}
              disabled={!story}
              className="bg-[#1C9AAF] hover:bg-[#20b1c9] text-white"
            >
              <FileDown className="mr-2 h-4 w-4" /> تصدير القصة
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
