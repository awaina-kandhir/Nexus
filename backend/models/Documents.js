import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    version: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      default: "Pending",
    },

    // NEW FIELDS
    signatureImage: {
      type: String,
      default: "",
    },

    signedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    signedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Document", documentSchema);
