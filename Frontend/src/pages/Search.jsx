import { useState, useEffect } from "react";
import { getProperties, getCurrentUser, getWishlist, addToWishlist, removeFromWishlist } from "@/lib/mockStorage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MapPin, Bed, Bath, Square, Heart, SlidersHorizontal, Map, Grid, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import PropertyMap from "@/components/PropertyMap";
// Mock coordinates for demo (Egypt locations)
const mockCoordinates = {
    "North Coast, Egypt": [31.1585, 30.4639],
    "New Cairo, Cairo": [30.0158, 31.4569],
    "Maadi, Cairo": [29.9546, 31.3301],
    "Al Shorouk, Cairo": [30.1234, 31.6234],
    "El Ain El Sokhna, Egypt": [29.5432, 32.3456],
    "Heliopolis, Cairo": [30.0987, 31.3245],
};
const Search = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState("grid");
    const [priceRange, setPriceRange] = useState([0, 5000000]);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        propertyType: "all",
        bedrooms: "any",
        bathrooms: "any",
        sortBy: "newest",
    });
    const [wishlist, setWishlist] = useState([]);
    const user = getCurrentUser();
    useEffect(() => {
      loadProperties();
    }, [filters, priceRange]);
    useEffect(() => {
      const fetchWishlist = async () => {
        if (user) {
          const wl = await getWishlist(user.id);
          setWishlist(wl);
        }
      };
      fetchWishlist();
    }, [user]);
    const loadProperties = async () => {
        setLoading(true);
        try {
            // Get all properties from localStorage
            let allProperties = await getProperties();
            console.log("Search loading properties...", {
                all: allProperties.length,
                APPROVED: allProperties.filter(p => p.status === "APPROVED").length
            });
            // Filter by status (only APPROVED)
            allProperties = allProperties.filter(p => p.status === "APPROVED");
            // Filter by price range
            allProperties = allProperties.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
            // Filter by property type
            if (filters.propertyType !== "all") {
                allProperties = allProperties.filter(p => p.property_type === filters.propertyType);
            }
            // Filter by bedrooms
            if (filters.bedrooms !== "any") {
                allProperties = allProperties.filter(p => p.bedrooms >= parseInt(filters.bedrooms));
            }
            // Filter by bathrooms
            if (filters.bathrooms !== "any") {
                allProperties = allProperties.filter(p => p.bathrooms >= parseInt(filters.bathrooms));
            }
            // Sort
            if (filters.sortBy === "newest") {
                allProperties.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            }
            else if (filters.sortBy === "price-low") {
                allProperties.sort((a, b) => a.price - b.price);
            }
            else if (filters.sortBy === "price-high") {
                allProperties.sort((a, b) => b.price - a.price);
            }
            else if (filters.sortBy === "bedrooms") {
                allProperties.sort((a, b) => b.bedrooms - a.bedrooms);
            }
            // Add mock coordinates for demo
            const propertiesWithCoords = allProperties.map((p) => ({
                ...p,
                latitude: p.latitude || mockCoordinates[p.location]?.[0] || 37.7749,
                longitude: p.longitude || mockCoordinates[p.location]?.[1] || -122.4194,
            }));
            console.log("Search final property count:", propertiesWithCoords.length);
            setProperties(propertiesWithCoords);
        }
        catch (error) {
            console.error("Error loading properties:", error);
        }
        finally {
            setLoading(false);
        }
    };
    const mapProperties = properties.map((p) => ({
        id: p.id,
        title: p.title,
        location: p.location,
        price: p.price.toLocaleString(),
        latitude: p.latitude,
        longitude: p.longitude,
    }));
    return (<div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Home</h1>
            <p className="text-xl text-muted-foreground">
              Explore our curated collection of properties
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className={`lg:block ${showFilters ? "block" : "hidden"} lg:col-span-1`}>
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Filters</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} className="lg:hidden">
                      Close
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Property Type</Label>
                    <Select value={filters.propertyType} onValueChange={(v) => setFilters({ ...filters, propertyType: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="loft">Loft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Bedrooms</Label>
                    <Select value={filters.bedrooms} onValueChange={(v) => setFilters({ ...filters, bedrooms: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Bathrooms</Label>
                    <Select value={filters.bathrooms} onValueChange={(v) => setFilters({ ...filters, bathrooms: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label>Price Range</Label>
                    <Slider value={priceRange} onValueChange={setPriceRange} max={5000000} step={100000} className="w-full"/>
                    <div className="flex items-center justify-between text-sm">
                      <span>{(priceRange[0] / 1000000).toFixed(1)}M</span>
                      <span>{(priceRange[1] / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-accent to-accent/90" onClick={loadProperties}>
                    Apply Filters
                  </Button>
                </CardContent>
              </Card>
            </aside>

            {/* Properties Area */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  {loading ? "Loading..." : `${properties.length} properties found`}
                </p>
                <div className="flex gap-2 z-50 relative">
                  <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                    <SlidersHorizontal className="w-4 h-4 mr-2"/>
                    Filters
                  </Button>

                  {/* View Toggle */}
                  <div className="flex border rounded-lg overflow-hidden">
                    <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")} className="rounded-none">
                      <Grid className="w-4 h-4"/>
                    </Button>
                    <Button variant={viewMode === "map" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("map")} className="rounded-none">
                      <Map className="w-4 h-4"/>
                    </Button>
                  </div>

                  <Select value={filters.sortBy} onValueChange={(v) => setFilters({ ...filters, sortBy: v })}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[999]">
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="bedrooms">Most Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {loading ? (<div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground"/>
                </div>) : viewMode === "map" ? (<div className="h-[600px]">
                  <PropertyMap properties={mapProperties} onPropertyClick={(id) => window.open(`/property/${id}`, "_blank")}/>
                </div>) : properties.length === 0 ? (<div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">No properties found</p>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your filters
                  </p>
                </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {properties.map((property) => (
                    <Link key={property.id} to={`/property/${property.id}`} style={{ textDecoration: 'none' }}>
                      <Card className="overflow-hidden group hover:shadow-elegant transition-all cursor-pointer active:-translate-y-0.5 active:shadow-[0_35px_80px_-20px_rgba(6,100,180,0.35)] active:bg-accent/10">
                        <div className="relative overflow-hidden h-64">
                          <img src={property.images?.[0] ||
                            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"/>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="absolute top-4 right-4 rounded-full shadow-lg"
                            onClick={async (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (!user) return;
                              let updated;
                              if (wishlist.includes(property.id)) {
                                await removeFromWishlist(user.id, property.id);
                                updated = wishlist.filter(id => id !== property.id);
                              } else {
                                await addToWishlist(user.id, property.id);
                                updated = [...wishlist, property.id];
                              }
                              setWishlist(updated);
                            }}
                            aria-label={wishlist.includes(property.id) ? "Remove from wishlist" : "Add to wishlist"}
                          >
                            <Heart className={"w-5 h-5 transition-colors " + (wishlist.includes(property.id) ? "fill-red-500 text-red-500" : "")}/>
                          </Button>
                          <Badge className="absolute bottom-4 left-4 bg-primary text-primary-foreground">
                            {property.property_type}
                          </Badge>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                          <div className="flex items-center text-muted-foreground mb-4">
                            <MapPin className="w-4 h-4 mr-1"/>
                            <span>{property.location}</span>
                          </div>
                          <div className="text-2xl font-bold text-accent mb-4">
                            {property.price.toLocaleString()} EGP
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-1">
                              <Bed className="w-4 h-4"/>
                              <span>{property.bedrooms}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Bath className="w-4 h-4"/>
                              <span>{property.bathrooms}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Square className="w-4 h-4"/>
                              <span>{property.size_sqft} sqft</span>
                            </div>
                          </div>
                          <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/90 active:scale-[0.98] active:brightness-110">
                            <span>View Details</span>
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>)}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>);
};
export default Search;
