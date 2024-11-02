"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, UploadCloud, Download, RefreshCw } from "lucide-react";
import jsPDF from "jspdf";
import axiosInstance from "@/lib/axios";
import LoadingOverlay from "@/components/shared/LoadingOverlay";
import useFileTextExtractor from "@/hooks/useFileTextExtractor";

export function TashkeelVowelizationComponent() {
  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState(null);
  const [vowelizedText, setVowelizedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { extractTextFromFile, extractedText, loading, error } =
    useFileTextExtractor();

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);

      // Extract text from the uploaded file
      await extractTextFromFile(uploadedFile);
    }
  };

  // Set the extracted text to inputText when it's updated
  useEffect(() => {
    if (extractedText) {
      setInputText(extractedText);
    }
  }, [extractedText]);

  const handleStartTashkeel = async () => {
    setIsLoading(true);

    try {
      // Make the API request with axiosInstance
      const response = await axiosInstance.post("/watson/tashkeel", {
        content: inputText,
      });

      // Get the generated text from the response
      const generatedText = response?.data?.generated_text;

      // Set the generated text in state
      setVowelizedText(generatedText);
    } catch (error) {
      console.error("Error generating email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportResults = () => {
    const doc = new jsPDF();

    // Content body
    doc.setTextColor("black");
    doc.setFontSize(12);
    doc.text(vowelizedText, 10, 6, { maxWidth: 180 });

    // Save the PDF
    doc.save(`taskeel.pdf`);
  };

  const handleReset = () => {
    setInputText("");
    setFile(null);
    setVowelizedText("");
  };

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />

      <div className="min-h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* title  */}
          <h1 className="text-3xl font-bold text-[#20b1c9] text-center">
            التشكيل
          </h1>

          {/* input section  */}
          <Textarea
            placeholder="أدخل النص الذي تريد تشكيله هنا."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-40 p-4 border-2 border-[#1C9AAF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#20b1c9]"
            dir="rtl"
          />

          {/* file upload section  */}
          {/* <div className="flex items-center space-x-4" dir="rtl">
            <Button
              onClick={() => document.getElementById("fileInput")?.click()}
              className="bg-[#1C9AAF] hover:bg-[#20b1c9] text-white ml-2"
            >
              <UploadCloud className="ml-2 h-4 w-4" /> تحميل المستند
            </Button>
            <input
              id="fileInput"
              type="file"
              accept=".doc,.docx,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <span className="text-sm text-gray-600">
              {file
                ? file.name
                : "قم بتحميل المستند الخاص بك بتنسيق Word أو PDF لتشكيل محتواه."}
            </span>
          </div> */}

          {/* submission section  */}
          <Button
            onClick={handleStartTashkeel}
            disabled={isLoading || (!inputText && !file)}
            className="w-full bg-[#20b1c9] hover:bg-[#1C9AAF] text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> جارٍ
                المعالجة...
              </>
            ) : (
              "ابدأ التشكيل"
            )}
          </Button>

          {/* vowelizedText section  */}
          {vowelizedText && (
            <div className="p-4 border-2 border-[#1C9AAF] rounded-md">
              <h2
                className="text-xl font-semibold mb-2 text-[#20b1c9]"
                dir="rtl"
              >
                النص المُشَكَّل:
              </h2>
              <p className="text-lg" dir="rtl">
                {vowelizedText}
              </p>
            </div>
          )}

          {/* download and reset buttons  */}
          <div className="flex space-x-4">
            <Button
              onClick={handleReset}
              className="flex-1 bg-white text-[#20b1c9] border-2 border-[#20b1c9] hover:bg-[#20b1c9] hover:text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> إعادة تعيين
            </Button>
            <Button
              onClick={handleExportResults}
              disabled={!vowelizedText}
              className="flex-1 bg-[#1C9AAF] hover:bg-[#20b1c9] text-white"
            >
              <Download className="mr-2 h-4 w-4" /> تصدير النتائج
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
