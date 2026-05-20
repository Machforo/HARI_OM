import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
const COLLAGE_IMAGES = [
  "https://www.thehosteller.com/_next/image/?url=https%3A%2F%2Fstatic.thehosteller.com%2Fhostel%2Fimages%2Fimage.jpg%2Fimage-1744806127045.jpg&w=2048&q=75",
  "https://thumbs.dreamstime.com/b/group-devotees-standing-line-to-enter-temple-see-lord-rama-people-wearing-variety-clothing-including-woman-blue-313240902.jpg",
  "https://www.tourmyindia.com/blog//wp-content/uploads/2021/03/Ayodhya-Ram-Temple.jpg",
  "https://pbs.twimg.com/media/FwdosEyaIAEVIwV.jpg",
  "https://media.istockphoto.com/id/2182124302/photo/hindu-people-praying-in-the-temple-for-diwali-celebration-in-kuala-lumpur-malaysia.jpg?s=612x612&w=0&k=20&c=Vw1R-uSgXgOzlhyAO-gf0TTEZBrNUiHBb6rkLbaIjyU=",
  "https://media.istockphoto.com/id/484252546/photo/worshipers-at-meenakshi-amman-temple-in-madurai-india.jpg?s=612x612&w=0&k=20&c=UjIrvktgiQ-Kuaekqq_myZf-_U0luEMjM9NGL7qtPGQ=",
  "https://cdn.britannica.com/24/1624-050-789B6570/temple-Chariot-Festival-Jagannatha-Puri-India-Odisha.jpg?w=400&h=300&c=crop",
  "https://cf-images.assettype.com/newindianexpress%2F2025-11-21%2Fbwio18o9%2FSmooth-darshan.jpg",
  "https://i.ytimg.com/vi/qP2ZMJAqUts/maxresdefault.jpg",
  "https://hinduismtoday.b-cdn.net/wp-content/uploads/2024/09/untitled-57-1024x768.jpg",
  "https://th-i.thgim.com/public/incoming/lmxxi0/article68813352.ece/alternates/FREE_1200/9911_28_10_2024_18_42_40_2_CM_2.JPG",
  "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/12398/production/_83684647_10.jpg",
  "https://media.istockphoto.com/id/1163560125/photo/hindu-man-praying-at-a-temple.jpg?s=612x612&w=0&k=20&c=EDWjDF-48IjPEhfLnE9n5nRc7UzxKadQyjZbQytOm0I=",
  "https://static.toiimg.com/thumb/msid-107061254,width-1070,height-580,imgsize-1212985,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
  "https://lh3.googleusercontent.com/pw/AP1GczMkYu4CghGXjZLORr8Gc_Rpz445kNFFeiHsle_thWfoSgwVWWQhasVfPDZS44Y8H4q83pULXsEZjg6kpc7YMozguaO-dU4P2m5ZDefLIn2qA-I39mTVSfFXYh8A_d3H1kV_XoCfHMA-r-_Sb9RgNfW_=w1140-h641-s-no-gm?authuser=0",
  "https://discoverindiabyroad.com/wp-content/uploads/2020/06/Somnath-Aarti-Copy.jpg",
  "https://thumbs.dreamstime.com/b/old-indian-sadhu-reading-scriptures-sitting-speak-up-sacred-texts-closed-eyes-near-temple-56802356.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL4Erwz5J6vyyIVaGIkLviz2zp_LWZCgel4Q&s",
  "https://www.tourmyindia.com/blog//wp-content/uploads/2021/03/Ayodhya-Ram-Temple.jpg",
  "https://pbs.twimg.com/media/FwdosEyaIAEVIwV.jpg",
];

export const AnimatedCollage = () => {
  // We have 10 slots. At any given time, each slot shows one image.
  // Initially, slots 0-9 show images 0-9.
  const [slots, setSlots] = useState<number[]>(Array.from({ length: 10 }, (_, i) => i));

  useEffect(() => {
    // Every 3 seconds, randomly pick one slot and change its image to a random image not currently shown
    const interval = setInterval(() => {
      setSlots(prev => {
        const next = [...prev];
        const slotToChange = Math.floor(Math.random() * 10);
        
        let newImageIndex;
        do {
          newImageIndex = Math.floor(Math.random() * 20);
        } while (next.includes(newImageIndex)); // ensure we don't duplicate an image currently in the grid
        
        next[slotToChange] = newImageIndex;
        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Diverse masonry-style sizing for the 10 slots
  const getSlotClasses = (index: number) => {
    const base = "relative overflow-hidden rounded-2xl shadow-lg border-2 border-white/20";
    const layoutClasses = [
      "col-span-2 row-span-2", // 0: large
      "col-span-1 row-span-1", // 1: small
      "col-span-1 row-span-2", // 2: tall
      "col-span-1 row-span-1", // 3: small
      "col-span-2 row-span-1", // 4: wide
      "col-span-1 row-span-1", // 5: small
      "col-span-1 row-span-2", // 6: tall
      "col-span-1 row-span-1", // 7: small
      "col-span-2 row-span-2", // 8: large
      "col-span-2 row-span-1", // 9: wide
    ];
    return cn(base, layoutClasses[index % layoutClasses.length]);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-5 gap-3 h-[600px] w-full p-4 bg-white/5 backdrop-blur-sm rounded-[3rem]">
      {slots.map((imageIndex, slotIndex) => (
        <div key={slotIndex} className={getSlotClasses(slotIndex)}>
          <AnimatePresence mode="popLayout">
            <motion.img
              key={imageIndex}
              src={COLLAGE_IMAGES[imageIndex]}
              alt={`Devotional collage ${imageIndex}`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                // Fallback to unsplash if the local temple image doesn't exist
                (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1544011501-a212f2f4c82e?auto=format&fit=crop&q=80&sig=${imageIndex}`;
              }}
            />
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
