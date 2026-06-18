import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { getCurrentUser, addProperty } from "@/lib/mockStorage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Sparkles, Upload, X } from "lucide-react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const DEFAULT_POSITION = [30.0444, 31.2357];

const MapClickHandler = ({ onSelect }) => {
    useMapEvents({
        click: (event) => {
            onSelect(event.latlng.lat, event.latlng.lng);
        },
    });
    return null;
};

const MapViewSync = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(position, map.getZoom());
    }, [map, position]);
    return null;
};

const LocationPicker = ({ latitude, longitude, onSelect }) => {
    const parsedLat = Number(latitude);
    const parsedLng = Number(longitude);
    const hasPosition =
        latitude !== "" &&
        longitude !== "" &&
        Number.isFinite(parsedLat) &&
        Number.isFinite(parsedLng);
    const position = hasPosition ? [parsedLat, parsedLng] : DEFAULT_POSITION;

    return (
        <div className="space-y-2">
            <div className="h-80 overflow-hidden rounded-lg border border-border">
                <MapContainer center={position} zoom={hasPosition ? 14 : 11} className="h-full w-full" scrollWheelZoom>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler onSelect={onSelect} />
                    <MapViewSync position={position} />
                    {hasPosition && <Marker position={position} />}
                </MapContainer>
            </div>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Click the map to set the property location, or type latitude and longitude below.
            </p>
        </div>
    );
};

