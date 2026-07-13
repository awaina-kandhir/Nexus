import axios from "axios";

const API = "https://nexus-production-121c.up.railway.app/api/meetings";

// Get all meetings
export const getMeetings = async () => {
  const res = await axios.get(API);
  return res.data;
};

// Create meeting
export const createMeeting = async (meeting: {
  investor: string;
  entrepreneur: string;
  title: string;
  description: string;
  meetingDate: string;
}) => {
  const res = await axios.post(API, meeting);
  return res.data;
};

// Accept meeting
export const acceptMeeting = async (id: string) => {
  const res = await axios.put(`${API}/${id}/accept`);
  return res.data;
};

// Reject meeting
export const rejectMeeting = async (id: string) => {
  const res = await axios.put(`${API}/${id}/reject`);
  return res.data;
};