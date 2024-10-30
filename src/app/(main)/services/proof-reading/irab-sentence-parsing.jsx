"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import useDownloadPdf from "@/hooks/useDownloadPdf";
import axiosInstance from "@/lib/axios";

export function IrabSentenceParsingComponent() {
  const [inputText, setInputText] = useState("");
  const [parsingResult, setParsingResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { downloadPdf } = useDownloadPdf();


  const handleParseSentence = async () => {
    setIsLoading(true);

    try {
      // Make the API request with axiosInstance
      const response = await axiosInstance.post("/watson/proofread", {
        content: inputText,
      });

      // Get the generated text from the response
      const generatedText = response?.data?.generated_text;

      setParsingResult(generatedText);
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

  const handleSaveResult = () => {
    // Placeholder for saving functionality
    toast({
      title: "Parsing Result Saved",
      description:
        "Your parsing result has been successfully saved in your activity log.",
    });
  };

  const handleExportResult = () => {
    if (parsingResult) {
      downloadPdf(parsingResult, "parsingResult.pdf");
      
      // Placeholder for export functionality
      toast({
        title: "القصة تم تصديرها",
        description: "تم تصدير قصتك كملف PDF.",
      });
    }
  };

  const handleReset = () => {
    setInputText("");
    setParsingResult("");
  };

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />

      <div className="min-h-screen bg-white p-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-[#20b1c9] text-center my-5">
              الإعراب
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              placeholder="أدخل الجملة التي تريد إعرابها هنا."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-32 p-4 border-2 border-[#1C9AAF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#20b1c9]"
              dir="rtl"
            />
            <Button
              onClick={handleParseSentence}
              disabled={isLoading || !inputText}
              className="w-full bg-[#20b1c9] hover:bg-[#1C9AAF] text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> الإعراب
                  Sentence...
                </>
              ) : (
                "إعراب الجملة"
              )}
            </Button>

            {parsingResult && (
              <div className="p-4 border-2 border-[#1C9AAF] rounded-md bg-[#f0f9fa]" dir="rtl">
                <h2 className="text-xl font-semibold mb-2 text-[#20b1c9]">
                  نتيجة الإعراب:
                </h2>
                <pre className="whitespace-pre-wrap text-sm">
                  {parsingResult}
                </pre>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center gap-4 md:justify-between md:gap-0 flex-wrap">
            <Button
              onClick={handleSaveResult}
              disabled={!parsingResult}
              className="bg-[#1C9AAF] hover:bg-[#20b1c9] text-white"
            >
              <Save className="mr-2 h-4 w-4" /> حفظ النتيجة
            </Button>
            <Button
              onClick={handleExportResult}
              disabled={!parsingResult}
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
