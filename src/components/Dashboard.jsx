import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  eachDayOfInterval,
} from "date-fns";
import axiosInstance from "../axios"; // Import the axios instance

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [entries, setEntries] = useState({});

  useEffect(() => {
    // Fetch all entries from the backend
    const fetchEntries = async () => {
      try {
        const response = await axiosInstance.get("/journal"); // Using axiosInstance
        const data = response.data;
        const entriesMap = data.reduce((acc, entry) => {
          acc[entry.date] = entry.content;
          return acc;
        }, {});
        setEntries(entriesMap);
      } catch (error) {
        console.error("Failed to fetch entries:", error);
      }
    };

    fetchEntries();
  }, []);

  const handleAdd = (date) => navigate(`/entry?date=${date}`);
  const handleEdit = (date) => navigate(`/entry?date=${date}`);
  const handleView = (date) => navigate(`/view?date=${date}`);

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const leadingEmptyDays = new Array(days[0].getDay()).fill(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9118dc] to-[#6911a7] p-6">
      <div className="max-w-7xl mx-auto bg-[#fefefe] shadow-xl rounded-lg p-6">
        <header className="flex justify-between items-center mb-6">
          <button
            onClick={handlePrevMonth}
            className="bg-[#9118dc] text-white px-4 py-2 rounded-md hover:bg-[#6911a7] transition"
          >
            &larr; Previous
          </button>
          <h1 className="text-3xl font-bold text-[#111111]">
            {format(currentMonth, "MMMM yyyy")}
          </h1>
          <button
            onClick={handleNextMonth}
            className="bg-[#9118dc] text-white px-4 py-2 rounded-md hover:bg-[#6911a7] transition"
          >
            Next &rarr;
          </button>
        </header>

        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center font-semibold uppercase text-[#111111]"
            >
              {day}
            </div>
          ))}

          {leadingEmptyDays.map((_, index) => (
            <div key={index} className="h-24"></div>
          ))}

          {days.map((day) => {
            const date = format(day, "yyyy-MM-dd");
            return (
              <div
                key={date}
                className={`flex flex-col items-center justify-between h-24 w-full p-2 rounded-lg border shadow-sm transition ${
                  entries[date] ? "border-[#6911a7]" : "border-[#9118dc]"
                }`}
              >
                <p className="text-sm font-medium text-[#111111]">
                  {format(day, "d")}
                </p>
                <div className="flex gap-1">
                  {!entries[date] && (
                    <button
                      onClick={() => handleAdd(date)}
                      className="bg-[#9118dc] text-white px-2 py-1 rounded-full text-xs hover:bg-[#6911a7]"
                      title="Add Entry"
                    >
                      +
                    </button>
                  )}
                  {entries[date] && (
                    <>
                      <button
                        onClick={() => handleEdit(date)}
                        className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs hover:bg-yellow-200"
                        title="Edit Entry"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleView(date)}
                        className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs hover:bg-green-200"
                        title="View Entry"
                      >
                        👁️
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
