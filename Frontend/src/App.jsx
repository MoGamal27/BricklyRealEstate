import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Search from "./pages/Search";
import PropertyDetails from "./pages/PropertyDetails";
import Wishlist from "./pages/Wishlist";
import Chat from "./pages/Chat";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import SELLERDashboard from "./pages/seller/Dashboard";
import AddProperty from "./pages/seller/AddProperty";
import SELLERProperties from "./pages/seller/Properties";
import SELLERBookings from "./pages/seller/Bookings";
import ADMINDashboard from "./pages/admin/Dashboard";
import ADMINProperties from "./pages/admin/Properties";
import ADMINUsers from "./pages/admin/Users";
import ADMINReports from "./pages/admin/Reports";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Reviews from "./pages/Reviews";
import Profile from './pages/Profile';

const queryClient = new QueryClient();

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App = () => (<QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />}/>
          <Route path="/auth" element={<Auth />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/property/:id" element={<PropertyDetails />}/>
          <Route path="/wishlist" element={<Wishlist />}/>
          <Route path="/chat" element={<Chat />}/>
          <Route path="/booking" element={<Booking />}/>
          <Route path="/bookings" element={<Bookings />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/privacy" element={<Privacy />}/>
          <Route path="/reviews" element={<Reviews />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/SELLER/dashboard" element={<SELLERDashboard />}/>
          <Route path="/SELLER/add-property" element={<AddProperty />}/>
          <Route path="/SELLER/properties" element={<SELLERProperties />}/>
          <Route path="/SELLER/bookings" element={<SELLERBookings />}/>
          <Route path="/ADMIN/dashboard" element={<ADMINDashboard />}/>
          <Route path="/ADMIN/properties" element={<ADMINProperties />}/>
          <Route path="/ADMIN/users" element={<ADMINUsers />}/>
          <Route path="/ADMIN/reports" element={<ADMINReports />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>);
export default App;
