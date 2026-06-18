import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
const CityScene = () => {
    return (<div className="city-scene-wrapper">
      <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" className="city-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="buildingGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a5f"/>
            <stop offset="100%" stopColor="#2d5a8e"/>
          </linearGradient>
          <linearGradient id="buildingGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#162c4a"/>
            <stop offset="100%" stopColor="#1e3a5f"/>
          </linearGradient>
          <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8622a"/>
            <stop offset="100%" stopColor="#f0874d"/>
          </linearGradient>
          <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d1b2e"/>
            <stop offset="100%" stopColor="#080f1a"/>
          </linearGradient>
          <linearGradient id="windowGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd97d" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#ffa94d" stopOpacity="0.5"/>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Stars */}
        {[56, 120, 190, 280, 370, 440, 520, 610, 700, 790, 850, 30, 160, 250, 410, 580, 670, 760, 870, 90].map((cx, i) => (<circle key={i} cx={cx} cy={[40, 90, 60, 30, 80, 50, 70, 35, 55, 75, 45, 100, 85, 65, 25, 95, 40, 60, 30, 110][i]} r={i % 3 === 0 ? 1.5 : 0.8} fill="white" opacity={0.3 + (i % 5) * 0.08} className={`star star-${i % 3}`}/>))}

        {/* Background buildings */}
        <g opacity="0.35">
          <rect x="0" y="300" width="60" height="200" fill="#0d1e33"/>
          <rect x="55" y="265" width="50" height="235" fill="#0f2038"/>
          <rect x="800" y="295" width="55" height="205" fill="#0d1e33"/>
          <rect x="848" y="315" width="52" height="185" fill="#0f2038"/>
        </g>

        {/* Building 1 - Left tall */}
        <g className="building building-1">
          <rect x="40" y="150" width="100" height="350" fill="url(#buildingGrad1)"/>
          <polygon points="140,150 165,130 165,500 140,500" fill="#162c4a"/>
          <polygon points="40,150 140,150 165,130 65,130" fill="#2d5a8e"/>
          <rect x="85" y="100" width="14" height="55" fill="#e8622a" className="spire-glow"/>
          <polygon points="85,100 99,100 92,72" fill="#f0874d"/>
          {[0, 1, 2, 3, 4, 5, 6, 7].map(row => [0, 1, 2].map(col => (<rect key={`b1-${row}-${col}`} x={52 + col * 28} y={170 + row * 35} width="16" height="22" fill="url(#windowGlow)" opacity={(row + col) % 3 === 0 ? 0.1 : 0.75} className={`window w-flicker-${(row + col) % 4}`}/>)))}
          <rect x="40" y="148" width="100" height="3" fill="url(#accentGrad)" filter="url(#glow)"/>
        </g>

        {/* Building 2 - Center-left */}
        <g className="building building-2">
          <rect x="170" y="225" width="130" height="275" fill="url(#buildingGrad2)"/>
          <polygon points="300,225 325,205 325,500 300,500" fill="#111e30"/>
          <polygon points="170,225 300,225 325,205 195,205" fill="#1e3a5f"/>
          {[0, 1, 2, 3, 4, 5].map(row => [0, 1, 2, 3].map(col => (<rect key={`b2-${row}-${col}`} x={182 + col * 28} y={240 + row * 38} width="18" height="24" fill="url(#windowGlow)" opacity={(row * col) % 4 === 0 ? 0.05 : 0.7} className={`window w-flicker-${(row + col + 1) % 4}`}/>)))}
          <rect x="170" y="223" width="130" height="3" fill="url(#accentGrad)" filter="url(#glow)" opacity="0.7"/>
        </g>

        {/* Building 3 - CENTER HERO TALLEST */}
        <g className="building building-3">
          <rect x="340" y="80" width="160" height="420" fill="#1e3a5f"/>
          <polygon points="500,80 540,55 540,500 500,500" fill="#162c4a"/>
          <polygon points="340,80 500,80 540,55 380,55" fill="#2d5a8e"/>
          {[0, 1, 2, 3, 4].map(col => (<rect key={`facade-${col}`} x={344 + col * 30} y="85" width="26" height="415" fill="white" opacity="0.018"/>))}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(row => [0, 1, 2, 3, 4].map(col => (<rect key={`b3-${row}-${col}`} x={352 + col * 28} y={100 + row * 38} width="20" height="26" fill="url(#windowGlow)" opacity={(row + col) % 5 === 0 ? 0.05 : 0.72} className={`window w-flicker-${(row * col) % 4}`}/>)))}
          <rect x="415" y="30" width="8" height="55" fill="#e8622a" filter="url(#strongGlow)"/>
          <circle cx="419" cy="28" r="5" fill="#ff6b35" filter="url(#strongGlow)" className="beacon"/>
          <rect x="340" y="78" width="160" height="4" fill="url(#accentGrad)" filter="url(#strongGlow)"/>
          <rect x="340" y="200" width="160" height="2" fill="url(#accentGrad)" opacity="0.35"/>
          <rect x="340" y="340" width="160" height="2" fill="url(#accentGrad)" opacity="0.25"/>
          <rect x="320" y="492" width="200" height="12" fill="url(#accentGrad)" opacity="0.12" filter="url(#glow)"/>
        </g>

        {/* Building 4 - Right */}
        <g className="building building-4">
          <rect x="570" y="190" width="120" height="310" fill="url(#buildingGrad1)"/>
          <polygon points="690,190 715,170 715,500 690,500" fill="#162c4a"/>
          <polygon points="570,190 690,190 715,170 595,170" fill="#2d5a8e"/>
          {[0, 1, 2, 3, 4, 5, 6].map(row => [0, 1, 2].map(col => (<rect key={`b4-${row}-${col}`} x={582 + col * 34} y={208 + row * 38} width="22" height="26" fill="url(#windowGlow)" opacity={(row + col) % 4 === 0 ? 0.05 : 0.68} className={`window w-flicker-${(row + col + 2) % 4}`}/>)))}
          <rect x="570" y="188" width="120" height="3" fill="url(#accentGrad)" filter="url(#glow)" opacity="0.8"/>
        </g>

        {/* Building 5 - Far right */}
        <g className="building building-5">
          <rect x="730" y="245" width="110" height="255" fill="url(#buildingGrad2)"/>
          <polygon points="840,245 862,228 862,500 840,500" fill="#111e30"/>
          <polygon points="730,245 840,245 862,228 752,228" fill="#1e3a5f"/>
          {[0, 1, 2, 3, 4, 5].map(row => [0, 1, 2].map(col => (<rect key={`b5-${row}-${col}`} x={742 + col * 30} y={262 + row * 38} width="18" height="24" fill="url(#windowGlow)" opacity={(row * col) % 3 === 0 ? 0.08 : 0.62} className={`window w-flicker-${(row + col + 3) % 4}`}/>)))}
          <rect x="730" y="243" width="110" height="3" fill="url(#accentGrad)" filter="url(#glow)" opacity="0.6"/>
        </g>

        {/* Ground */}
        <rect x="0" y="498" width="900" height="102" fill="url(#groundGrad)"/>
        <rect x="0" y="512" width="900" height="38" fill="#0a1220"/>
        <line x1="0" y1="531" x2="900" y2="531" stroke="#e8622a" strokeWidth="1" strokeDasharray="28,18" opacity="0.25" className="road-line"/>

        {/* Street lamps */}
        <line x1="200" y1="480" x2="200" y2="500" stroke="#e8622a" strokeWidth="2"/>
        <circle cx="200" cy="477" r="5" fill="#ffd97d" filter="url(#glow)" opacity="0.75" className="lamp"/>
        <line x1="680" y1="480" x2="680" y2="500" stroke="#e8622a" strokeWidth="2"/>
        <circle cx="680" cy="477" r="5" fill="#ffd97d" filter="url(#glow)" opacity="0.75" className="lamp"/>

        {/* Particles */}
        {[100, 185, 270, 360, 450, 530, 615, 700, 790, 870].map((cx, i) => (<circle key={`p-${i}`} cx={cx} cy={190 + (i % 4) * 60} r="1.5" fill="#e8622a" opacity="0.35" className={`particle particle-${i % 3}`}/>))}

        {/* Atmospheric haze */}
        <rect x="0" y="380" width="900" height="120" fill="#060b15" opacity="0.12"/>
      </svg>
    </div>);
};
const Hero = () => {
    const [scrollY, setScrollY] = useState(0);
    const heroRef = useRef(null);
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (<section ref={heroRef} className="hero-section relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-hero-bg"/>
      <div className="absolute inset-0 hero-grid"/>

      <div className="absolute right-0 bottom-0 w-full md:w-3/5 h-full flex items-end" style={{ transform: `translateY(${scrollY * 0.15}px)` }}>
        <CityScene />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#060b15] via-[#060b15]/85 to-transparent"/>
      <div className="absolute inset-0 bg-gradient-to-t from-[#060b15] via-transparent to-[#060b15]/50"/>

      <div className="container relative z-10 mx-auto px-4 py-32">
        <div className="max-w-2xl">
          <div className="hero-badge inline-flex items-center gap-2 mb-8">
            <span className="badge-dot"/>
            <span className="text-sm font-medium tracking-widest uppercase text-[#e8622a]">
              AI-Powered Real Estate
            </span>
          </div>

          <h1 className="hero-title text-5xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
            Find Your{" "}
            <span className="hero-highlight block">Perfect</span>
            <span className="text-white/90">Home</span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 mb-12 leading-relaxed max-w-lg hero-subtitle">
            Discover properties with intelligent pricing, interactive maps, and seamless booking.
          </p>

          <div className="hero-search-card p-1.5 rounded-2xl mb-8">
            <div className="flex flex-col md:flex-row gap-2">
              <Input type="text" placeholder="Enter location, city, or neighborhood..." className="flex-1 h-13 text-base bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-[#e8622a]/50"/>
              <Button asChild className="h-13 px-8 text-base font-semibold rounded-xl search-btn">
                <Link to="/search">
                  <Search className="w-4 h-4 mr-2"/>
                  Search
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 hero-ctas">
            <Button asChild variant="outline" size="lg" className="text-base border-white/15 text-white/75 text-[#1e3a5f] hover:bg-white/5 hover:border-white/30 rounded-xl">
              <Link to="/search">Browse Properties</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base border-white/15 text-white/75 text-[#1e3a5f] hover:bg-white/5 hover:border-white/30 rounded-xl">
             <Link to="/seller/dashboard">List Your Property</Link>
            </Button>
          </div>

          <div className="flex gap-8 mt-16 hero-stats">
            {[{ value: "12K+", label: "Properties" }, { value: "98%", label: "Satisfaction" }, { value: "50+", label: "Cities" }].map(stat => (<div key={stat.label} className="stat-item">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-white/35 uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"/>
    </section>);
};
export default Hero;
