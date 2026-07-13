import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { getMeetings } from "../../services/meetingService";

import { Card, CardHeader, CardBody } from "../../components/ui/Card";

const CalendarPage: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [meetings, setMeetings] = useState<any[]>([]);

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    try {
      const data = await getMeetings();
      setMeetings(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Meeting Calendar
      </h1>

      <Card>

        <CardHeader>
          <h2 className="text-xl font-semibold">
            Calendar
          </h2>
        </CardHeader>

        <CardBody>

          <Calendar
            onChange={(value) => setDate(value as Date)}
            value={date}
          />

        </CardBody>

      </Card>

      <Card>

        <CardHeader>
          <h2 className="text-xl font-semibold">
            Meetings
          </h2>
        </CardHeader>

        <CardBody>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="p-2 text-left">
                  Title
                </th>

                <th className="p-2 text-left">
                  Description
                </th>

                <th className="p-2 text-left">
                  Date
                </th>

                <th className="p-2 text-left">
                  Status
                </th>

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
                    {new Date(
                      meeting.meetingDate
                    ).toLocaleString()}
                  </td>

                  <td className="p-2">
                    {meeting.status}
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

export default CalendarPage;