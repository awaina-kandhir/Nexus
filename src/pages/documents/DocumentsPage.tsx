import PDFViewer from "../../components/PDFViewer";
import SignatureModal from "../../components/SignatureModal";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {
  uploadDocument,
  getDocuments,
  deleteDocument,
  signDocument,
} from "../../services/documentService";

import {
  FileText,
  Upload,
  Download,
  Trash2,
  Share2,
} from "lucide-react";

import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";


const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSignature, setShowSignature] = useState(false);
const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const handleUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  try {
    await uploadDocument(
      file,
      "6a4c3b006fd8b0bc950ccd11" // your current user id
    );

    alert("Uploaded successfully!");

    loadDocuments();
  } catch (err) {
    console.log(err);
    alert("Upload failed");
  }
};

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
  if (!window.confirm("Delete this document?")) return;

  try {
    await deleteDocument(id);

    loadDocuments();

    alert("Document deleted successfully!");

  } catch (err) {
    console.log(err);
    alert("Delete failed");
  }
};

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Documents
          </h1>

          <p className="text-gray-600">
            Manage your startup's important files
          </p>
        </div>

        <Button
  leftIcon={<Upload size={18} />}
  onClick={() => fileInputRef.current?.click()}
>
  Upload Document
</Button>

<input
  ref={fileInputRef}
  type="file"
  accept=".pdf,.doc,.docx"
  hidden
  onChange={handleUpload}
/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Storage Card */}

        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-medium">
              Storage
            </h2>
          </CardHeader>

          <CardBody>

            <div className="space-y-2">

              <div className="flex justify-between text-sm">
                <span>Used</span>
                <span>12.5 GB</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "65%" }}
                />
              </div>

              <div className="flex justify-between text-sm">
                <span>Available</span>
                <span>7.5 GB</span>
              </div>

            </div>

          </CardBody>
        </Card>

        {/* Documents */}

        <div className="lg:col-span-3">

          <Card>

            <CardHeader className="flex justify-between items-center">

              <h2 className="text-lg font-medium">
                Uploaded Documents
              </h2>

            </CardHeader>

            <CardBody>

              {documents.length === 0 ? (

                <div className="text-center text-gray-500 py-10">
                  No documents uploaded.
                </div>

              ) : (

                <div className="space-y-3">

                  {documents.map((doc) => (

                    <div
                      key={doc._id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50"
                    >

                      {/* Left */}

                      <div className="flex items-center">

                        <div className="p-2 bg-blue-100 rounded-lg mr-4">
                          <FileText
                            className="text-blue-600"
                            size={24}
                          />
                        </div>

                        <div>

                          <h3 className="font-semibold">

                            {doc.fileName}

                          </h3>

                          <div className="flex gap-3 text-sm text-gray-500 mt-1">

                            <span>
                              Version {doc.version}
                            </span>

                          <Badge
  variant={
    doc.status === "Signed"
      ? "success"
      : "secondary"
  }
>
  {doc.status}
</Badge>

                          </div>

                          <div className="mt-2 flex gap-2">

  <Badge variant="secondary">
    Uploaded: {doc.uploadedBy?.name || "Unknown"}
  </Badge>

  {doc.signedBy && (
    <Badge variant="success">
      Signed By: {doc.signedBy.name}
    </Badge>
  )}
{doc.signedAt && (
  <p className="text-xs text-gray-500 mt-1">
    Signed on{" "}
    {new Date(doc.signedAt).toLocaleString()}
  </p>
)}
{doc.signatureImage && (

  <div className="mt-2">

    <p className="text-xs text-gray-500">
      Signature
    </p>

    <img
      src={doc.signatureImage}
      alt="Signature"
      className="h-16 border rounded mt-1"
    />

  </div>

)}
</div>

                        </div>

                      </div>

                      {/* Right */}

                   <div className="flex gap-2">

  {/* Preview */}
  <Button
    variant="ghost"
    size="sm"
    onClick={() =>
      setSelectedPdf(
        `http://localhost:5000/${doc.filePath.replace(/\\/g, "/")}`
      )
    }
  >
    <Download size={18} />
  </Button>

  {/* Share */}
  <Button
    variant="ghost"
    size="sm"
    onClick={() => {
      navigator.clipboard.writeText(
        `http://localhost:5000/${doc.filePath.replace(/\\/g, "/")}`
      );
      alert("Document link copied!");
    }}
  >
    <Share2 size={18} />
  </Button>

  {/* Sign */}
  <Button
  variant="ghost"
  size="sm"
  disabled={doc.status === "Signed"}
  onClick={() => {
    setSelectedDocument(doc);
    setShowSignature(true);
  }}
>
  {doc.status === "Signed"
    ? "Signed ✓"
    : "Sign"}
</Button>

  {/* Delete */}
  <Button
    variant="ghost"
    size="sm"
    className="text-red-600"
    onClick={() => handleDelete(doc._id)}
  >
    <Trash2 size={18} />
  </Button>

</div>

                    </div>

                  ))}

                </div>

              )}

            </CardBody>

          </Card>

        </div>

      </div>
{selectedPdf && (
  <PDFViewer
    fileUrl={selectedPdf}
    onClose={() => setSelectedPdf(null)}
  />
)}
{showSignature && (
  <SignatureModal
  onClose={() => setShowSignature(false)}
  onSave={async (signature) => {
    console.log("Step 1");

    try {
      console.log("Step 2");

      const result = await signDocument(
        selectedDocument._id,
        signature,
        "6a4c3b006fd8b0bc950ccd11"
      );

      console.log("Step 3", result);

      alert("Document signed successfully!");

      console.log("Step 4");

      setShowSignature(false);

      console.log("Step 5");

      await loadDocuments();

      console.log("Step 6");

    } catch (error) {
      console.log("ERROR", error);
      alert("Signing failed");
    }
  }}
/>
)}
    </div>
  );
};

export default DocumentsPage;