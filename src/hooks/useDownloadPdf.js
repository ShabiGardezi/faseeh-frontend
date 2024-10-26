import { useCallback } from 'react';
import jsPDF from 'jspdf';

const useDownloadPdf = () => {
  const downloadPdf = useCallback((text, fileName = 'document.pdf') => {
    const pdf = new jsPDF();

    // Set font to support Arabic (you may need a TTF font for better Arabic support)
    pdf.setFont('helvetica'); // Default font that supports Arabic characters
    pdf.setFontSize(16);

    // Add the Arabic text, making sure to align it for Right-to-Left (RTL)
    pdf.text(text, 10, 10, { align: 'right' });

    // Save the PDF file with the given name
    pdf.save(fileName);
  }, []);

  return { downloadPdf };
};

export default useDownloadPdf;
