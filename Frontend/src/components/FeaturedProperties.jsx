import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getProperties, getCurrentUser, getWishlist, addToWishlist, removeFromWishlist } from "@/lib/mockStorage";
const FeaturedProperties = () => {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [tilt, setTilt] = useState({});
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState(new Set());
    const navigate = useNavigate();
    const loadWishlist = async (userId) => {
      const ids = await getWishlist(userId);
      setWishlist(new Set(ids || []));
    };
    const handleToggleWishlist = async (propertyId, e) => {
      if (e) {
        e.stopPropagation();
        e.preventDefault && e.preventDefault();
      }
      const user = getCurrentUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      try {
        if (wishlist.has(propertyId)) {
          await removeFromWishlist(user.id, propertyId);
        }
        else {
          await addToWishlist(user.id, propertyId);
        }
        await loadWishlist(user.id);
      }
      catch (err) {
        console.error('Wishlist toggle error:', err);
      }
    };
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting)
            setVisible(true); }, { threshold: 0.1 });
        if (sectionRef.current)
            observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        const load = async () => {
            try {
                const all = await getProperties();
                // Show only APPROVED properties, max 3 for featured section
                const approved = all.filter((p) => p.status === "APPROVED").slice(0, 3);
                setProperties(approved);
                const user = getCurrentUser();
                if (user) {
                    await loadWishlist(user.id);
                }
            }
            catch (err) {
                console.error("Failed to load featured properties:", err);
            }
            finally {
                setLoading(false);
            }
        };
        load();
    }, []);
    const handleMouseMove = (e, id) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt(prev => ({ ...prev, [id]: { x: y * 8, y: x * -8 } }));
    };
    const handleMouseLeave = (id) => {
        setTilt(prev => ({ ...prev, [id]: { x: 0, y: 0 } }));
    };
    const getImage = (p) => {
        if (Array.isArray(p.images) && p.images.length > 0)
            return p.images[0];
        if (typeof p.images === "string")
            return p.images;
        if (p.image)
            return p.image;
        return "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800";
    };
    const getLocation = (p) => p.location || p.city || p.address || "Location not specified";
    const formatPrice = (price) => {
        const num = typeof price === "string" ? parseFloat(price.replace(/,/g, "")) : price;
        if (!num || isNaN(num))
            return "Price on request";
        return num.toLocaleString();
    };
    return (<section ref={sectionRef} className="py-24 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Properties</h2>
          <p className="text-xl text-muted-foreground">
            Discover our handpicked selection of exceptional homes
          </p>
        </div>

        {loading ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (<div key={i} className="h-96 rounded-xl bg-muted animate-pulse"/>))}
          </div>) : properties.length === 0 ? (<div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No featured properties available yet.</p>
            <Button asChild size="lg" variant="outline" className="mt-4">
              <Link to="/search">Browse All Properties</Link>
            </Button>
          </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
            {properties.map((property, index) => {
                    return (<div key={property.id} onMouseMove={(e) => handleMouseMove(e, property.id)} onMouseLeave={() => handleMouseLeave(property.id)} style={{
                        opacity: visible ? 1 : 0,
                        transform: visible
                            ? `perspective(1000px) rotateX(${tilt[property.id]?.x || 0}deg) rotateY(${tilt[property.id]?.y || 0}deg) translateY(0)`
                            : 'translateY(60px)',
                        transition: tilt[property.id]
                            ? 'transform 0.1s ease, opacity 0.7s ease'
                            : `opacity 0.7s ease ${0.1 + index * 0.15}s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.1 + index * 0.15}s`,
                        transformStyle: 'preserve-3d',
                    }} onClick={() => navigate(`/property/${property.id}`)}>
                        <Card className="overflow-hidden group hover:shadow-elegant transition-shadow cursor-pointer h-full" style={{ boxShadow: tilt[property.id] ? '0 30px 60px rgba(0,0,0,0.2), 0 0 30px rgba(232,98,42,0.08)' : '' }}>
                  <div className="relative overflow-hidden h-64">
                    <img src={getImage(property)} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800";
                }}/>
                    <Button size="icon" variant="secondary" className="absolute top-4 right-4 rounded-full z-10" onClick={(e) => handleToggleWishlist(property.id, e)}>
                      <Heart className={`w-5 h-5 ${wishlist.has(property.id) ? "fill-red-500 text-red-500" : ""}`}/>
                    </Button>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                    <Badge className="absolute bottom-4 left-4 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{property.title}</h3>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4 mr-1"/>
                      <span>{getLocation(property)}</span>
                    </div>
                    <div className="text-3xl font-bold text-accent mb-4">${formatPrice(property.price)}</div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1"><Bed className="w-4 h-4"/><span>{property.bedrooms} Bed</span></div>
                      <div className="flex items-center gap-1"><Bath className="w-4 h-4"/><span>{property.bathrooms} Bath</span></div>
                      <div className="flex items-center gap-1"><Square className="w-4 h-4"/><span>{property.size_sqft || property.size} sqft</span></div>
                    </div>

                  </CardContent>
                </Card>
              </div>);
            })}
          </div>)}

        {!loading && properties.length > 0 && (<div className="text-center mt-12" style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s',
            }}>
            <Button asChild size="lg" variant="outline">
              <Link to="/search">View All Properties</Link>
            </Button>
          </div>)}
      </div>
    </section>);
};
export default FeaturedProperties;
