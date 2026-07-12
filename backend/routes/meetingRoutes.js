import express from "express";

import {
  createMeeting,
  getMeetings,
  acceptMeeting,
  rejectMeeting,
} from "../controllers/meetingController.js";

const router = express.Router();

router.post("/", createMeeting);

router.get("/", getMeetings);

router.put("/:id/accept", acceptMeeting);

router.put("/:id/reject", rejectMeeting);

export default router;