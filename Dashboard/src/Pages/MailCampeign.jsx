import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Send, Users, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const MailCampaign = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminToken");

  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/mail/all-users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(res.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSelectUser = (email) => {
    if (selectedUsers.includes(email)) {
      setSelectedUsers(selectedUsers.filter((e) => e !== email));
    } else {
      setSelectedUsers([...selectedUsers, email]);
    }
  };

  const handleSendMail = async () => {
    if (!subject || !message) {
      toast.error("Please fill subject and message");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/mail/send`,
        { emails: selectedUsers.length > 0 ? selectedUsers : "all", subject, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Mail sent successfully!");
      setSubject("");
      setMessage("");
      setSelectedUsers([]);
    } catch (error) {
      console.error(error);
      toast.error("Error sending mail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-gradient-to-br from-white to-gray-100 py-6 md:p-6 font-poppins text-gray-800">
      
      <div className="max-w-5xl mx-auto bg-white shadow-lg border border-gray-200 rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <Mail className="text-blue-500 w-10 h-10" />
          <h1 className="text-3xl font-semibold text-gray-800">Mail Campaign Dashboard</h1>
        </div>

        {/* Mail Form */}
        <div className="grid gap-4 mb-6">
          <input
            type="text"
            placeholder="Subject"
            className="border border-gray-300 rounded-lg p-3 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            placeholder="Write your message here..."
            rows={5}
            className="border border-gray-300 rounded-lg p-3 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* User List */}
        <div className="mb-4 flex items-center gap-2">
          <Users className="text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">Select Users</h2>
        </div>

        <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg mb-6 bg-white">
          {users.length === 0 ? (
            <p className="text-center text-gray-400 py-4">No users found...</p>
          ) : (
            users.map((user) => (
              <div
                key={user.email}
                className="flex justify-between items-center px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors rounded-md"
              >
                <p className="text-gray-800 font-medium">{user.name}</p>
                <div className="flex items-center gap-3">
                  <p className="text-gray-500 text-sm">{user.email}</p>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.email)}
                    onChange={() => handleSelectUser(user.email)}
                    className="w-4 h-4 text-blue-500 rounded"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Send Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSendMail}
            disabled={loading}
            className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                {selectedUsers.length > 0 ? "Send to Selected" : "Send to All"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailCampaign;
