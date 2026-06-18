import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getCurrentUser, addBooking } from "@/lib/mockStorage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
const Booking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const user = getCurrentUser();
    const [date, setDate] = useState();
    const [time, setTime] = useState("10:00 AM");
    const [notes, setNotes] = useState("");
    const state = location.state;
    const propertyTitle = state?.propertyTitle || "Modern Villa with Ocean View";
    const propertyLocation = state?.propertyLocation || "Malibu, CA";
    const propertyPrice = state?.propertyPrice || 2450000;
    const propertyId = state?.propertyId || "prop-1";
    const propertyImage = state?.propertyImage || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800";
    if (!user) {
        return (<div className="min-h-screen flex flex-col"><Navbar />
        <main className="flex-1 flex items-center justify-center pt-24">
          <div className="text-center"><h2 className="text-2xl font-bold mb-4">Please sign in to book a viewing</h2>
            <Button asChild><Link to="/auth">Sign In</Link></Button></div>
        </main><Footer />
      </div>);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!date) {
            toast({ title: "Please select a date", variant: "destructive" });
            return;
        }
        await addBooking({
            property_id: propertyId, property_title: propertyTitle,
            property_location: propertyLocation,
            property_image: propertyImage,
            BUYER_id: user.id, date: date.toISOString().split("T")[0],
            time, notes, status: "PENDING",
        });
        toast({ title: "Viewing Requested! ✅", description: "The seller will confirm your appointment soon." });
        setTimeout(() => navigate("/bookings"), 1500);
    };
    const times = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
    return (<div className="min-h-screen flex flex-col"><Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Request Property Viewing</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card><CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Property Details</h2>
              <img src={propertyImage} alt={propertyTitle} className="w-full h-48 object-cover rounded-lg mb-4" onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"; }} />
              <p className="text-lg font-semibold">{propertyTitle}</p>
              <p className="text-muted-foreground">{propertyLocation}</p>
              <p className="text-2xl font-bold text-accent mt-4">{propertyPrice.toLocaleString()} EGP</p>
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-bold mb-2">What to expect:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 30-45 minute property tour</li>
                  <li>• Meet with the listing agent</li>
                  <li>• Ask questions about the property</li>
                  <li>• Explore the neighborhood</li>
                </ul>
              </div>
            </CardContent></Card>

            <Card><CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div><Label className="text-lg mb-3 block">Select Viewing Date</Label>
                  <Calendar mode="single" selected={date} onSelect={setDate} disabled={d => d < new Date()} className="rounded-md border w-full"/>
                </div>
                <div><Label className="text-lg mb-2 block">Preferred Time</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {times.map(t => <button key={t} type="button" onClick={() => setTime(t)} className={`p-2 text-sm rounded-lg border transition-colors ${time === t ? "bg-accent text-accent-foreground border-accent" : "hover:bg-secondary"}`}>{t}</button>)}
                  </div>
                </div>
                <div><Label htmlFor="notes" className="text-lg">Additional Notes (Optional)</Label>
                  <Textarea id="notes" placeholder="Any specific questions or requirements..." value={notes} onChange={e => setNotes(e.target.value)} className="mt-2 min-h-24"/>
                </div>
                <Button type="submit" className="w-full h-14 text-lg bg-gradient-to-r from-accent to-accent/90">Request Viewing</Button>
                <p className="text-sm text-muted-foreground text-center">The seller will respond within 24 hours</p>
              </form>
            </CardContent></Card>
          </div>
        </div>
      </main><Footer />
    </div>);
};
export default Booking;
