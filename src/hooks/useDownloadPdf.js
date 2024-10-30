

import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axios";

const useDownloadPdf = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const downloadPdf = async (text, filename = "extracted_text.pdf") => {
    setLoading(true);
    setError(null);

    try {
      // Make the API request with axiosInstance, setting responseType to 'blob' to handle binary data
      const response = await axiosInstance.post(
        "/generate-pdf",
        { content: text },
        { responseType: "blob" }
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a link element to download the PDF
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;

      // Append to the body and trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success toast notification
      toast({
        title: "نجاح",
        description: "تم تنزيل الملف بنجاح.",
        variant: "success",
      });
    } catch (err) {
      console.error(err);
      setError("Error downloading the PDF.");
      // Show error toast notification
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تنزيل الملف.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { downloadPdf, loading, error };
};

export default useDownloadPdf;
