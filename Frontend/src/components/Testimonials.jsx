import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
const testimonials = [
    {
      name: "Sarah Ebrahim",
      role: "First-time Buyer",
      content: "Brickly's AI pricing helped me find my dream home within budget. The process was seamless and the recommendations were spot-on!",
      rating: 5,
      avatar: "SJ",
    },
    {
        name: "Michael Adel",
        role: "Property Seller",
        content: "Listed my property and got serious buyers within days. The platform's smart matching system is incredible.",
        rating: 5,
        avatar: "MC",
    },
    {
        name: "Doaa Elsayed",
        role: "Real Estate Investor",
        content: "The map-based search and AI insights make property hunting so much easier. I've found multiple investment opportunities here.",
        rating: 5,
        avatar: "ER",
    },
];
const Testimonials = () => {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting)
            setVisible(true); }, { threshold: 0.1 });
        if (sectionRef.current)
            observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);
    return (<section ref={sectionRef} className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of happy homeowners and sellers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (<div key={index} className="testimonial-card" style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
                transition: `opacity 0.7s ease ${0.15 + index * 0.15}s, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.15 + index * 0.15}s`,
            }}>
              <Card className="h-full hover:shadow-elegant transition-all duration-300 group cursor-default">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-accent text-accent" style={{ animationDelay: `${i * 0.1}s` }}/>))}
                  </div>

                  <p className="text-base leading-relaxed text-foreground/75 italic">
                    "{testimonial.content}"
                  </p>

                  <div className="mt-6 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent to-transparent transition-all duration-500 rounded-full"/>
                </CardContent>
              </Card>
            </div>))}
        </div>

        <div className="text-center mt-12">
          <Link to="/reviews" className="inline-block px-8 py-3 rounded-xl font-semibold text-white shadow-accent transition hover:scale-105" style={{ background: "var(--gradient-accent)" }}>
            View All Reviews
          </Link>
        </div>

      </div>
    </section>);
};
export default Testimonials;
