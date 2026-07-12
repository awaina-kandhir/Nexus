import Meeting from "../models/Meeting.js";

export const createMeeting = async (req, res) => {
  try {
    const {
      investor,
      entrepreneur,
      title,
      description,
      meetingDate,
    } = req.body;

    const conflict = await Meeting.findOne({
      entrepreneur,
      meetingDate,
      status: "Accepted",
    });

    if (conflict) {
      return res.status(400).json({
        message: "Time slot already booked",
      });
    }

    const meeting = await Meeting.create({
      investor,
      entrepreneur,
      title,
      description,
      meetingDate,
    });

    res.status(201).json(meeting);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find()
      .populate("investor", "name email")
      .populate("entrepreneur", "name email");

    res.json(meetings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const acceptMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({
        message: "Meeting not found",
      });
    }

    meeting.status = "Accepted";

    await meeting.save();

    res.json({
      message: "Meeting accepted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const rejectMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({
        message: "Meeting not found",
      });
    }

    meeting.status = "Rejected";

    await meeting.save();

    res.json({
      message: "Meeting rejected",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};