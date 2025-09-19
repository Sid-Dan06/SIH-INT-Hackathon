import { useState } from "react";

export default function DataManagement() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map((file) => ({
      file,
      progress: 0,
      status: "ready",
    }));
    setFiles(selectedFiles); // overwrite instead of stacking
  };

  // Handle Upload Button
  const handleUpload = () => {
    if (files.length === 0) return;

    setUploading(true);

    setFiles((prev) =>
      prev.map((item) =>
        item.status === "ready" ? { ...item, status: "uploading" } : item
      )
    );

    files.forEach((f) => {
      if (f.status !== "ready") return;

      const interval = setInterval(() => {
        setFiles((prev) =>
          prev.map((item) =>
            item.file.name === f.file.name
              ? {
                  ...item,
                  progress: Math.min(item.progress + 10, 100),
                  status:
                    item.progress + 10 >= 100 ? "completed" : "uploading",
                }
              : item
          )
        );
      }, 400);

      setTimeout(() => clearInterval(interval), 5000);
    });

    // Re-enable file input after all uploads done
    setTimeout(() => {
      setUploading(false);
    }, 5500);
  };

  return (
    <section className="p-8 bg-gray-50 min-h-screen font-sans">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2 font-heading">
        Data Management
      </h1>
      <p className="text-gray-500 mb-8 font-sans">
        Upload, manage, and verify your FRA data and shapefiles.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-1 space-y-8">
          {/* Upload New Data */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-gray-900 text-xl font-bold mb-6 font-heading">
              Upload New Data
            </h2>
            <form
              className="space-y-4 font-sans"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Dataset Name */}
              <input
                className="form-input w-full rounded-md border border-gray-300 h-12 px-4 text-sm font-sans"
                placeholder="Dataset Name"
              />

              {/* Data Type */}
              <select className="form-select w-full rounded-md border border-gray-300 h-12 px-4 text-sm font-sans">
                <option>Select data type</option>
                <option value="legacy-fra">Legacy FRA Data</option>
                <option value="shapefile">Shapefile</option>
                <option value="geojson">GeoJSON</option>
                <option value="csv">CSV Data</option>
                <option value="pdf">PDF Reports</option>
                <option value="other">Other</option>
              </select>

              {/* File Format */}
              <select className="form-select w-full rounded-md border border-gray-300 h-12 px-4 text-sm font-sans">
                <option>Select file format</option>
                <option value="shp">Shapefile (.shp / .zip)</option>
                <option value="geojson">GeoJSON (.geojson)</option>
                <option value="csv">CSV (.csv)</option>
                <option value="pdf">PDF (.pdf)</option>
              </select>

              {/* File Upload */}
              <div className="pt-2">
                <label
                  className={`cursor-pointer ${
                    files.length > 0 ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 hover:border-green-500 transition-colors font-sans">
                    <span className="material-symbols-outlined text-4xl text-gray-400">
                      upload_file
                    </span>
                    <p className="text-gray-700 text-sm font-semibold">
                      {files.length > 0
                        ? "File already selected"
                        : "Drag and drop files here or "}
                      {files.length === 0 && (
                        <span className="text-green-600 font-bold">browse</span>
                      )}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="sr-only"
                    multiple
                    disabled={files.length > 0}
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {/* Upload Button */}
              <button
                type="button"
                onClick={handleUpload}
                disabled={files.length === 0 || uploading}
                className={`w-full rounded-md h-12 px-6 text-sm font-bold font-heading ${
                  files.length === 0 || uploading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {uploading ? "Uploading..." : "Start Upload"}
              </button>
            </form>
          </div>

          {/* Upload Progress */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 font-sans">
            <h3 className="text-gray-900 text-lg font-bold mb-4 font-heading">
              Upload Progress
            </h3>
            {files.length === 0 ? (
              <p className="text-gray-500 text-sm">No uploads yet</p>
            ) : (
              <ul className="space-y-4">
                {files.map((item, index) => (
                  <li key={index} className="space-y-1">
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>{item.file.name}</span>
                      <span>
                        {item.status === "completed"
                          ? "Done"
                          : item.status === "ready"
                          ? "Ready"
                          : `${item.progress}%`}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          item.status === "completed"
                            ? "bg-green-600"
                            : "bg-blue-500"
                        }`}
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2 space-y-8">
          {/* Data Preview */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 font-sans">
            <h2 className="text-gray-900 text-xl font-bold mb-4 font-heading">
              Data Preview & Validation
            </h2>
            <div className="flex items-center justify-center bg-gray-100 rounded-md min-h-[200px] border border-gray-200">
              {files.length === 0 ? (
                <p className="text-gray-500">
                  Upload a file to begin validation & preview.
                </p>
              ) : (
                <p className="text-gray-700">Preview coming soon...</p>
              )}
            </div>
          </div>

          {/* Manage Datasets */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 font-sans">
            <div className="p-6">
              <h2 className="text-gray-900 text-xl font-bold font-heading">
                Manage Existing Datasets
              </h2>
            </div>
            <div className="p-6 text-gray-500 text-sm">
              No datasets available
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
