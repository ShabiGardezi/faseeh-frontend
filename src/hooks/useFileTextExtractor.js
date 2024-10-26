import { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const useFileTextExtractor = () => {
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
  }, []);

  const extractTextFromFile = async (file) => {
    setLoading(true);
    setExtractedText("");
    setError(null);

    try {
      const fileType = file.type;

      if (fileType === "application/pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        let fullText = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();

          const pageText = textContent.items
            .map((item) => item.str) // Extract text from each item
            .join(" ");

          fullText += pageText + "\n";
        }
        setExtractedText(fullText);
      } else if (
        fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const mammoth = await import("mammoth");
        const arrayBuffer = await file.arrayBuffer();
        const { value } = await mammoth.extractRawText({ arrayBuffer });
        setExtractedText(value);
      } else {
        setError("Unsupported file type. Please upload a PDF or DOCX file.");
      }
    } catch (err) {
      console.error(err);
      setError("Error extracting text from the file.");
    } finally {
      setLoading(false);
    }
  };

  return { extractTextFromFile, extractedText, loading, error };
};

export default useFileTextExtractor;
