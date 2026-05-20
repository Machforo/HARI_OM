import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Vikram Malhotra",
    location: "Bangalore",
    text: "The Special Darshan at Tirupati was handled with such precision. My parents could pray peacefully without the stress of the crowds. Truly a blessing.",
    rating: 5,
    avatar: "https://static.vecteezy.com/system/resources/thumbnails/049/329/467/small/attractive-happy-north-indian-young-man-in-traditional-dress-with-isolated-on-transparent-background-cut-out-free-png.png"
  },
  {
    id: 2,
    name: "Rajesh Iyer",
    location: "Chennai",
    text: "Ordered Mahaprasad from Puri Jagannath. It arrived beautifully packed and tasted divine. Bringing the shrine to our home was a special moment for my family.",
    rating: 5,
    avatar: "https://plus.unsplash.com/premium_photo-1682089787056-9ac0c78a2ac2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwcGVvcGxlfGVufDB8fDB8fHww"
  },
  {
    id: 3,
    name: "Amitabh Sharma",
    location: "Jaipur",
    text: "The guided tour of Kashi Vishwanath was informative and spiritual. Our guide knew every detail of the history. Vandan Darshan made it effortless.",
    rating: 5,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ72FBQLR2bgffyuceXXqdOtWHIANdQbFt4mA&s"
  },
  {
    id: 4,
    name: "Sanjay Deshmukh",
    location: "Pune",
    text: "Booked a complete Yatra for my family. The logistics, from pickup to the holy ritual, were flawless. Highly recommend their professional service.",
    rating: 5,
    avatar: "https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/content9670.jpg"
  },
  {
    id: 5,
    name: "Karthik Reddy",
    location: "Hyderabad",
    text: "The Online Chadhava service is a godsend for those who cannot travel. Witnessing the offering live gave me immense satisfaction. Har Har Mahadev!",
    rating: 5,
    avatar: "https://thumbs.dreamstime.com/b/confident-serious-indian-young-business-woman-student-sales-professional-office-employee-hr-teacher-india-standing-arms-199973461.jpg"
  },
  {
    id: 6,
    name: "Aditya Singh",
    location: "Delhi",
    text: "Truly a magical experience at Somnath. The VIP entry saved us hours. The local team was incredibly polite and helpful throughout.",
    rating: 5,
    avatar: "https://t4.ftcdn.net/jpg/05/35/28/93/360_F_535289317_lrX9mbQwwRd4Bn3kvxL442XjtNJtZxjy.jpg"
  },
  {
    id: 7,
    name: "Priya Nair",
    location: "Kochi",
    text: "I booked a special Puja for my parents' anniversary. The priests arranged everything beautifully. Felt very connected despite the distance.",
    rating: 5,
    avatar: "https://india.unfpa.org/sites/default/files/styles/original/public/news/homepage_card_cover_1000_x_560_2_1.png?itok=v8cdIU9T"
  },
  {
    id: 8,
    name: "Anand Joshi",
    location: "Mumbai",
    text: "The Kedarnath Yatra package was outstanding. Helicopter tickets were secured and the VIP Darshan was absolutely seamless. God bless the team.",
    rating: 5,
    avatar: "https://t4.ftcdn.net/jpg/00/33/37/83/360_F_33378356_gbnqycEE7TWnxa8Og49mkTn6ISTjxjVT.jpg"
  },
  {
    id: 9,
    name: "Prakash Patel",
    location: "Ahmedabad",
    text: "Excellent service from start to finish. They handled our large group of 20 people smoothly. Highly recommended for senior citizen Yatras.",
    rating: 5,
    avatar: "https://img.magnific.com/free-photo/portrait-mature-man-with-white-hair-mustache-looking-camera_637285-3240.jpg?semt=ais_hybrid&w=740&q=80"
  }
];

export const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  useEffect(() => {
    timeoutRef.current = setInterval(next, 4000);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, []);

  // Helper to get items for the center-focused layout
  const getVisibleItems = () => {
    const prev = (index - 1 + testimonials.length) % testimonials.length;
    const next = (index + 1) % testimonials.length;
    return [
      { ...testimonials[prev], position: "left" },
      { ...testimonials[index], position: "center" },
      { ...testimonials[next], position: "right" }
    ];
  };

  return (
    <section className="py-24 bg-gradient-cream relative overflow-hidden">
      <div className="container-prose">
        <div className="text-center mb-20">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-4">Devotee Blessings</h2>
          <h3 className="font-serif-display text-4xl md:text-5xl font-bold text-secondary">Stories of <span className="text-primary italic">Grace</span></h3>
        </div>

        <div className="relative h-[500px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {getVisibleItems().map((item) => (
              <motion.div
                key={`${item.id}-${item.position}`}
                layout
                initial={{ opacity: 0, scale: 0.8, x: item.position === "left" ? -50 : item.position === "right" ? 50 : 0 }}
                animate={{ 
                   opacity: item.position === "center" ? 1 : 0.3, 
                   scale: item.position === "center" ? 1 : 0.8,
                   x: item.position === "left" ? "-100%" : item.position === "right" ? "100%" : 0,
                   zIndex: item.position === "center" ? 30 : 10,
                   filter: item.position === "center" ? "blur(0px)" : "blur(4px)"
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                className={cn(
                  "absolute w-full max-w-lg bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl border border-border/40",
                  item.position !== "center" && "hidden lg:block"
                )}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-10 right-14 opacity-5"
                >
                  <Quote className="h-20 w-20 text-primary" />
                </motion.div>
                
                <div className="flex items-center gap-6 mb-10">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, delay: 0.4 }}
                    className="h-16 w-16 rounded-full border-2 border-gold p-0.5 overflow-hidden shadow-lg"
                  >
                    <img src={item.avatar} alt={item.name} className="h-full w-full rounded-full object-cover" />
                  </motion.div>
                  <div>
                    <motion.h4 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="font-bold text-secondary text-xl leading-none"
                    >{item.name}</motion.h4>
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-gold text-[10px] font-black uppercase tracking-widest mt-2"
                    >{item.location}</motion.p>
                  </div>
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex gap-1.5 mb-8"
                >
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-muted-foreground text-xl leading-relaxed italic font-medium"
                >
                  "{item.text}"
                </motion.p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                index === i ? "w-10 bg-primary shadow-gold" : "w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
