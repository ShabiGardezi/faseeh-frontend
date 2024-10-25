import { useState } from 'react';
import { getDocument } from 'pdfjs-dist/build/pdf';
import mammoth from 'mammoth';

const useFileTextExtractor = () => {
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const extractTextFromFile = async (file) => {
    setLoading(true);
    setExtractedText('');
    setError(null);

    try {
      const fileType = file.type;
      if (fileType === 'application/pdf') {
        // Extract text from PDF
        const pdf = await getDocument(file).promise;
        const numPages = pdf.numPages;
        let textContent = '';

        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const text = await page.getTextContent();
          const strings = text.items.map(item => item.str);
          textContent += strings.join(' ') + '\n';
        }

        setExtractedText(textContent);

      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Extract text from DOCX
        const arrayBuffer = await file.arrayBuffer();
        const { value } = await mammoth.extractRawText({ arrayBuffer });
        setExtractedText(value);

      } else {
        setError('Unsupported file type. Please upload a PDF or DOCX file.');
      }
    } catch (err) {
      setError('Error extracting text from the file.');
    } finally {
      setLoading(false);
    }
  };

  return { extractTextFromFile, extractedText, loading, error };
};

export default useFileTextExtractor;
