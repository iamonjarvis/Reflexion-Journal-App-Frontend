import React, { useState, useCallback, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Editor, EditorState, ContentState } from "draft-js";
import "draft-js/dist/Draft.css";
import axiosInstance from "../axios";

const EntryPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const date = searchParams.get("date");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await axiosInstance.get(`/journal?date=${date}`);
        const data = response.data;
        if (data && data.content) {
          const contentState = ContentState.createFromText(data.content);
          setEditorState(EditorState.createWithContent(contentState));
        }
      } catch (err) {
        setError("");
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [date]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const content = editorState.getCurrentContent().getPlainText();
      if (!content.trim()) {
        setError("Journal content cannot be empty.");
        setSaving(false);
        return;
      }
      const response = await axiosInstance.post(`/journal`, { date, content });
      if (response.status === 200) {
        setSuccess("Your journal has been saved successfully.");
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Failed to save your journal. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleEditorChange = useCallback((state) => {
    setEditorState(state);
  }, []);

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
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-2 rounded-lg shadow-md transition duration-300 ${
              saving
                ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                : "bg-[#6911a7] text-[#fefefe] hover:bg-[#9118dc]"
            }`}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        {loading ? (
          <div className="text-center text-[#111111] font-medium">
            Loading your journal...
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 text-center text-red-600 font-medium">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 text-center text-green-600 font-medium">
                {success}
              </div>
            )}

            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-[#111111]">
                Journal for {date}
              </h2>
            </div>

            <div className="bg-white border border-[#9118dc] rounded-lg shadow-lg p-4 text-[#111111] w-full min-h-[300px] md:min-h-[400px]">
              <Editor
                editorState={editorState}
                onChange={handleEditorChange}
                placeholder={`Write your journal for ${date} here...`}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EntryPage;
