import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUser, getProperties, getConversations, getBookings } from "@/lib/mockStorage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Plus, MessageCircle, Calendar, Clock } from "lucide-react";
const SELLERDashboard = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();
    const [activeListings, setActiveListings] = useState(0);
    const [pendingReviews, setPendingReviews] = useState(0);
    const [messages, setMessages] = useState(0);
    const [viewings, setViewings] = useState(0);
    useEffect(() => {
        if (!user) {
            navigate("/auth");
            return;
        }
        if (user.role !== "SELLER") {
            navigate("/");
            return;
        }
        const loadData = async () => {
            // Active Listings و Pending Reviews من mockStorage
            const props = await getProperties();
            const myProps = props.filter(p => p.SELLER_id === user.id);
            setActiveListings(myProps.filter(p => p.status === "APPROVED").length);
            setPendingReviews(myProps.filter(p => p.status === "PENDING").length);
            // Messages و Viewings من الـ API
            let msgCount = 0;
            let viewingCount = 0;
            try {
                const [msgsRes, viewingsRes] = await Promise.all([
                    fetch(`/api/messages?seller_id=${user.id}`),
                    fetch(`/api/viewings?seller_id=${user.id}`)
                ]);
                if (msgsRes.ok) {
                    const msgsData = await msgsRes.json();
                    msgCount = Array.isArray(msgsData) ? msgsData.length : 0;
                }
                if (viewingsRes.ok) {
                    const viewingsData = await viewingsRes.json();
                    viewingCount = Array.isArray(viewingsData) ? viewingsData.length : 0;
                }
            }
            catch (e) {
                console.error("API fetch failed:", e);
            }
            if (msgCount === 0) {
                const convs = await getConversations(user.id);
                msgCount = convs.length;
            }
            if (viewingCount === 0) {
                const bookings = await getBookings();
                const myPropertyIds = new Set(myProps.map(p => p.id));
                viewingCount = bookings.filter(b => myPropertyIds.has(b.property_id)).length;
            }
            setMessages(msgCount);
            setViewings(viewingCount);
        };
        loadData();
    }, []);
    if (!user || user.role !== "SELLER")
        return null;
    const stats = [
        { label: "Active Listings", value: activeListings.toString(), icon: Home },
        { label: "Pending Reviews", value: pendingReviews.toString(), icon: Clock },
        { label: "Messages", value: messages.toString(), icon: MessageCircle },
        { label: "Viewings", value: viewings.toString(), icon: Calendar },
    ];
    return (<div className="min-h-screen flex flex-col"><Navbar />
      <main className="flex-1 pt-24 pb-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div><h1 className="text-4xl font-bold mb-2">Seller Dashboard</h1><p className="text-xl text-muted-foreground">Welcome back, {user.full_name}</p></div>
            <Button asChild className="bg-gradient-to-r from-accent to-accent/90"><Link to="/SELLER/add-property"><Plus className="w-5 h-5 mr-2"/>Add New Property</Link></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map(s => (
              <Link key={s.label} to={s.label === "Viewings" ? "/SELLER/bookings" : s.label === "Messages" ? "/chat" : "#"}>
                <Card className="cursor-pointer hover:shadow-elegant transition-shadow"><CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2"><s.icon className="w-8 h-8 text-accent"/><span className="text-3xl font-bold">{s.value}</span></div>
                  <p className="text-muted-foreground">{s.label}</p>
                </CardContent></Card>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card><CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start h-14 text-lg"><Link to="/SELLER/add-property"><Plus className="w-5 h-5 mr-3"/>List New Property</Link></Button>
                <Button asChild variant="outline" className="w-full justify-start h-14 text-lg"><Link to="/SELLER/properties"><Home className="w-5 h-5 mr-3"/>View My Listings</Link></Button>
                <Button asChild variant="outline" className="w-full justify-start h-14 text-lg"><Link to="/SELLER/bookings"><Calendar className="w-5 h-5 mr-3"/>Viewing Requests</Link></Button>
                <Button asChild variant="outline" className="w-full justify-start h-14 text-lg"><Link to="/chat"><MessageCircle className="w-5 h-5 mr-3"/>Messages</Link></Button>
              </div>
            </CardContent></Card>
            <Card><CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[{ t: "New viewing request", s: "Modern Villa - Tomorrow at 2 PM", b: "New", c: "" },
            { t: "Property APPROVED", s: "Downtown Apartment", b: "APPROVED", c: "bg-success text-success-foreground" },
            { t: "New message", s: "From potential buyer", b: "1h ago", c: "" }].map((a, i) => (<div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div><p className="font-semibold">{a.t}</p><p className="text-sm text-muted-foreground">{a.s}</p></div>
                    <Badge className={a.c}>{a.b}</Badge>
                  </div>))}
              </div>
            </CardContent></Card>
          </div>
        </div>
      </main><Footer />
    </div>);
};
export default SELLERDashboard;
