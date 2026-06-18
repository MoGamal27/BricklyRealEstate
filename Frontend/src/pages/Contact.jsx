import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const Contact = () => {
    return (<div className="bg-background text-foreground">
      
      <Navbar />

      {/* Hero */}
      <div className="relative h-[250px] flex items-center justify-center text-white">
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" className="absolute w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative text-center">
          <h1 className="text-3xl font-bold text-accent">Contact Us</h1>
          <p className="text-sm mt-2">Home / Contact Us</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">

        {/* Left (Form) */}
        <div className="space-y-4">

          <input type="text" placeholder="Full Name" className="w-full p-3 rounded-lg border border-border bg-card"/>

          <input type="email" placeholder="Email Address" className="w-full p-3 rounded-lg border border-border bg-card"/>

          <input type="text" placeholder="Subject" className="w-full p-3 rounded-lg border border-border bg-card"/>

          <textarea placeholder="Message" className="w-full p-3 h-[120px] rounded-lg border border-border bg-card"></textarea>

          <button className="px-6 py-3 rounded-lg text-white" style={{ background: "var(--gradient-accent)" }}>
            Send Message
          </button>

        </div>

        {/* Right (Info) */}
        <div>

          <h3 className="text-accent font-semibold mb-2">Contact Us</h3>

          <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>

          <p className="text-muted-foreground mb-6">
            Have a question about a listing, need help with your account, or want to partner with Brickly? Our support team is here to help — reach out and we’ll get back to you within one business day.
          </p>

          <div className="space-y-4 text-sm">

            <p>📞 Call Us: +20 112 345 6789</p>
            <p>📧 Email: contact@brickly.com</p>
            <p>🌐 Website: www.brickly.com.eg</p>
            <p>📍 Address: 7 Mahmoud Bassiony St, Nasr City, Cairo, Egypt</p>

          </div>

          {/* Social */}
          <div className="flex gap-3 mt-6 text-xl text-accent">
            <span>🌐</span>
            <span>💼</span>
            <span>🐦</span>
          </div>

        </div>

      </div>

      <Footer />
    </div>);
};
export default Contact;
