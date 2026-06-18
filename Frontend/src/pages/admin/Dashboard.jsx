import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, getProperties, getUsers, updateProperty } from "@/lib/mockStorage";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Users, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const ADMINDashboard = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [pendingProps, setPendingProps] = useState([]);
    const [allProps, setAllProps] = useState([]);
    const [activeUsers, setActiveUsers] = useState(0);
    const [reportedCount, setReportedCount] = useState(0);
    const user = getCurrentUser();
    useEffect(() => {
        if (!user) {
            navigate("/auth");
            return;
        }
        if (user.role !== "ADMIN")
            navigate("/");
        const loadData = async () => {
            const props = await getProperties();
            setAllProps(props);
            setPendingProps(props.filter(p => p.status === "PENDING"));
            setReportedCount(props.filter((p) => p.reported === true).length);
            setActiveUsers(getUsers().length);
        };
        loadData();
    }, []);
    const stats = [
        { label: "Total Properties", value: allProps.length.toString(), icon: Home, color: "text-blue-500" },
        { label: "Pending Review", value: pendingProps.length.toString(), icon: Clock, color: "text-accent" },
        { label: "Active Users", value: activeUsers.toLocaleString(), icon: Users, color: "text-green-500" },
        { label: "Reported Listings", value: reportedCount.toString(), icon: AlertCircle, color: "text-destructive" },
    ];
    const handleApprove = async (id) => {
        await updateProperty(id, { status: "APPROVED" });
        setPendingProps(prev => prev.filter(p => p.id !== id));
        toast({ title: "Property APPROVED!" });
    };
    const handleReject = async (id) => {
        await updateProperty(id, { status: "REJECTED" });
        setPendingProps(prev => prev.filter(p => p.id !== id));
        toast({ title: "Property REJECTED" });
    };
    return (<div className="min-h-screen flex flex-col"><Navbar />
      <main className="flex-1 pt-24 pb-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map(s => (<Card key={s.label}><CardContent className="p-6">
                <div className="flex items-center justify-between mb-2"><s.icon className={`w-8 h-8 ${s.color}`}/><span className="text-3xl font-bold">{s.value}</span></div>
                <p className="text-muted-foreground">{s.label}</p>
              </CardContent></Card>))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card><CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Pending Reviews</h2>
                <Badge variant="secondary">{pendingProps.length}</Badge>
              </div>
              {pendingProps.length === 0 ? <p className="text-muted-foreground text-center py-8">No pending properties</p> : (<div className="space-y-4">
                  {pendingProps.map(p => (<div key={p.id} className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div><h3 className="font-bold">{p.title}</h3><p className="text-sm text-muted-foreground">{p.location} • ${p.price.toLocaleString()}</p></div>
                        <Badge>Pending</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{p.bedrooms}bd / {p.bathrooms}ba / {p.size_sqft}sqft</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90" onClick={() => handleApprove(p.id)}><CheckCircle className="w-4 h-4 mr-1"/>Approve</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleReject(p.id)}>Reject</Button>
                      </div>
                    </div>))}
                </div>)}
            </CardContent></Card>
            <Card><CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start h-14 text-lg"><Link to="/ADMIN/properties"><Home className="w-5 h-5 mr-3"/>Manage Properties</Link></Button>
                <Button asChild variant="outline" className="w-full justify-start h-14 text-lg"><Link to="/ADMIN/users"><Users className="w-5 h-5 mr-3"/>Manage Users</Link></Button>
                <Button asChild variant="outline" className="w-full justify-start h-14 text-lg"><Link to="/ADMIN/reports"><AlertCircle className="w-5 h-5 mr-3"/>Review Reports</Link></Button>
              </div>
            </CardContent></Card>
          </div>
        </div>
      </main><Footer />
    </div>);
};
export default ADMINDashboard;
