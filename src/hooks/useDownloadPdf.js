import { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import * as fontkit from "fontkit"; // Corrected import for fontkit
import { toast } from "@/hooks/use-toast";

// Use the path to the font directly
// const arabicFont = "/fonts/NotoNaskhArabic-VariableFont_wght.ttf"; // Adjust path if needed
const arabicFont = "/fonts/Amiri-Regular.ttf"; // Adjust path if needed

const useDownloadPdf = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const downloadPdf = async (text, filename = "extracted_text.pdf") => {
    setLoading(true);
    setError(null);

    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      pdfDoc.registerFontkit(fontkit); // Register the fontkit instance
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();

      // Load the custom font
      const fontBytes = await fetch(arabicFont).then((res) => res.arrayBuffer());
      const customFont = await pdfDoc.embedFont(fontBytes);

      // Set font size and color
      const fontSize = 12;
      const color = rgb(0, 0, 0);

      // Draw the text on the PDF with the custom font
      page.drawText(text, {
        x: 50,
        y: height - 50,
        size: fontSize,
        font: customFont,
        color: color,
      });

      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save();

      // Create a Blob from the PDF bytes
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      // Create a link element to download the PDF
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;

      // Append to the body and trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "نجاح",
        description: "تم تنزيل الملف بنجاح.",
        variant: "success",
      });
    } catch (err) {
      console.error(err);
      setError("Error downloading the PDF.");
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
