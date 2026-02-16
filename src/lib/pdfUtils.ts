import * as pdfjsLib from 'pdfjs-dist';

// Use unpkg to ensure we get the worker matching the installed version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export const extractTextFromPdf = async (file: File): Promise<string> => {
    try {
        console.log(`Using PDF Worker: ${pdfjsLib.GlobalWorkerOptions.workerSrc}`);
        const arrayBuffer = await file.arrayBuffer();

        // Use .promise to get the document proxy
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map((item: any) => item.str)
                .join(' ');
            fullText += pageText + '\n\n';
        }

        return fullText.trim();
    } catch (error: any) {
        console.error("Error extracting text from PDF:", error);
        // Propagate specific error message
        throw new Error(`PDF Error: ${error.message || "Unknown parsing error"}`);
    }
};
