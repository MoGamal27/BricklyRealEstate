import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle, Eye, Home, Trash2, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser, getProperties, updateProperty, deleteProperty } from "@/lib/mockStorage";
import { useToast } from "@/hooks/use-toast";

const ADMINReports = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reports, setReports] = useState([]);
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
    loadReports();
  }, []);

  const loadReports = async () => {
    const allProperties = await getProperties();
    setReports(allProperties.filter((property) => property.reported === true));
  };

  const handleClear = async (id) => {
    const updated = await updateProperty(id, { reported: false });
    if (!updated) {
      toast({ variant: "destructive", title: "Could not clear report" });
      return;
    }
    setReports((prev) => prev.filter((property) => property.id !== id));
    toast({ title: "Report cleared" });
  };

  const handleReject = async (id) => {
    const updated = await updateProperty(id, { status: "REJECTED", reported: false });
    if (!updated) {
      toast({ variant: "destructive", title: "Could not reject listing" });
      return;
    }
    setReports((prev) => prev.filter((property) => property.id !== id));
    toast({ title: "Listing rejected" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this reported property?")) return;
    const deleted = await deleteProperty(id);
    if (!deleted) {
      toast({ variant: "destructive", title: "Could not delete listing" });
      return;
    }
    setReports((prev) => prev.filter((property) => property.id !== id));
    toast({ title: "Reported listing deleted" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold">Review Reports</h1>
              <p className="text-muted-foreground">Handle properties that users have flagged.</p>
            </div>
            <Button variant="outline" onClick={() => navigate("/ADMIN/dashboard")}>
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </div>

          {reports.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle className="mb-4 h-12 w-12 text-success" />
                <h2 className="text-2xl font-bold">No active reports</h2>
                <p className="mt-2 text-muted-foreground">Reported listings will appear here when they need review.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reports.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={property.images?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"}
                      alt={property.title}
                      className="h-full w-full object-cover"
                    />
                    <Badge variant="destructive" className="absolute left-4 top-4">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Reported
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold">{property.title}</h3>
                    <p className="text-sm text-muted-foreground">{property.location}</p>
                    <p className="mt-2 text-sm">Status: <span className="font-medium">{property.status || "UNKNOWN"}</span></p>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/property/${property.id}`}>
                          <Eye className="mr-1 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleClear(property.id)}>
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Clear
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleReject(property.id)}>
                        <XCircle className="mr-1 h-4 w-4" />
                        Reject
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(property.id)}>
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
                      </Button>
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

export default ADMINReports;
