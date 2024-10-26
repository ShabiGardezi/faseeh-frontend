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
import { Loader2, Upload, Save, FileDown, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import LoadingOverlay from "@/components/shared/LoadingOverlay";

export function GrammarSpellCheckComponent() {
  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState(null);
  const [checkedText, setCheckedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleCheckText = async () => {
    setIsLoading(true);
    // Placeholder for API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCheckedText(
      `Corrected text: ${inputText}\n\nErrors found:\n1. Error 1\n2. Error 2`
    );
    setIsLoading(false);
  };

  const handleSaveResult = () => {
    // Placeholder for saving functionality
    toast({
      title: "Result Saved",
      description:
        "Your checked text has been successfully saved in your activity log.",
    });
  };

  const handleExportResult = () => {
    // Placeholder for export functionality
    toast({
      title: "Result Exported",
      description: "Your checked text has been exported as a PDF document.",
    });
  };

  const handleReset = () => {
    setInputText("");
    setFile(null);
    setCheckedText("");
  };

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />

      <div className="min-h-screen bg-white p-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-[#20b1c9] text-center my-5">
              خدمة التدقيق النحوي والإملائي
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              placeholder="أدخل النص الذي تريد التحقق منه هنا."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-40 p-4 border-2 border-[#1C9AAF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#20b1c9]"
              dir="rtl"
            />

            <div className="flex items-center space-x-4" dir="rtl">
              <Button
                onClick={() => document.getElementById("fileInput")?.click()}
                className="bg-[#1C9AAF] hover:bg-[#20b1c9] text-white ml-3"
              >
                <Upload className="mr-2 h-4 w-4" /> تحميل المستند
              </Button>
              <input
                id="fileInput"
                type="file"
                accept=".doc,.docx,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                dir="rtl"
              />
              <span className="text-sm text-gray-600">
                {file
                  ? file.name
                  : "قم بتحميل المستند الخاص بك بتنسيق Word أو PDF لإجراء التدقيق النحوي والإملائي."}
              </span>
            </div>

            <Button
              onClick={handleCheckText}
              disabled={isLoading || (!inputText && !file)}
              className="w-full bg-[#20b1c9] hover:bg-[#1C9AAF] text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> جارٍ
                  التحقق...
                </>
              ) : (
                "تحقق من النص"
              )}
            </Button>

            {checkedText && (
              <div className="p-4 border-2 border-[#1C9AAF] rounded-md bg-[#f0f9fa]" dir="rtl">
                <h2 className="text-xl font-semibold mb-2 text-[#20b1c9]">
                نتائج التحقق:
                </h2>
                <pre className="whitespace-pre-wrap text-sm">{checkedText}</pre>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={handleSaveResult}
              disabled={!checkedText}
              className="bg-[#1C9AAF] hover:bg-[#20b1c9] text-white"
            >
              <Save className="mr-2 h-4 w-4" /> حفظ النتيجة
            </Button>
            <Button
              onClick={handleExportResult}
              disabled={!checkedText}
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
