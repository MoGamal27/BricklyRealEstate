import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const allReviews = [
    {
        name: "Ahmed Hassan",
        text: "The team helped me find a great apartment in Nasr City quickly.",
        rating: 5,
        date: "Oct 20, 2023",
    },
    {
        name: "Aya Mohamed",
        text: "Excellent service and fast support throughout the buying process.",
        rating: 4,
        date: "Sep 04, 2022",
    },
    {
        name: "Youssef Adel",
        text: "Very easy to use platform, and the listings are accurate.",
        rating: 5,
        date: "Mar 26, 2022",
    },
    {
        name: "Sara Naguib",
        text: "Helpful team, but I would like even more neighborhood details.",
        rating: 3,
        date: "Jan 10, 2023",
    },
    {
        name: "Farida Morsi",
        text: "Great experience finding a new home in Maadi.",
        rating: 5,
        date: "Feb 11, 2024",
    },
    {
        name: "Omar Mostafa",
        text: "Very clear process and friendly support from the platform.",
        rating: 4,
        date: "Jul 02, 2023",
    },
];
const Reviews = () => {
    const [visible, setVisible] = useState(3);
    const [animateBars, setAnimateBars] = useState(false);
    const [reviews, setReviews] = useState(allReviews);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(5);
    const [submitted, setSubmitted] = useState(false);
    const REVIEWS_STORAGE_KEY = "brickly_reviews";
    useEffect(() => {
        const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
        if (stored) {
            try {
                const savedReviews = JSON.parse(stored);
                if (Array.isArray(savedReviews) && savedReviews.length > 0) {
                    setReviews([...savedReviews, ...allReviews]);
                    return;
                }
            }
            catch (_err) {
                // ignore malformed storage
            }
        }
        setReviews(allReviews);
    }, []);
    const saveReviews = (userReviews) => {
        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(userReviews));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !reviewText)
            return;
        const newReview = {
            name,
            text: reviewText,
            rating,
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        };
        const userReviews = [newReview, ...(reviews.filter((review) => !allReviews.includes(review)))];
        setReviews([newReview, ...reviews]);
        saveReviews(userReviews);
        setSubmitted(true);
        setName("");
        setEmail("");
        setReviewText("");
        setRating(5);
        setVisible((prev) => Math.max(prev, 3));
        setTimeout(() => setSubmitted(false), 3000);
    };
    // ✅ smooth + fast start animation
    useEffect(() => {
        const raf = requestAnimationFrame(() => {
            setAnimateBars(true);
        });
        return () => cancelAnimationFrame(raf);
    }, []);
    return (<div className="bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <div className="bg-primary text-white text-center py-24">
        <h1 className="text-4xl font-bold">Customer Feedback</h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* ================= Stats ================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">

          {/* 🔹 Rating Breakdown */}
          <div className="w-full md:w-1/3">
            <h3 className="text-base font-semibold mb-3">
              Customer Feedback
            </h3>

            {[5, 4, 3, 2, 1].map((star, i) => {
            const width = 90 - i * 20;
            return (<div key={i} className="flex items-center gap-2 mb-2 text-sm">
                  <span className="w-5">{star}★</span>

                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{
                    width: animateBars ? `${width}%` : "0%",
                    transition: `width 3s ease-in-out`,
                    transitionDelay: `${i * 0.2}s`,
                }}/>
                  </div>

                  <span className="text-xs text-muted-foreground w-8">
                    {width}%
                  </span>
                </div>);
        })}
          </div>

          {/* 🔹 Total Reviews */}
          <div className="text-center">
            <h3 className="text-lg font-semibold">Total Reviews</h3>
            <p className="text-muted-foreground">5K+ Reviews</p>
          </div>

          {/* 🔹 Average Rating */}
          <div className="text-center">
            <h3 className="text-lg font-semibold">Average Rating</h3>

            <div className="flex items-center justify-center gap-1 mt-1">
              <span>4.5</span>

              {[...Array(5)].map((_, i) => (<span key={i} className="text-accent text-sm transition-all duration-500" style={{ transitionDelay: `${i * 0.1}s` }}>
                  ★
                </span>))}
            </div>
          </div>
        </div>

        {/* ================= Reviews List ================= */}
        <div className="space-y-6">
          {reviews.slice(0, visible).map((review, i) => (<div key={i} className="p-6 rounded-xl bg-card shadow-elegant border border-border">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{review.name}</h4>

                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-accent text-accent"/>))}
                </div>
              </div>

              <p className="text-muted-foreground mb-3">
                {review.text}
              </p>

              <span className="text-sm text-muted-foreground">
                {review.date}
              </span>
            </div>))}
        </div>

        {/* ================= Load More ================= */}
        {visible < allReviews.length && (<div className="text-center mt-8">
            <button onClick={() => setVisible(visible + 3)} className="px-6 py-3 rounded-xl text-white font-semibold shadow-accent hover:scale-105 transition" style={{ background: "var(--gradient-accent)" }}>
              Load More
            </button>
          </div>)}

        {/* ================= Submit Review ================= */}
        <div className="mt-16 bg-card p-8 rounded-xl shadow-elegant border border-border">
          <h3 className="text-xl font-semibold mb-6">
            Submit Your Review
          </h3>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input placeholder="Your Name" className="p-3 border rounded-lg bg-background" value={name} onChange={(e) => setName(e.target.value)}/>

            <input placeholder="Email" type="email" className="p-3 border rounded-lg bg-background" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (<button key={star} type="button" onClick={() => setRating(star)} className="text-2xl transition-transform hover:scale-110">
                  <Star className={`w-6 h-6 ${star <= rating ? "fill-accent text-accent" : "text-muted-foreground"}`}/>
                </button>))}
            </div>
          </div>

          <textarea placeholder="Write your review..." className="w-full p-3 border rounded-lg mb-4 bg-background" value={reviewText} onChange={(e) => setReviewText(e.target.value)}/>

          <button onClick={handleSubmit} className="px-6 py-3 rounded-xl text-white font-semibold shadow-accent" style={{ background: "var(--gradient-accent)" }}>
            {submitted ? "Thank you for your feedback!" : "Leave Feedback"}
          </button>
        </div>

      </div>

      <Footer />
    </div>);
};
export default Reviews;
