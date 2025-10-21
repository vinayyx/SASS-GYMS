import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ContactMap() {
  return (
    <section className="md:px-16 px-6 py-10 bg-black text-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold">Locate Us on Map</h2>
        <p className="text-gray-400 mt-2">Visit our office or connect online — we’re always here to help.</p>
      </div>

      <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-700">
        <MapContainer
          center={[22.760511, 75.900253]}
          zoom={13}
          className="w-full h-full"
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[22.760511, 75.900253]}>
            <Popup>
              <span className="font-bold text-[#D0FF71]">Xyntech Office</span>
              <br />
              Vijay Nagar, Indore
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
}

export default ContactMap;
