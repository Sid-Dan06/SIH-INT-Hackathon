import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ClientClaims() {
    const [filters, setFilters] = useState({
        status: "All",
        district: "",
        block: "",
        village: "",
    });

    const [search, setSearch] = useState("");
    const [claims] = useState([
        {
            id: 1,
            claimant: "Radha Murmu",
            status: "Approved",
            district: "Nagpur",
            block: "Block A",
            village: "Village 1",
            position: [21.1458, 79.0882], // Nagpur
        },
        {
            id: 2,
            claimant: "Anil Kumar",
            status: "Pending",
            district: "Raipur",
            block: "Block B",
            village: "Village 2",
            position: [21.2514, 81.6296], // Raipur
        },
        {
            id: 3,
            claimant: "Sita Das",
            status: "Rejected",
            district: "Bhubaneswar",
            block: "Block C",
            village: "Village 3",
            position: [20.2961, 85.8245], // Bhubaneswar
        },
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleApply = () => {
        alert(
            `Filters applied:\nStatus: ${filters.status}\nDistrict: ${filters.district}\nBlock: ${filters.block}\nVillage: ${filters.village}`
        );
    };

    // 🔍 Apply filters + search
    const filteredClaims = claims.filter((claim) => {
        const matchesStatus =
            filters.status === "All" || claim.status === filters.status;
        const matchesDistrict =
            !filters.district || claim.district === filters.district;
        const matchesBlock = !filters.block || claim.block === filters.block;
        const matchesVillage = !filters.village || claim.village === filters.village;
        const matchesSearch =
            claim.claimant.toLowerCase().includes(search.toLowerCase()) ||
            claim.district.toLowerCase().includes(search.toLowerCase());

        return (
            matchesStatus &&
            matchesDistrict &&
            matchesBlock &&
            matchesVillage &&
            matchesSearch
        );
    });

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
                            <option value="Nagpur">Nagpur</option>
                            <option value="Raipur">Raipur</option>
                            <option value="Bhubaneswar">Bhubaneswar</option>
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
                            <option value="Block A">Block A</option>
                            <option value="Block B">Block B</option>
                            <option value="Block C">Block C</option>
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
                            <option value="Village 1">Village 1</option>
                            <option value="Village 2">Village 2</option>
                            <option value="Village 3">Village 3</option>
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
                    <div className="p-6 border-b border-gray-200">
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

                            {/* Display filtered claims as markers */}
                            {filteredClaims.map((claim) => (
                                <Marker key={claim.id} position={claim.position}>
                                    <Popup>
                                        <strong>{claim.claimant}</strong> <br />
                                        Status: {claim.status} <br />
                                        District: {claim.district}
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>

                        {/* Search Bar */}
                        <div className="absolute top-6 left-6 w-full max-w-sm z-[1000]">
                            <input
                                type="text"
                                placeholder="Search for a claim"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
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
