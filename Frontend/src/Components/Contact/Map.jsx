import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map() {
  return (
    <div className="md:px-16 mb-4 px-6" >
      <div className="w-full h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          center={[22.72272268690359, 75.85306081189718]}
          zoom={13}
          className="w-full h-full" // 
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[22.72272268690359, 75.85306081189718]}>
            <Popup className="font-bold text-[#D0FF71] " >Fit And more</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
