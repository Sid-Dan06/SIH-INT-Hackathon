import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ClientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="px-8 py-10 max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-gray-900 text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-500 text-base font-normal mt-1">
            Overview of Forest Rights Act implementation
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col gap-2 rounded-lg p-6 bg-white border border-gray-200 shadow-sm">
            <p className="text-gray-600 text-sm font-medium">
              Total Claims Processed
            </p>
            <p className="text-gray-900 text-2xl font-semibold">0</p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg p-6 bg-white border border-gray-200 shadow-sm">
            <p className="text-gray-600 text-sm font-medium">Approved Claims</p>
            <p className="text-gray-900 text-2xl font-semibold">0</p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg p-6 bg-white border border-gray-200 shadow-sm">
            <p className="text-gray-600 text-sm font-medium">Pending Claims</p>
            <p className="text-gray-900 text-2xl font-semibold">0</p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg p-6 bg-white border border-gray-200 shadow-sm">
            <p className="text-gray-600 text-sm font-medium">
              Total Forest Area Recognized
            </p>
            <p className="text-gray-900 text-2xl font-semibold">0</p>
          </div>
        </div>

        {/* Map + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* Map */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-gray-900 text-lg font-bold leading-tight mb-4">
              Claims Distribution Map
            </h2>
            <div className="h-80 w-full rounded-lg overflow-hidden">
              <MapContainer
                center={[20.5937, 78.9629]} // India center
                zoom={5}
                className="h-full w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-gray-900 text-lg font-bold leading-tight mb-4">
              Recent Activity
            </h2>
            <p className="text-gray-500 text-sm">No recent activity</p>
          </div>
        </div>
      </main>
    </div>
  );
}
