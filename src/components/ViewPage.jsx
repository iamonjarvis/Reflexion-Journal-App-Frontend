import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

const ViewPage = () => {
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract 'date' from the query string
  const date = new URLSearchParams(location.search).get("date");

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await axiosInstance.get(`/journal?date=${date}`);
        setJournal(response.data);
      } catch (error) {
        console.error("Failed to fetch journal entry:", error);
      } finally {
        setLoading(false);
      }
    };

    if (date) {
      fetchJournal();
    }
  }, [date]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#9118dc] to-[#6911a7] text-[#fefefe]">
        <div className="animate-spin rounded-full border-4 border-t-4 border-[#fefefe] w-16 h-16 mb-4"></div>
        <p className="text-lg font-semibold">Loading your journal...</p>
      </div>
    );
  }

  if (!journal) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-[#9118dc] to-[#6911a7]">
        <div className="text-xl text-[#fefefe] font-semibold">
          No journal entry found for this date.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9118dc] to-[#6911a7] p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#9118dc] text-[#fefefe] px-4 py-2 rounded-lg shadow-md hover:bg-[#6911a7] transition duration-300"
          >
            Back
          </button>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-[#111111]">
            Journal for {date}
          </h2>
        </div>

        <div className="bg-white border border-[#9118dc] rounded-lg shadow-lg p-4 text-[#111111]">
          <p>{journal.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
