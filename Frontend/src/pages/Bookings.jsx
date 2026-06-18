import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUser, getBookings, cancelBooking } from "@/lib/mockStorage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const Bookings = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [bookings, setBookings] = useState([]);
    const user = getCurrentUser();
    useEffect(() => {
        if (!user) {
            navigate("/auth");
            return;
        }
        const loadBookings = async () => {
            const bookingsData = await getBookings(user.id);
            setBookings(bookingsData);
        };
        loadBookings();
    }, []);
    const handleCancel = async (id) => {
        if (!window.confirm("Cancel this booking?"))
            return;
        const success = await cancelBooking(id);
        if (success) {
            setBookings(prev => prev.filter(b => b.id !== id));
            toast({ title: "Booking cancelled" });
        }
        else {
            toast({ variant: "destructive", title: "Failed to cancel booking" });
        }
    };
    const statusColor = (s) => ({ confirmed: "bg-success text-success-foreground", pending: "bg-accent text-accent-foreground", cancelled: "bg-destructive text-destructive-foreground" }[s] || "bg-secondary");
    return (<div className="min-h-screen flex flex-col"><Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">My Bookings</h1>
          {bookings.length === 0 ? (<Card className="p-12 text-center"><CardContent>
              <p className="text-xl text-muted-foreground mb-6">You don't have any bookings yet</p>
              <Button asChild><Link to="/search">Browse Properties</Link></Button>
            </CardContent></Card>) : (<div className="space-y-6">
              {bookings.map(b => (<Card key={b.id} className="hover:shadow-elegant transition-shadow"><CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img src={b.property_image} alt={b.property_title} className="w-full md:w-48 h-48 object-cover rounded-lg"/>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{b.property_title}</h3>
                          <div className="flex items-center text-muted-foreground"><MapPin className="w-4 h-4 mr-1"/>{b.property_location}</div>
                        </div>
                        <Badge className={statusColor(b.status)}>{b.status.charAt(0).toUpperCase() + b.status.slice(1)}</Badge>
                      </div>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-muted-foreground"/><span>{new Date(b.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span></div>
                        <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-muted-foreground"/><span>{b.time}</span></div>
                        {b.notes && <p className="text-sm text-muted-foreground italic">Notes: {b.notes}</p>}
                      </div>
                      <div className="flex gap-3">
                        <Button asChild variant="outline"><Link to={`/property/${b.property_id}`}>View Property</Link></Button>
                        {b.status !== "CANCELLED" && <Button variant="destructive" onClick={() => handleCancel(b.id)}>Cancel Booking</Button>}
                      </div>
                    </div>
                  </div>
                </CardContent></Card>))}
            </div>)}
        </div>
      </main><Footer />
    </div>);
};
export default Bookings;
