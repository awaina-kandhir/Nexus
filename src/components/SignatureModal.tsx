import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "./ui/Button";

type Props = {
  onClose: () => void;
  onSave: (signature: string) => void;
};

const SignatureModal: React.FC<Props> = ({ onClose, onSave }) => {
  const sigCanvas = useRef<SignatureCanvas>(null);

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

 const saveSignature = () => {
  alert("1. Save button clicked");

  if (!sigCanvas.current) {
    alert("2. Canvas is NULL");
    return;
  }

  alert("3. Canvas exists");

  const empty = sigCanvas.current.isEmpty();

  alert("4. isEmpty = " + empty);

  if (empty) {
    alert("Please draw your signature first.");
    return;
  }

 try {
  const canvas = sigCanvas.current.getCanvas();

  alert("Canvas OK");

  const signature = canvas.toDataURL("image/png");

  alert("Signature OK");

  onSave(signature);

} catch (err) {
  console.error(err);
  alert(JSON.stringify(err));
}
}
  
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999]">
      <div className="bg-white rounded-xl p-6 w-[720px] shadow-xl">

        <h2 className="text-2xl font-bold mb-4">
          E-Signature
        </h2>

        <div className="border rounded-lg overflow-hidden bg-white">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
              width: 650,
              height: 250,
              className: "bg-white",
            }}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">

          <Button
            variant="outline"
            onClick={clearSignature}
          >
            Clear
          </Button>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={saveSignature}
          >
            Save Signature
          </Button>

        </div>

      </div>
    </div>
  );
};

export default SignatureModal;