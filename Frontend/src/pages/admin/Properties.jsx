import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle, Eye, Home, Trash2, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser, getProperties, updateProperty, deleteProperty } from "@/lib/mockStorage";
import { useToast } from "@/hooks/use-toast";

const ADMINProperties = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [properties, setProperties] = useState([]);
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (user.role !== "ADMIN") {
      navigate("/");
      return;
    }
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const allProperties = await getProperties();
    setProperties(allProperties);
  };

  const handleStatus = async (id, status) => {
    const updated = await updateProperty(id, { status });
    if (!updated) {
      toast({ variant: "destructive", title: "Could not update property" });
      return;
    }
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    toast({ title: `Property ${status.toLowerCase()}` });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this property?")) return;
    const deleted = await deleteProperty(id);
    if (!deleted) {
      toast({ variant: "destructive", title: "Could not delete property" });
      return;
    }
    setProperties((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Property deleted" });
  };

  const statusClass = (status) =>
    ({
      APPROVED: "bg-success text-success-foreground",
      PENDING: "bg-accent text-accent-foreground",
      REJECTED: "bg-destructive text-destructive-foreground",
    }[status] || "bg-secondary text-secondary-foreground");

  const renderGrid = (status) => {
    const list = status ? properties.filter((p) => p.status === status) : properties;

    if (list.length === 0) {
      return (
        <p className="col-span-full text-center text-muted-foreground py-12">
          {status ? `No ${status.toLowerCase()} properties` : "No properties found"}
        </p>
      );
    }

    return list.map((property) => (
      <Card key={property.id} className="overflow-hidden">
        <div className="relative h-48">
          <img
            src={property.images?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"}
            alt={property.title}
            className="h-full w-full object-cover"
          />
          <Badge className={`absolute right-4 top-4 ${statusClass(property.status)}`}>{property.status || "UNKNOWN"}</Badge>
          {property.reported && (
            <Badge variant="destructive" className="absolute left-4 top-4">
              <AlertCircle className="mr-1 h-3 w-3" />
              Reported
            </Badge>
          )}
        </div>
        <CardContent className="p-5">
          <div className="mb-4">
            <h3 className="text-lg font-bold">{property.title}</h3>
            <p className="text-sm text-muted-foreground">{property.location}</p>
            <p className="mt-2 font-semibold text-accent">${Number(property.price || 0).toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to={`/property/${property.id}`}>
                <Eye className="mr-1 h-4 w-4" />
                View
              </Link>
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleStatus(property.id, "APPROVED")}>
              <CheckCircle className="mr-1 h-4 w-4" />
              Approve
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleStatus(property.id, "REJECTED")}>
              <XCircle className="mr-1 h-4 w-4" />
              Reject
            </Button>
            <Button size="sm" variant="destructive" onClick={() => handleDelete(property.id)}>
              <Trash2 className="mr-1 h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold">Manage Properties</h1>
              <p className="text-muted-foreground">Review, approve, reject, or remove listings.</p>
            </div>
            <Button variant="outline" onClick={() => navigate("/ADMIN/dashboard")}>
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </div>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="PENDING">Pending</TabsTrigger>
              <TabsTrigger value="APPROVED">Approved</TabsTrigger>
              <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{renderGrid()}</TabsContent>
            <TabsContent value="PENDING" className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{renderGrid("PENDING")}</TabsContent>
            <TabsContent value="APPROVED" className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{renderGrid("APPROVED")}</TabsContent>
            <TabsContent value="REJECTED" className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{renderGrid("REJECTED")}</TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ADMINProperties;
