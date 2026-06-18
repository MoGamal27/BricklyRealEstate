import { Menu, X, Heart, MessageCircle, Calendar, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "@/lib/mockStorage";
import { useToast } from "@/hooks/use-toast";
import { BricklyLogo } from "@/components/BricklyLogo";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { toast } = useToast();
    useEffect(() => {
        setUser(getCurrentUser());
    }, []);
    const handleLogout = () => {
        logout();
        setUser(null);
        toast({ title: "Signed out successfully" });
        navigate("/");
        setIsOpen(false);
    };
    return (<nav className="fixed top-0 left-0 right-0 z-[9999] bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <BricklyLogo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/search" className="text-foreground/80 hover:text-foreground transition-colors">Search</Link>
            {user && (<>
                <Link to="/profile" className="text-foreground/80 hover:text-foreground transition-colors">Profile</Link>
                <Link to="/wishlist" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"><Heart className="w-4 h-4"/> Wishlist</Link>
                <Link to="/chat" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"><MessageCircle className="w-4 h-4"/> Chat</Link>
                <Link to="/bookings" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"><Calendar className="w-4 h-4"/> Bookings</Link>
                {user.role === "SELLER" && <Link to="/SELLER/dashboard" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"><Settings className="w-4 h-4"/> Seller</Link>}
                {user.role === "ADMIN" && <Link to="/ADMIN/dashboard" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"><Settings className="w-4 h-4"/> Admin</Link>}
              </>)}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (<div className="flex items-center gap-3">
                <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Hi, {user.full_name.split(" ")[0]}</Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-1"/> Sign Out
                </Button>
              </div>) : (<>
                <Link to="/auth" className="text-foreground/80 hover:text-foreground transition-colors">Sign In</Link>
                <Button asChild className="bg-gradient-to-r from-accent to-accent/90 hover:shadow-accent">
                  <Link to="/auth?mode=signup">Get Started</Link>
                </Button>
              </>)}
          </div>

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (<div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <Link to="/search" className="text-foreground/80" onClick={() => setIsOpen(false)}>Search Properties</Link>
            {user && (<>
                <Link to="/profile" className="text-foreground/80" onClick={() => setIsOpen(false)}>Profile</Link>
                <Link to="/wishlist" className="text-foreground/80" onClick={() => setIsOpen(false)}>Wishlist</Link>
                <Link to="/chat" className="text-foreground/80" onClick={() => setIsOpen(false)}>Chat</Link>
                <Link to="/bookings" className="text-foreground/80" onClick={() => setIsOpen(false)}>Bookings</Link>
                {user.role === "SELLER" && <Link to="/SELLER/dashboard" className="text-foreground/80" onClick={() => setIsOpen(false)}>Seller Dashboard</Link>}
                {user.role === "ADMIN" && <Link to="/ADMIN/dashboard" className="text-foreground/80" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>}
                <Button variant="outline" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2"/> Sign Out</Button>
              </>)}
            {!user && (<>
                <Link to="/auth" className="text-foreground/80" onClick={() => setIsOpen(false)}>Sign In</Link>
                <Button asChild className="bg-gradient-to-r from-accent to-accent/90">
                  <Link to="/auth?mode=signup" onClick={() => setIsOpen(false)}>Get Started</Link>
                </Button>
              </>)}
          </div>)}
      </div>
    </nav>);
};
export default Navbar;
