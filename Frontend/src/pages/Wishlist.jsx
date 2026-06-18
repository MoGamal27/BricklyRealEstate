import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUser, getWishlist, removeFromWishlist, getPropertyById } from "@/lib/mockStorage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800";
// Safely get first image from property — backend may return different shapes
const getImage = (p) => {
    if (!p)
        return FALLBACK_IMAGE;
    if (Array.isArray(p.images) && p.images.length > 0)
        return p.images[0];
    if (typeof p.images === 'string')
        return p.images;
    return FALLBACK_IMAGE;
};
// Safely get location — backend may use 'city' instead of 'location'
const getLocation = (p) => {
    return p?.location || p?.city || p?.address || 'Unknown location';
};
// Safely get sqft — backend may use 'area' instead of 'size_sqft'
const getSqft = (p) => {
    return p?.size_sqft || p?.area || 0;
};
const Wishlist = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = getCurrentUser();
    useEffect(() => {
        if (!user) {
            navigate("/auth");
            return;
        }
        const loadWishlist = async () => {
            try {
                const ids = await getWishlist(user.id);
                if (!ids || ids.length === 0) {
                    setLoading(false);
                    return;
                }
                const propertiesData = await Promise.all(ids.map(id => getPropertyById(id)));
                // Filter out any null/undefined results
                setProperties(propertiesData.filter((p) => p != null));
            }
            catch (error) {
                console.error('Error loading wishlist:', error);
            }
            finally {
                setLoading(false);
            }
        };
        loadWishlist();
    }, []);
    const handleRemove = async (propertyId) => {
        if (!user)
            return;
        await removeFromWishlist(user.id, propertyId);
        setProperties(prev => prev.filter(p => p.id !== propertyId));
        toast({ title: "Removed from wishlist" });
    };
    return (<div className="min-h-screen flex flex-col"><Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">My Wishlist</h1>
            <p className="text-xl text-muted-foreground">Properties you've saved for later</p>
          </div>

          {loading ? (<div className="text-center py-12 text-muted-foreground">Loading wishlist...</div>) : properties.length === 0 ? (<Card className="p-12 text-center"><CardContent>
              <p className="text-xl text-muted-foreground mb-6">Your wishlist is empty</p>
              <Button asChild><Link to="/search">Browse Properties</Link></Button>
            </CardContent></Card>) : (<>
              <div className="mb-6">
                <Card className="bg-accent/10 border-accent/20"><CardContent className="p-6">
                  <p className="text-muted-foreground">Based on your saved properties, you might also like homes in similar neighborhoods.</p>
                </CardContent></Card>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map(p => (<Card key={p.id} onClick={() => navigate(`/property/${p.id}`)} className="overflow-hidden group hover:shadow-elegant transition-all cursor-pointer">
                    <div className="relative overflow-hidden h-64">
                      <img src={getImage(p)} alt={p.title || 'Property'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" onError={(e) => { e.target.src = FALLBACK_IMAGE; }}/>
                      <Button size="icon" variant="destructive" className="absolute top-4 right-4 rounded-full" onClick={(e) => { e.stopPropagation(); handleRemove(p.id); }}>
                        <Trash2 className="w-5 h-5"/>
                      </Button>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                      <div className="flex items-center text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4 mr-1"/>{getLocation(p)}
                      </div>
                      <div className="text-2xl font-bold text-accent mb-4">
                        {p.price?.toLocaleString() || 'N/A'} EGP
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-1"><Bed className="w-4 h-4"/>{p.bedrooms}</div>
                        <div className="flex items-center gap-1"><Bath className="w-4 h-4"/>{p.bathrooms}</div>
                        <div className="flex items-center gap-1"><Square className="w-4 h-4"/>{getSqft(p)} sqft</div>
                      </div>

                    </CardContent>
                  </Card>))}
              </div>
            </>)}
        </div>
      </main><Footer />
    </div>);
};
export default Wishlist;
