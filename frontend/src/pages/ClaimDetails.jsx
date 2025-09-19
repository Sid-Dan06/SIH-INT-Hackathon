import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ClaimDetails() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleUpload = () => {
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        user: "You",
        text: newComment,
        date: new Date().toLocaleString(),
      },
    ]);
    setNewComment("");
  };

  return (
    <section className="p-8 bg-gray-100 min-h-screen font-sans">
      <div className="grid grid-cols-3 gap-8">
        {/* Left (Main Details + Documents + Comments) */}
        <div className="col-span-2 space-y-8">
          {/* Claim Header */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Claim ID: #<span className="text-gray-600">XXXX</span>
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Claim Type (e.g., IFR / CFR)
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Status
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Claimant Name</p>
                <p className="mt-1 text-base text-gray-900">---</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Community</p>
                <p className="mt-1 text-base text-gray-900">---</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Submission Date</p>
                <p className="mt-1 text-base text-gray-900">---</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Last Updated</p>
                <p className="mt-1 text-base text-gray-900">---</p>
              </div>
            </div>
          </div>

          {/* Associated Documents */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Associated Documents
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-500">
                    description
                  </span>
                  <div>
                    <p className="font-medium text-gray-800">
                      Scanned_Application.pdf
                    </p>
                    <p className="text-xs text-gray-500">2.3 MB</p>
                  </div>
                </div>
                {/* ✅ Download Link */}
                <a
                  href="/sample.pdf"
                  download="Scanned_Application.pdf"
                  className="text-sm font-medium text-green-600 hover:underline"
                >
                  Download
                </a>
              </li>
            </ul>

            {/* Upload button */}
            <button
              onClick={handleUpload}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border-2 border-dashed border-gray-300 py-3 text-sm font-medium text-gray-600 hover:border-green-500 hover:bg-green-50 hover:text-green-600"
            >
              <span className="material-symbols-outlined"> upload_file </span>
              Upload New Document
            </button>

            {/* Upload progress */}
            {uploading && (
              <div className="mt-4 w-full">
                <div className="flex justify-between mb-1 text-sm text-gray-600">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Comments / Notes
            </h3>

            {/* Existing comments */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-sm">No comments yet.</p>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="flex items-start gap-3">
                    <img
                      alt="User avatar"
                      className="mt-1 h-8 w-8 rounded-full"
                      src="https://via.placeholder.com/40"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {c.user}
                      </p>
                      <p className="mt-1 rounded-md bg-gray-100 p-2 text-sm text-gray-700">
                        {c.text}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">{c.date}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add comment box */}
            <div className="mt-4 flex items-start gap-3">
              <img
                alt="User avatar"
                className="mt-1 h-8 w-8 rounded-full"
                src="https://via.placeholder.com/40"
              />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Add a comment..."
                ></textarea>
                <button
                  onClick={handleAddComment}
                  className="mt-2 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (Location + Status History) */}
        <div className="col-span-1 space-y-8">
          {/* Geographic Location with Map */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Geographic Location
            </h3>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">District</p>
              <p className="mt-1 text-base text-gray-900">Koraput, Odisha</p>
            </div>
            <div className="h-48 w-full overflow-hidden rounded-md">
              <MapContainer
                center={[18.8135, 82.7118]}
                zoom={8}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[18.8135, 82.7118]}>
                  <Popup>Claim Area - Koraput, Odisha</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Status History */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Status History
            </h3>
            <ul className="space-y-4 border-l-2 border-gray-200 pl-4">
              <li>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500"></span>
                  <p className="text-sm font-medium text-gray-800">
                    Approved by DLC
                  </p>
                </div>
                <p className="ml-5 text-xs text-gray-500">Date</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
