import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import medronaImg from "@/images/medrona.jpg";
import malakImg from "@/images/malak.jpg";
import hagarImg from "@/images/hagar.jpg";
import rahmaImg from "@/images/rahma.jpg";
import mariamImg from "@/images/mariam.jpg";
import mohammedGamalImg from "@/images/mohammed_gamal.jpg";
import mohammedImg from "@/images/mohammed_ahmed.jpg";
import farahImg from "@/images/farah.jpg";
const About = () => {
    return (<div className="bg-gray-100">

      {/* ✅ Navbar */}
      <Navbar />

      {/* 🔵 Hero Section */}
      <div className="bg-primary text-white text-center py-40 rounded-b-[400px] mx-4 md:mx-8 lg:mx-16 my-12 md:my-20 lg:my-2">
        <h3 className="text-sm opacity-80">Our Story</h3>

        <h1 className="text-4xl font-bold mt-2">
          The conviction in our mission
        </h1>
        <div className="max-w-3xl mx-auto mt-6">
          <div className="bg-primary rounded-2xl p-6 shadow-lg border border-primary/70">
            <p className="text-lg leading-relaxed text-white">
              "Brickly was founded with a simple but powerful belief — finding your dream home should be effortless, transparent, and exciting." We started as a small team of real estate enthusiasts and tech innovators who were frustrated with the outdated, complicated process of buying and selling properties. So we built something better. Today, Brickly connects thousands of buyers, sellers, and investors across the country, offering a seamless platform to discover premium villas, apartments, and homes. Whether you're a first-time buyer or an experienced investor, we're here to guide you every step of the way — with smart tools, trusted listings, and a team that genuinely cares about finding the right fit for you.
            </p>
          </div>
        </div>
      </div>

      {/* 📄 Services */}
      <div className="max-w-6xl mx-auto px-6 py-16 my-6 md:my-10">

        <h2 className="text-xl font-bold text-center text-primary mb-2">
          Our Services
        </h2>

        <p className="text-center text-muted-foreground mb-16">
          Enhance your property listings and videos with accurate and engaging services
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="p-6 rounded-2xl bg-card text-foreground shadow-elegant group transition-transform hover:scale-105 hover:shadow-lg hover:bg-[hsl(222,37%,40%)] cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🏠</div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Affordable Property Listings
                </h3>
                <p className="text-sm opacity-90">
                  List your villa or property with zero hidden fees and reach thousands of serious buyers instantly.
                </p>
              </div>
            </div>
          </div>

          {[
            { icon: "🏠", title: "Smart Property Valuation", desc: "We provide accurate property valuation using AI technology to ensure you always get the best market price." },
            { icon: "⚡", title: "Fast & Customized Search", desc: "Our advanced search engine lets you filter by location, price, size, and type to find your perfect property in seconds." },
            { icon: "🛡️", title: "Protection & Security", desc: "We ensure the safety of every real estate transaction and protect your personal data with bank-level encryption." },
        ].map((service, i) => (
          <div key={i} className="p-6 rounded-2xl bg-card shadow-elegant border border-border group transition-transform hover:scale-105 hover:shadow-lg hover:bg-[hsl(222,37%,40%)] cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="text-3xl text-accent group-hover:text-foreground">{service.icon}</div>
              <div>
                <h3 className="font-semibold text-lg text-foreground group-hover:text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/90">
                  {service.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
        </div>

      </div>

      {/* 👥 Team Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 my-6 md:my-10">

        <h2 className="text-2xl font-semibold mb-12 text-center text-primary">
          Meet our team
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">

          {[
            { name: "Medrona Wael", role: "Developer", img: medronaImg },
            { name: "Malak Ahmed", role: "Developer", img: malakImg },
            { name: "Rahma Mosaad", role: "Developer", img: rahmaImg },
            { name: "Mariam Ashraf", role: "Developer", img: mariamImg },
            { name: "Hagar Hosny", role: "Developer", img: hagarImg },
            { name: "Farah Balbaa", role: "Developer", img: farahImg },
            { name: "Mohammed Gamal", role: "Developer", img: mohammedGamalImg },
            { name: "Mohammed Ahmed", role: "Developer", img: mohammedImg },
          ].map((member, index) => (
            <div key={index} className="bg-card rounded-3xl shadow-elegant overflow-hidden flex flex-col" style={{width:224, height:360}}>
              <div style={{width:224, height:224}} className="flex-shrink-0 overflow-hidden bg-gray-100">
                <img src={member.img} alt={member.name} style={{width:224, height:224, objectFit:'cover', objectPosition:'center', display:'block'}}/>
              </div>

              <div className="flex-1 bg-card pt-4 pb-4 px-4 rounded-t-[24px] text-center" style={{minHeight:110}}>
                <h3 className="font-semibold text-foreground">
                  {member.name}
                </h3>

                <p className="text-sm text-muted-foreground mb-3">
                  {member.role}
                </p>

                <div className="flex justify-center gap-3 text-muted-foreground text-sm">
                  <span>🌐</span>
                  <span>💼</span>
                  <span>🐦</span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ✅ Footer */}
      <Footer />

    </div>);
};
export default About;
