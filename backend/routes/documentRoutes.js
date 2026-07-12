import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  uploadDocument,
  getDocuments,
  deleteDocument,
  signDocument,
} from "../controllers/documentController.js";

const router = express.Router();

router.post(
  "/upload",
  upload.single("document"),
  uploadDocument
);
router.get("/", getDocuments);
router.delete("/:id", deleteDocument);
router.post("/:id/sign", signDocument);
export default router;