const AddProperty = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [aiPrice, setAiPrice] = useState(null);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const fileInputRef = useRef(null);
    const [form, setForm] = useState({
        title: "", description: "", city: "", address: "", neighborhood: "", price: "",
        bedrooms: "", bathrooms: "", area: "", type: "", furnished: false,
        level: "", compound: "", paymentOption: "", deliveryDate: "",
        latitude: "", longitude: ""
    });
    const user = getCurrentUser();
    useEffect(() => {
        if (!user) {
            navigate("/auth");
            return;
        }
        if (user.role !== "SELLER")
            navigate("/");
    }, []);
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (images.length + files.length > 10) {
            toast({ variant: "destructive", title: "Max 10 images allowed" });
            return;
        }
        const newFiles = [...images, ...files];
        setImages(newFiles);
        const previews = newFiles.map(f => URL.createObjectURL(f));
        setImagePreviews(previews);
    };
    const removeImage = (index) => {
        const newFiles = images.filter((_, i) => i !== index);
        setImages(newFiles);
        setImagePreviews(newFiles.map(f => URL.createObjectURL(f)));
    };
    const handleMapSelect = (latitude, longitude) => {
        setForm({
            ...form,
            latitude: latitude.toFixed(6),
            longitude: longitude.toFixed(6),
        });
    };
    const handleAiPrice = () => {
        if (!form.area || !form.city) {
            toast({ variant: "destructive", title: "Enter city and area first" });
            return;
        }
        // Egyptian price per sqm (in EGP)
        const locationPrices = {
            "north coast": 15000,
            "new cairo": 12000,
            "maadi": 10000,
            "heliopols": 9000,
            "shorouk": 8000,
            default: 7000
        };
        const loc = form.city.toLowerCase();
        let ppsf = locationPrices.default;
        Object.keys(locationPrices).forEach(k => { if (loc.includes(k))
            ppsf = locationPrices[k]; });
        const suggested = Math.round((parseInt(form.area) * ppsf + parseInt(form.bedrooms || "0") * 150000 + parseInt(form.bathrooms || "0") * 100000) / 1000) * 1000;
        setAiPrice(suggested.toLocaleString());
        toast({ title: "AI Price Suggestion", description: `We suggest ${suggested.toLocaleString()} EGP based on location & size` });
    };
    const convertFilesToDataUrls = async (files) => Promise.all(files.map((file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    })));
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user)
            return;
        setLoading(true);
        try {
            const imageUrls = images.length > 0
                ? await convertFilesToDataUrls(images)
                : ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200'];
            const propertyData = {
                title: form.title,
                description: form.description,
                city: form.city,
                address: form.address,
                neighborhood: form.neighborhood,
                location: `${form.city}${form.neighborhood ? `, ${form.neighborhood}` : ''}`,
                price: Number(form.price),
                bedrooms: Number(form.bedrooms),
                bathrooms: Number(form.bathrooms),
                size_sqft: Number(form.area),
                property_type: form.type || 'apartment',
                furnished: form.furnished,
                level: form.level,
                compound: form.compound,
                paymentOption: form.paymentOption,
                deliveryDate: form.deliveryDate,
                latitude: Number(form.latitude),
                longitude: Number(form.longitude),
                SELLER_id: user.id,
                status: 'PENDING',
                images: imageUrls,
            };
            if (aiPrice) {
                propertyData.ai_suggested_price = Number(aiPrice.replace(/,/g, ""));
            }
            await addProperty(propertyData);
            toast({ title: "Property submitted for review!" });
            navigate("/SELLER/properties");
        }
        catch (error) {
            console.error("Add property error:", error);
            toast({ variant: "destructive", title: "Failed to submit property", description: error.message });
        }
        finally {
            setLoading(false);
        }
    };
    if (!user)
        return null;
    return (<div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">List Your Property</h1>
          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <Label>Property Title *</Label>
                    <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g., Modern Villa with Ocean View" required/>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Description</Label>
                    <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe your property..." className="min-h-28"/>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Location (City) *</Label>
                    <Input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="e.g., Cairo, Giza" required/>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Address *</Label>
                    <Input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="e.g., 123 Main Street" required/>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Neighborhood *</Label>
                    <Input value={form.neighborhood} onChange={e => setForm({ ...form, neighborhood: e.target.value })} placeholder="e.g., Downtown, Riverside" required/>
                  </div>
                  <div className="space-y-2">
                    <Label>Property Type *</Label>
                    <Select value={form.type} onValueChange={v => setForm({ ...form, type: v })}>
                      <SelectTrigger><SelectValue placeholder="Select type"/></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="single_family">Single Family</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="duplex">Duplex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Price (EGP) *</Label>
                    <Input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="1000000" required/>
                    {aiPrice && <p className="text-sm text-muted-foreground">AI Suggested: {aiPrice} EGP</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Bedrooms *</Label>
                    <Input type="number" value={form.bedrooms} onChange={e => setForm({ ...form, bedrooms: e.target.value })} min="1" required/>
                  </div>
                  <div className="space-y-2">
                    <Label>Bathrooms *</Label>
                    <Input type="number" value={form.bathrooms} onChange={e => setForm({ ...form, bathrooms: e.target.value })} min="1" required/>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Area (sqft) *</Label>
                    <Input type="number" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} placeholder="2000" required/>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Property Location on Map *</Label>
                    <LocationPicker latitude={form.latitude} longitude={form.longitude} onSelect={handleMapSelect}/>
                  </div>
                  <div className="space-y-2">
                    <Label>Latitude *</Label>
                    <Input type="number" step="0.000001" value={form.latitude} onChange={e => setForm({ ...form, latitude: e.target.value })} placeholder="30.0444" required/>
                  </div>
                  <div className="space-y-2">
                    <Label>Longitude *</Label>
                    <Input type="number" step="0.000001" value={form.longitude} onChange={e => setForm({ ...form, longitude: e.target.value })} placeholder="31.2357" required/>
                  </div>
                  <div className="space-y-2">
                    <Label>Level (Floor) *</Label>
                    <Input type="number" value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} min="0" required/>
                  </div>
                  <div className="space-y-2">
                    <Label>Compound Name *</Label>
                    <Input value={form.compound} onChange={e => setForm({ ...form, compound: e.target.value })} placeholder="e.g., Compound Name" required/>
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Option *</Label>
                    <Input value={form.paymentOption} onChange={e => setForm({ ...form, paymentOption: e.target.value })} placeholder="e.g., Cash, Installment" required/>
                  </div>
                  <div className="space-y-2">
                    <Label>Delivery Date *</Label>
                    <Input type="date" value={form.deliveryDate} onChange={e => setForm({ ...form, deliveryDate: e.target.value })} required/>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="furnished" checked={form.furnished} onChange={e => setForm({ ...form, furnished: e.target.checked })} className="w-4 h-4"/>
                    <Label htmlFor="furnished" className="mb-0 cursor-pointer">Furnished</Label>
                  </div>

                  {/* Image Upload */}
                  <div className="md:col-span-2 space-y-2">
                    <Label>Property Images</Label>
                    <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors" onClick={() => fileInputRef.current?.click()}>
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground"/>
                      <p className="text-sm text-muted-foreground">Click to upload images (up to 10)</p>
                      <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange}/>
                    </div>
                    {imagePreviews.length > 0 && (<div className="grid grid-cols-4 gap-2 mt-2">
                        {imagePreviews.map((src, i) => (<div key={i} className="relative group">
                            <img src={src} alt={`Preview ${i + 1}`} className="w-full h-20 object-cover rounded-md"/>
                            <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <X className="w-3 h-3"/>
                            </button>
                          </div>))}
                      </div>)}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" className="flex-1" onClick={handleAiPrice}>
                    <Sparkles className="w-5 h-5 mr-2"/>Get AI Price Suggestion
                  </Button>
                  <Button type="submit" className="flex-1 bg-gradient-to-r from-accent to-accent/90" disabled={loading}>
                    {loading ? "Submitting..." : "Submit for Review"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Your property will be reviewed by our admin team before going live
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>);
};
export default AddProperty;
