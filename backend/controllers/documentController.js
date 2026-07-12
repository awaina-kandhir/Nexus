import Document from "../models/Documents.js";
import fs from "fs";
import path from "path";
export const uploadDocument = async (req, res) => {
  try {
    const newDocument = new Document({
      fileName: req.file.originalname,
      filePath: req.file.path,
      uploadedBy: req.body.userId, // optional for now
      version: 1,
      status: "Uploaded",
    });

    await newDocument.save();

    res.status(201).json({
      message: "Document uploaded successfully",
      document: newDocument,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getDocuments = async (req, res) => {
  try {
   const documents = await Document.find()
.populate("uploadedBy", "name email role")
.populate("signedBy", "name");

    res.status(200).json(documents);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    // Delete file from uploads folder
    if (fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }

    await Document.findByIdAndDelete(req.params.id);

    res.json({
      message: "Document deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const signDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    document.signatureImage = req.body.signatureImage;
    document.signedBy = req.body.userId;
    document.signedAt = new Date();
    document.status = "Signed";

    await document.save();

    res.status(200).json({
      message: "Document signed successfully",
      document,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};