import { useState, useEffect } from "react";
import { API_PATH } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";

const AstrologerApplication = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(new Set());

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        API_PATH.ADMIN.GET_ASTROLOGER_APPLICATIONS
      );
      setApplications(data?.data || []); // ✅ Fix is here
    } catch (err) {
      setError("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (email, action) => {
    setProcessing((prev) => new Set(prev).add(email));
    try {
      const path =
        action === "approve"
          ? API_PATH.ADMIN.ACCEPT_ASTROLOGER
          : API_PATH.ADMIN.REJECT_ASTROLOGER;
      await axiosInstance.put(path, { email });
      setApplications((prev) => prev.filter((a) => a.email !== email));
    } catch {
      setError(`Failed to ${action} ${email}`);
    } finally {
      setProcessing((prev) => {
        const updated = new Set(prev);
        updated.delete(email);
        return updated;
      });
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filtered = applications.filter((a) =>
    a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="p-6 text-white min-h-screen"
      style={{ backgroundColor: "#0f0f1a" }}
    >
      <h2 className="text-2xl font-bold mb-4">Astrologer Applications</h2>
      <input
        type="text"
        placeholder="Search by email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-6 p-3 rounded bg-[#1c1c2b] border border-[#2e2e3e] text-white"
      />
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {loading ? (
        <p className="text-purple-400">Loading...</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((app) => (
            <li
              key={app.email}
              className="p-4 bg-[#1c1c2b] rounded border border-[#2e2e3e]"
            >
              <div className="font-medium">
                {app.name} - {app.email}
              </div>
              <div className="text-sm text-gray-400">
                {app.expertise} • {app.experience} yrs
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => updateStatus(app.email, "approve")}
                  disabled={processing.has(app.email)}
                  className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(app.email, "reject")}
                  disabled={processing.has(app.email)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AstrologerApplication;
