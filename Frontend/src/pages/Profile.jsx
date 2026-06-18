import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getBookings, getCurrentUser, getProperties, getUsers, getWishlist } from "@/lib/mockStorage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Heart, Home, ShieldCheck } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState({
    bookings: 0,
    wishlist: 0,
    listings: 0,
    pending: 0,
    users: 0,
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/auth");
      return;
    }
    setUser(currentUser);

    const loadProfileSummary = async () => {
      if (currentUser.role === "BUYER") {
        const bookings = await getBookings(currentUser.id);
        const wishlist = await getWishlist(currentUser.id);
        setSummary(prev => ({ ...prev, bookings: bookings.length, wishlist: wishlist.length }));
      }

      if (currentUser.role === "SELLER") {
        const properties = await getProperties();
        const myProperties = properties.filter((p) => p.SELLER_id === currentUser.id);
        setSummary(prev => ({ ...prev, listings: myProperties.length, pending: myProperties.filter((p) => p.status === "PENDING").length }));
      }

      if (currentUser.role === "ADMIN") {
        const properties = await getProperties();
        const users = getUsers();
        setSummary(prev => ({ ...prev, listings: properties.length, pending: properties.filter((p) => p.status === "PENDING").length, users: users.length }));
      }
    };

    loadProfileSummary();
  }, [navigate]);

  if (!user)
    return null;

  const roleLabel = user.role.toLowerCase();
  const actionLabel = user.role === "SELLER" ? "Go to Seller Dashboard" : user.role === "ADMIN" ? "Go to Admin Dashboard" : "Browse Properties";
  const actionLink = user.role === "SELLER" ? "/SELLER/dashboard" : user.role === "ADMIN" ? "/ADMIN/dashboard" : "/search";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <Card className="overflow-hidden">
              <CardHeader className="p-8">
                <CardTitle className="text-4xl">Your Profile</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  Manage your Brickly profile, see your role-specific activity, and access your dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div className="rounded-3xl border border-border bg-background/70 p-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-muted-foreground">Name</span>
                      <p className="text-xl font-semibold">{user.full_name}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-muted-foreground">Email</span>
                      <p className="text-base">{user.email}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-muted-foreground">Role</span>
                      <Badge>{roleLabel}</Badge>
                    </div>
                    <div className="rounded-2xl border border-border bg-secondary p-4">
                      <p className="text-sm text-muted-foreground">Member ID</p>
                      <p className="font-medium">{user.id}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="space-y-4 p-6">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Role Insights</p>
                          <h2 className="text-2xl font-semibold">{user.role === "BUYER" ? "Buyer" : user.role === "SELLER" ? "Seller" : "Admin"}</h2>
                        </div>
                        <div className="rounded-full bg-accent/10 p-3 text-accent">
                          {user.role === "BUYER" ? <Heart className="h-5 w-5"/> : user.role === "SELLER" ? <Home className="h-5 w-5"/> : <ShieldCheck className="h-5 w-5"/>}
                        </div>
                      </div>
                      <div className="grid gap-3">
                        {user.role === "BUYER" && (<>
                          <div className="flex items-center justify-between">
                            <span>Saved properties</span>
                            <strong>{summary.wishlist}</strong>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Upcoming bookings</span>
                            <strong>{summary.bookings}</strong>
                          </div>
                        </>)}
                        {user.role === "SELLER" && (<>
                          <div className="flex items-center justify-between">
                            <span>Active listings</span>
                            <strong>{summary.listings}</strong>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Pending approvals</span>
                            <strong>{summary.pending}</strong>
                          </div>
                        </>)}
                        {user.role === "ADMIN" && (<>
                          <div className="flex items-center justify-between">
                            <span>Registered users</span>
                            <strong>{summary.users}</strong>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Pending properties</span>
                            <strong>{summary.pending}</strong>
                          </div>
                        </>)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="space-y-4 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Quick actions</p>
                          <h2 className="text-2xl font-semibold">Next step</h2>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Button asChild className="w-full bg-gradient-to-r from-accent to-accent/90">
                          <Link to={actionLink}>{actionLabel}</Link>
                        </Button>
                        {user.role === "BUYER" && (<Button asChild variant="outline" className="w-full">
                          <Link to="/wishlist">View Wishlist</Link>
                        </Button>)}
                        {user.role === "SELLER" && (<Button asChild variant="outline" className="w-full">
                          <Link to="/SELLER/properties">My Listings</Link>
                        </Button>)}
                        {user.role === "ADMIN" && (<Button asChild variant="outline" className="w-full">
                          <Link to="/ADMIN/dashboard">Admin Panel</Link>
                        </Button>)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="p-8">
                <CardTitle>Account activity</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  Quickly jump to what matters most for your role.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-8">
                <div className="rounded-3xl border border-border bg-background/70 p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">Profile last viewed</span>
                      <strong>Just now</strong>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">Role badge</span>
                      <Badge>{roleLabel}</Badge>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-border bg-background/70 p-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-5 w-5"/>
                    <span>Keep your account details safe and update your login information regularly.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
