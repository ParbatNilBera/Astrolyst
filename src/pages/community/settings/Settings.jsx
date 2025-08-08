import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATH } from "../../../utils/apiPath";

const Settings = ({ communityId }) => {
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Optional: Fetch existing settings if you want to prefill values
  useEffect(() => {
    const fetchCommunityDetails = async () => {
      try {
        const res = await axiosInstance.get(
          API_PATH.COMUNITY.GET_COMMUNITY_BY_ID(communityId)
        );
        const community = res.data.data;
        setDescription(community.description || "");
        setVisibility(community.visibility || "public");
      } catch (error) {
        console.error("Failed to load community details", error);
      }
    };

    if (communityId) {
      fetchCommunityDetails();
    }
  }, [communityId]);

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axiosInstance.put(
        API_PATH.COMUNITY.COMUNITY_SETTINGS(communityId),
        { description, visibility }
      );
      setMessage("Community settings updated successfully!");
    } catch (error) {
      console.error("Error updating community", error);
      setMessage("Failed to update community settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-yellow-600">
        Community Settings
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:border-yellow-500"
          rows={4}
          placeholder="Enter community description..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Visibility
        </label>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:border-yellow-500"
        >
          <option value="public">Public</option>
          <option value="restricted">Restricted</option>
          <option value="private">Private</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md transition"
      >
        {loading ? "Saving..." : "Save"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-center text-green-600 font-medium">
          {message}
        </p>
      )}
    </div>
  );
};

export default Settings;
