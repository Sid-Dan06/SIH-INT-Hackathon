import { useState, useEffect } from "react";
import axios from "axios";

export default function UserSettings() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    language: "English",
    theme: "Light",
    mapView: "Satellite",
  });

  // ✅ Fetch user details when page loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData((prev) => ({
          ...prev,
          name: res.data.name || "",
          email: res.data.email || "",
          organization: res.data.organization || "",
        }));
      } catch (err) {
        console.error("❌ Failed to fetch user profile:", err);
      }
    };
    fetchUserData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Save updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/api/user/profile",
        {
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Settings updated successfully!");
      setFormData((prev) => ({
        ...prev,
        name: res.data.name,
        email: res.data.email,
        organization: res.data.organization,
      }));
    } catch (err) {
      console.error("❌ Failed to update profile:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Organization</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded"
            />
          </div>
        </div>

        {/* Security */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">Security</h2>
          <button
            type="button"
            className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
          >
            Change Password
          </button>
        </div>

        {/* Notifications & Privacy */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">Notifications & Privacy</h2>
          <div className="flex justify-between items-center mb-4">
            <span>Notifications</span>
            <button
              type="button"
              className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
            >
              Manage Notifications
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span>Privacy</span>
            <button
              type="button"
              className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
            >
              Manage Privacy
            </button>
          </div>
        </div>

        {/* Application Settings */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">Application Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded"
              >
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Theme</label>
              <div className="flex space-x-4 mt-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, theme: "Light" })}
                  className={`px-4 py-2 rounded ${
                    formData.theme === "Light"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, theme: "Dark" })}
                  className={`px-4 py-2 rounded ${
                    formData.theme === "Dark"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Default Map View</label>
            <select
              name="mapView"
              value={formData.mapView}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded"
            >
              <option>Satellite</option>
              <option>Street</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
