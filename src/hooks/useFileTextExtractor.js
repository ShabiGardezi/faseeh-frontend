import { useState, useEffect } from "react";

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
        const pdfjs = await import("pdfjs-dist/build/pdf");
        const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() })
          .promise;
        const numPages = pdf.numPages;
        let textContent = "";

        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const text = await page.getTextContent();
          const strings = text.items.map((item) => item.str);
          textContent += strings.join(" ") + "\n";
        }
        setExtractedText(textContent);
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

// import { useState, useEffect } from "react";
// import * as pdfjsLib from "pdfjs-dist";
// import { toast } from '@/hooks/use-toast'

// pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// const useFileTextExtractor = () => {
//   const [extractedText, setExtractedText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//   }, []);

//   const extractTextFromFile = async (file) => {
//     setLoading(true);
//     setExtractedText("");
//     setError(null);

//     try {
//       const fileType = file.type;

//       if (fileType === "application/pdf") {
//         const arrayBuffer = await file.arrayBuffer();
//         const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
//         let fullText = "";

//         for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//           const page = await pdf.getPage(pageNum);
//           const textContent = await page.getTextContent();

//           const pageText = textContent.items
//             .map((item) => item.str) // Extract text from each item
//             .join(" ");

//           fullText += pageText + "\n";
//         }

//         // Check extracted text length
//         if (fullText.length > 400) {
//           toast({
//             title: "تجاوز حد الأحرف",
//             description: "يجب أن يكون النص المستخرج أقل من 400 حرف.",
//             variant: "error",
//           });
//           setExtractedText("");
//           setLoading(false);
//           return;
//         }

//         setExtractedText(fullText);
//       } else if (
//         fileType ===
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//       ) {
//         const mammoth = await import("mammoth");
//         const arrayBuffer = await file.arrayBuffer();
//         const { value } = await mammoth.extractRawText({ arrayBuffer });

//         // Check extracted text length
//         if (value.length > 400) {
//           toast({
//             title: "تجاوز حد الأحرف",
//             description: "يجب أن يكون النص المستخرج أقل من 400 حرف.",
//             variant: "error",
//           });
//           setExtractedText("");
//           setLoading(false);
//           return;
//         }

//         setExtractedText(value);
//       } else {
//         setError("Unsupported file type. Please upload a PDF or DOCX file.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Error extracting text from the file.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { extractTextFromFile, extractedText, loading, error };
// };

// export default useFileTextExtractor;
