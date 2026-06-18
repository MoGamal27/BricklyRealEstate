import { Link } from "react-router-dom";
import { BricklyLogo } from "@/components/BricklyLogo";
const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="mb-4 inline-block">
              <BricklyLogo isDark size={32} />
            </Link>
            <p className="text-primary-foreground/80">
              Find your perfect home with AI-powered insights and seamless booking.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">For Buyers</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link to="/search" className="hover:text-primary-foreground">Search Properties</Link></li>
              <li><Link to="/wishlist" className="hover:text-primary-foreground">My Wishlist</Link></li>
              <li><Link to="/bookings" className="hover:text-primary-foreground">My Bookings</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">For Sellers</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link to="/seller/dashboard" className="hover:text-primary-foreground">List Property</Link></li>
              <li><Link to="/seller/properties" className="hover:text-primary-foreground">My Listings</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link to="/about" className="hover:text-primary-foreground">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-foreground">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/80">
          <p>{'©'} 2026 Brickly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
