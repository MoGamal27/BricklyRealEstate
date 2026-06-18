import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// Fix for default markers not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});
function MapController({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}
const PropertyMap = ({ properties, onPropertyClick, center = [30.0444, 31.2357], // Default to Cairo, Egypt
zoom = 6 }) => {
    return (<div className="h-full w-full rounded-lg border border-border z-0" style={{zIndex: 0}}>
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <MapController center={center} zoom={zoom}/>
        
        {properties.map((property) => {
            if (!property.latitude || !property.longitude)
                return null;
            return (<Marker key={property.id} position={[property.latitude, property.longitude]} eventHandlers={{
                    click: () => onPropertyClick?.(property.id),
                }}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-sm">{property.title}</h3>
                  <p className="text-xs text-muted-foreground">{property.location}</p>
                  <p className="text-sm font-bold text-accent mt-1">{property.price} EGP</p>
                </div>
              </Popup>
            </Marker>);
        })}
      </MapContainer>
    </div>);
};
export default PropertyMap;
