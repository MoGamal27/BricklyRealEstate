import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, getPropertyById, increasePropertyViews, isInWishlist, addToWishlist, removeFromWishlist, addConversation, getConversations, updateProperty } from "@/lib/mockStorage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Bed, Bath, Square, Heart, Calendar, MessageCircle, ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [reportDialogOpen, setReportDialogOpen] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const user = getCurrentUser();
    const hasIncrementedView = useRef(false);

    const { data: property, isLoading: propertyLoading } = useQuery({
        queryKey: ['property', id],
        queryFn: () => getPropertyById(id),
        enabled: !!id
    });

    const { data: isWishlisted = false } = useQuery({
        queryKey: ['wishlist', user?.id, id],
        queryFn: () => isInWishlist(user.id, id),
        enabled: !!user && !!id
    });

    const wishlistMutation = useMutation({
        mutationFn: async ({ add }) => {
            if (add) {
                await addToWishlist(user.id, property.id);
            } else {
                await removeFromWishlist(user.id, property.id);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist', user?.id, id] });
        }
    });

    const conversationMutation = useMutation({
        mutationFn: async () => {
            const conversations = await getConversations(user.id);
            const existing = conversations.find(c => c.property_id === property.id);
            if (existing) return existing;
            return await addConversation({
                property_id: property.id,
                BUYER_id: user.id,
                SELLER_id: property.SELLER_id,
                property_title: property.title,
                other_user_name: "Property Owner"
            });
        },
        onSuccess: (conversation) => {
            navigate(`/chat?conversation=${conversation.id}`);
        }
    });

    useEffect(() => {
        if (property?.id && !hasIncrementedView.current) {
            hasIncrementedView.current = true;
            increasePropertyViews(property.id).then(() => {
                queryClient.invalidateQueries({ queryKey: ['property', id] });
            }).catch(() => {
                // Ignore view counting failures silently
            });
        }
    }, [property?.id, id, queryClient]);

    if (propertyLoading)
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 flex items-center justify-center pt-24">
                    <div className="text-center">Loading...</div>
                </main>
                <Footer />
            </div>
        );

    if (!property)
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 flex items-center justify-center pt-24">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Property not found</h2>
                        <Button asChild><Link to="/search">Back to Search</Link></Button>
                    </div>
                </main>
                <Footer />
            </div>
        );

    const images = property.images?.length ? property.images : ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200"];
    const aiSuggestedPrice = property.ai_suggested_price || Math.round(property.price * 0.97 / 1000) * 1000;

    const handleWishlist = () => {
        if (!user) {
            toast({ title: "Please sign in first", variant: "destructive" });
            navigate("/auth");
            return;
        }
        wishlistMutation.mutate({ add: !isWishlisted }, {
            onSuccess: () => {
                toast({ title: isWishlisted ? "Removed from wishlist" : "Added to wishlist!" });
            },
            onError: () => {
                toast({ title: "Error updating wishlist", variant: "destructive" });
            }
        });
    };

    const handleBooking = () => {
        if (!user) {
            toast({ title: "Please sign in first", variant: "destructive" });
            navigate("/auth");
            return;
        }
        navigate("/booking", { state: { propertyId: id, propertyTitle: property.title, propertyLocation: property.location, propertyPrice: property.price, propertyImage: images[0] } });
    };

    const handleChat = () => {
        if (!user) {
            toast({ title: "Please sign in first", variant: "destructive" });
            navigate("/auth");
            return;
        }
        conversationMutation.mutate(undefined, {
            onError: () => {
                toast({ title: "Error starting chat", variant: "destructive" });
            }
        });
    };

    const handleReport = () => {
        if (!user) {
            toast({ title: "Please sign in first", variant: "destructive" });
            navigate("/auth");
            return;
        }
        if (!reportReason.trim()) {
            toast({ title: "Please provide a reason for the report", variant: "destructive" });
            return;
        }
        updateProperty(property.id, {
            reported: true,
            report_reason: reportReason.trim(),
            reported_by: user.id,
            reported_at: new Date().toISOString()
        }).then(() => {
            toast({ title: "Report submitted", description: "Thank you. An admin will review this listing." });
            setReportDialogOpen(false);
            setReportReason("");
        }).catch(() => {
            toast({ title: "Error submitting report", variant: "destructive" });
        });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-24 pb-12">
                <div className="container mx-auto px-4">
                    <Link to="/search" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Search
                    </Link>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            {/* Image Gallery */}
                            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden mb-4 group">
                                <img
                                    src={images[currentImageIndex]}
                                    alt={property.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200"; }}
                                />
                                <Button size="icon" variant="secondary" className="absolute top-4 right-4 rounded-full" onClick={handleWishlist}>
                                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                                </Button>
                                {images.length > 1 && (
                                    <>
                                        <Button size="icon" variant="secondary" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setCurrentImageIndex(p => (p - 1 + images.length) % images.length)}>
                                            <ChevronLeft className="w-5 h-5" />
                                        </Button>
                                        <Button size="icon" variant="secondary" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setCurrentImageIndex(p => (p + 1) % images.length)}>
                                            <ChevronRight className="w-5 h-5" />
                                        </Button>
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {images.map((_, i) => (
                                                <button
                                                    key={i}
                                                    className={`h-2 rounded-full transition-all ${i === currentImageIndex ? "bg-white w-8" : "bg-white/50 w-2"}`}
                                                    onClick={() => setCurrentImageIndex(i)}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                            {images.length > 1 && (
                                <div className="grid grid-cols-3 gap-2 mb-6">
                                    {images.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img}
                                            alt=""
                                            className={`h-24 w-full object-cover rounded-lg cursor-pointer transition-all ${i === currentImageIndex ? "ring-2 ring-accent" : "opacity-70 hover:opacity-100"}`}
                                            onClick={() => setCurrentImageIndex(i)}
                                            onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200"; }}
                                        />
                                    ))}
                                </div>
                            )}
                            {/* Info */}
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
                                    <div className="flex items-center text-muted-foreground">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        <span className="text-lg">{property.location}</span>
                                    </div>
                                </div>
                                <Badge className="text-lg px-4 py-2">{property.property_type}</Badge>
                            </div>
                            <div className="flex items-center gap-8 mb-6 text-lg">
                                <div className="flex items-center gap-2"><Bed className="w-5 h-5 text-muted-foreground" /><span>{property.bedrooms} Bedrooms</span></div>
                                <div className="flex items-center gap-2"><Bath className="w-5 h-5 text-muted-foreground" /><span>{property.bathrooms} Bathrooms</span></div>
                                <div className="flex items-center gap-2"><Square className="w-5 h-5 text-muted-foreground" /><span>{property.size_sqft} sqft</span></div>
                            </div>
                            <Card className="mb-6">
                                <CardContent className="p-6">
                                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                                    <p className="text-lg text-foreground/80 leading-relaxed">{property.description}</p>
                                </CardContent>
                            </Card>
                        </div>
                        {/* Sticky Card */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-24">
                                <CardContent className="p-6 space-y-6">
                                    <div>
                                        <div className="text-4xl font-bold text-accent mb-1">{property.price.toLocaleString()} EGP</div>
                                        <div className="text-sm text-muted-foreground">AI Suggested: {aiSuggestedPrice.toLocaleString()} EGP</div>
                                        <div className="text-sm text-muted-foreground">{(property.views || 0).toLocaleString()} views</div>
                                    </div>
                                    <div className="space-y-3">
                                        <Button className="w-full h-14 text-lg bg-gradient-to-r from-accent to-accent/90" onClick={handleBooking}>
                                            <Calendar className="w-5 h-5 mr-2" />Request Viewing
                                        </Button>
                                        <Button variant="outline" className="w-full h-14 text-lg" onClick={handleChat}>
                                            <MessageCircle className="w-5 h-5 mr-2" />Chat with Seller
                                        </Button>
                                        <Button variant="outline" className="w-full h-14 text-lg" onClick={handleWishlist}>
                                            <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                                            {isWishlisted ? "Saved" : "Save to Wishlist"}
                                        </Button>
                                    </div>
                                    <div className="pt-4 border-t">
                                        <h3 className="font-bold text-lg mb-2">Contact Information</h3>
                                        <p className="text-muted-foreground mb-1">Listed by Professional Realty</p>
                                        <p className="text-sm text-muted-foreground">Response time: Within 2 hours</p>
                                    </div>
                                    {/* Report Button */}
                                    <div className="pt-4 border-t">
                                        <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" className="w-full h-12 text-red-500 hover:text-red-600 hover:bg-red-50">
                                                    <Flag className="w-5 h-5 mr-2" />
                                                    Report Listing
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Report this listing</DialogTitle>
                                                    <DialogDescription>
                                                        Let us know why you're reporting this property. Your report will be reviewed by an admin.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <Textarea
                                                    placeholder="Describe the issue with this listing..."
                                                    value={reportReason}
                                                    onChange={(e) => setReportReason(e.target.value)}
                                                    rows={5}
                                                    className="w-full"
                                                />
                                                <DialogFooter>
                                                    <Button variant="outline" onClick={() => { setReportDialogOpen(false); setReportReason(""); }}>
                                                        Cancel
                                                    </Button>
                                                    <Button variant="destructive" onClick={handleReport}>
                                                        Submit Report
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PropertyDetails;