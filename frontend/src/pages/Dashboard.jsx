import React from 'react'
import Navbar from '../components/Navbar'
import MapView from '../components/MapView'

export default function Dashboard(){
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">FRA Claim Map</h1>
        <div className="rounded shadow bg-white p-4">
          <MapView />
        </div>
      </main>
    </div>
  )
}
