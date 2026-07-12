import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


type Props = {
  fileUrl: string;
  onClose: () => void;
};

function PDFViewer({ fileUrl, onClose }: Props) {
  const [numPages, setNumPages] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-5xl w-full h-[90vh] overflow-auto">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            PDF Preview
          </h2>

          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>

     <Document
  file={fileUrl}
  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
  onLoadError={(error) => {
    console.error("PDF Error:", error);
    alert(error.message);
  }}
  loading={<p>Loading PDF...</p>}
>
  {Array.from({ length: numPages }, (_, index) => (
    <Page
      key={index}
      pageNumber={index + 1}
      width={800}
    />
  ))}
</Document>

      </div>
    </div>
  );
}

export default PDFViewer;