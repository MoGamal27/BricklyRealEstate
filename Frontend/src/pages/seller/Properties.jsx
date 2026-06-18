import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUser, getProperties, deleteProperty } from "@/lib/mockStorage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, MapPin, Bed, Bath, Square } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const SELLERProperties = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [properties, setProperties] = useState([]);
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
        const loadProperties = async () => {
            const allProperties = await getProperties();
            setProperties(allProperties.filter(p => p.SELLER_id === user.id));
        };
        loadProperties();
    }, []);
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this property?"))
            return;
        const success = await deleteProperty(id);
        if (success) {
            setProperties(prev => prev.filter(p => p.id !== id));
            toast({ title: "Property deleted" });
        }
        else {
            toast({ variant: "destructive", title: "Failed to delete" });
        }
    };
    const statusColor = (s) => ({ APPROVED: "bg-success text-success-foreground", PENDING: "bg-accent text-accent-foreground", REJECTED: "bg-destructive text-destructive-foreground" }[s] || "bg-secondary");
    const PropertyCard = ({ p }) => (<Card className="overflow-hidden hover:shadow-elegant transition-all">
      <div className="relative h-48">
        <img src={p.images[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"} alt={p.title} className="w-full h-full object-cover"/>
        <Badge className={`absolute top-4 right-4 ${statusColor(p.status)}`}>{p.status.charAt(0).toUpperCase() + p.status.slice(1)}</Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{p.title}</h3>
        <div className="flex items-center text-muted-foreground mb-3"><MapPin className="w-4 h-4 mr-1"/>{p.location}</div>
        <div className="text-2xl font-bold text-accent mb-3">${p.price.toLocaleString()}</div>
        <div className="flex justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1"><Bed className="w-4 h-4"/>{p.bedrooms}</div>
          <div className="flex items-center gap-1"><Bath className="w-4 h-4"/>{p.bathrooms}</div>
          <div className="flex items-center gap-1"><Square className="w-4 h-4"/>{p.size_sqft} sqft</div>
        </div>
        <Button variant="destructive" className="w-full" onClick={() => handleDelete(p.id)}><Trash2 className="w-4 h-4 mr-2"/>Delete</Button>
      </CardContent>
    </Card>);
    const grid = (filter) => {
        const list = filter ? properties.filter(p => p.status === filter) : properties;
        return list.length === 0
            ? <p className="col-span-full text-center text-muted-foreground py-12">{filter ? `No ${filter} properties` : "No properties yet. Add your first listing!"}</p>
            : list.map(p => <PropertyCard key={p.id} p={p}/>);
    };
    return (<div className="min-h-screen flex flex-col"><Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">My Properties</h1>
            <Button asChild className="bg-gradient-to-r from-accent to-accent/90"><Link to="/SELLER/add-property">Add New Property</Link></Button>
          </div>
          <Tabs defaultValue="all">
            <TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="APPROVED">APPROVED</TabsTrigger><TabsTrigger value="PENDING">PENDING</TabsTrigger><TabsTrigger value="REJECTED">REJECTED</TabsTrigger></TabsList>
            <TabsContent value="all" className="mt-6"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{grid()}</div></TabsContent>
            <TabsContent value="APPROVED" className="mt-6"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{grid("APPROVED")}</div></TabsContent>
            <TabsContent value="PENDING" className="mt-6"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{grid("PENDING")}</div></TabsContent>
            <TabsContent value="REJECTED" className="mt-6"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{grid("REJECTED")}</div></TabsContent>
          </Tabs>
        </div>
      </main><Footer />
    </div>);
};
export default SELLERProperties;
