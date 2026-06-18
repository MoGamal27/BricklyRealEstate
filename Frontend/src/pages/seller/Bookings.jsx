import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUser, getProperties, getBookings, updateBookingStatus } from "@/lib/mockStorage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SELLERBookings = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [bookings, setBookings] = useState([]);
    const user = getCurrentUser();

    useEffect(() => {
        if (!user) {
            navigate("/auth");
            return;
        }
        if (user.role !== "SELLER") {
            navigate("/");
            return;
        }
        loadBookings();
    }, []);

    const loadBookings = async () => {
        const props = await getProperties();
        const myPropertyIds = new Set(props.filter(p => p.SELLER_id === user.id).map(p => p.id));
        const allBookings = await getBookings();
        const myBookings = allBookings.filter(b => myPropertyIds.has(b.property_id));
        setBookings(myBookings);
    };

    const handleStatus = async (id, status) => {
        const success = await updateBookingStatus(id, status);
        if (!success) {
            toast({ variant: "destructive", title: "Could not update booking" });
            return;
        }
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
        toast({ title: status === "CONFIRMED" ? "Viewing confirmed!" : "Viewing rejected" });
    };

    const statusColor = (s) => ({
        CONFIRMED: "bg-success text-success-foreground",
        PENDING: "bg-accent text-accent-foreground",
        CANCELLED: "bg-destructive text-destructive-foreground",
    }[s] || "bg-secondary");

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-24 pb-12 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-8">Viewing Requests</h1>
                    {bookings.length === 0 ? (
                        <Card className="p-12 text-center">
                            <CardContent>
                                <p className="text-xl text-muted-foreground mb-6">No viewing requests yet</p>
                                <Button asChild><Link to="/SELLER/dashboard">Back to Dashboard</Link></Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-6">
                            {bookings.map(b => (
                                <Card key={b.id} className="hover:shadow-elegant transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <img
                                                src={b.property_image || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"}
                                                alt={b.property_title}
                                                className="w-full md:w-48 h-48 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h3 className="text-2xl font-bold mb-1">{b.property_title}</h3>
                                                        <div className="flex items-center text-muted-foreground">
                                                            <MapPin className="w-4 h-4 mr-1" />{b.property_location}
                                                        </div>
                                                    </div>
                                                    <Badge className={statusColor(b.status)}>
                                                        {b.status === "CONFIRMED" ? "Confirmed" : b.status === "PENDING" ? "Pending" : b.status}
                                                    </Badge>
                                                </div>
                                                <div className="space-y-2 mb-6">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-5 h-5 text-muted-foreground" />
                                                        <span>{new Date(b.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-5 h-5 text-muted-foreground" />
                                                        <span>{b.time}</span>
                                                    </div>
                                                    {b.notes && <p className="text-sm text-muted-foreground italic">Notes: {b.notes}</p>}
                                                </div>
                                                {b.status === "PENDING" && (
                                                    <div className="flex gap-3">
                                                        <Button className="bg-success text-success-foreground hover:bg-success/90" onClick={() => handleStatus(b.id, "CONFIRMED")}>
                                                            <CheckCircle className="w-4 h-4 mr-2" />Accept
                                                        </Button>
                                                        <Button variant="destructive" onClick={() => handleStatus(b.id, "REJECTED")}>
                                                            <XCircle className="w-4 h-4 mr-2" />Reject
                                                        </Button>
                                                    </div>
                                                )}
                                                {b.status !== "PENDING" && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {b.status === "CONFIRMED" ? "✓ You have confirmed this viewing." : "✗ You have rejected this viewing."}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SELLERBookings;