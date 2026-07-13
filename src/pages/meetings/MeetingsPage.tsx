import React, { useEffect, useState } from "react";
import {
  getMeetings,
  createMeeting,
  acceptMeeting,
  rejectMeeting,
} from "../../services/meetingService";

import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

const MeetingsPage: React.FC = () => {
  const [meetings, setMeetings] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meetingDate, setMeetingDate] = useState("");

  // Temporary IDs (replace with logged-in users later)
  const investor = "6a4c3b006fd8b0bc950ccd11";
  const entrepreneur = "6a4c3b006fd8b0bc950ccd11";

  const loadMeetings = async () => {
    try {
      const data = await getMeetings();
      setMeetings(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadMeetings();
  }, []);

  const handleCreate = async () => {
    if (!title || !description || !meetingDate) {
      return alert("Please fill all fields");
    }

    await createMeeting({
      investor,
      entrepreneur,
      title,
      description,
      meetingDate,
    });

    alert("Meeting Created Successfully");

    setTitle("");
    setDescription("");
    setMeetingDate("");

    loadMeetings();
  };

  const handleAccept = async (id: string) => {
    await acceptMeeting(id);
    loadMeetings();
  };

  const handleReject = async (id: string) => {
    await rejectMeeting(id);
    loadMeetings();
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Meetings
      </h1>

      <Card>

        <CardHeader>
          <h2 className="text-xl font-semibold">
            Schedule Meeting
          </h2>
        </CardHeader>

        <CardBody>

          <input
            className="border rounded w-full p-2 mb-3"
            placeholder="Meeting Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border rounded w-full p-2 mb-3"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="datetime-local"
            className="border rounded w-full p-2 mb-3"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
          />

          <Button
            fullWidth
            onClick={handleCreate}
          >
            Create Meeting
          </Button>

        </CardBody>

      </Card>

      <Card>

        <CardHeader>
          <h2 className="text-xl font-semibold">
            Meeting List
          </h2>
        </CardHeader>

        <CardBody>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Action</th>

              </tr>

            </thead>

            <tbody>

              {meetings.map((meeting) => (

                <tr
                  key={meeting._id}
                  className="border-b"
                >

                  <td className="p-2">
                    {meeting.title}
                  </td>

                  <td className="p-2">
                    {meeting.description}
                  </td>

                  <td className="p-2">
                    {new Date(meeting.meetingDate).toLocaleString()}
                  </td>

                  <td className="p-2">
                    {meeting.status}
                  </td>

                  <td className="p-2 flex gap-2">

                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => handleAccept(meeting._id)}
                    >
                      Accept
                    </Button>

                    <Button
                      size="sm"
                      variant="error"
                      onClick={() => handleReject(meeting._id)}
                    >
                      Reject
                    </Button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </CardBody>

      </Card>

    </div>
  );
};

export default MeetingsPage;