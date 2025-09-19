import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";

export default function ClientClaims() {
    const [filters, setFilters] = useState({
        status: "All",
        district: "",
        block: "",
        village: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleApply = () => {
        alert("Filters applied (later fetch data from API)");
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar Filters */}
            <aside className="w-80 bg-white border-r border-gray-200 p-6 flex flex-col gap-6">
                <h2 className="text-gray-800 text-xl font-bold">Filters</h2>
                <div className="flex flex-col gap-4">
                    {/* Claim Status */}
                    <label className="flex flex-col">
                        <p className="text-gray-700 text-sm font-medium">Claim Status</p>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleChange}
                            className="border rounded p-2"
                        >
                            <option>All</option>
                            <option>Approved</option>
                            <option>Pending</option>
                            <option>Rejected</option>
                        </select>
                    </label>

                    {/* District */}
                    <label className="flex flex-col">
                        <p className="text-gray-700 text-sm font-medium">District</p>
                        <select
                            name="district"
                            value={filters.district}
                            onChange={handleChange}
                            className="border rounded p-2"
                        >
                            <option value="">Select District</option>
                        </select>
                    </label>

                    {/* Block */}
                    <label className="flex flex-col">
                        <p className="text-gray-700 text-sm font-medium">Block</p>
                        <select
                            name="block"
                            value={filters.block}
                            onChange={handleChange}
                            className="border rounded p-2"
                        >
                            <option value="">Select Block</option>
                        </select>
                    </label>

                    {/* Village */}
                    <label className="flex flex-col">
                        <p className="text-gray-700 text-sm font-medium">Village</p>
                        <select
                            name="village"
                            value={filters.village}
                            onChange={handleChange}
                            className="border rounded p-2"
                        >
                            <option value="">Select Village</option>
                        </select>
                    </label>
                </div>

                <button
                    onClick={handleApply}
                    className="bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-4"
                >
                    Apply Filters
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
                    <div className="p-6">
                        <h1 className="text-gray-800 text-2xl font-bold">FRA Claim Data</h1>
                    </div>

                    {/* 🌍 Real Interactive Map */}
                    <div className="flex-1 relative">
                        <MapContainer
                            center={[20, 78]} // Default center → India
                            zoom={4}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </MapContainer>

                        {/* Search Bar */}
                        <div className="absolute top-6 left-6 w-full max-w-sm z-[1000]">
                            <input
                                type="text"
                                placeholder="Search for a claim"
                                className="w-full px-4 py-2 border rounded shadow bg-white"
                            />
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="p-6 border-t border-gray-200">
                        <h3 className="text-gray-800 text-lg font-bold mb-4">Legend</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                <p>Approved Claims</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                                <p>Pending Claims</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                                <p>Rejected Claims</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
