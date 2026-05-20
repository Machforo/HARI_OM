import { getShlokaAndTranslation } from "../pages/TempleDetail";

export interface TempleConfig {
  subtitle: string;
  terrainType: "trekking" | "crowded";
  deityName: string;
  stats: {
    shrines: number;
    legacyYears: number;
    pilgrimsCount: number;
  };
  quickFacts: {
    location: string;
    shrinesText: string;
    durationText: string;
    terrainText: string;
    rushDays: string;
  };
  vipReality: {
    title: string;
    description: string;
  };
  poojas: Array<{
    name: string;
    desc: string;
    time?: string;
  }>;
  shrines: Array<{
    name: string;
    desc: string;
    image: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const getTempleSpecificConfig = (baseSlug: string, templeData: any): TempleConfig => {
  const slug = baseSlug.toLowerCase().replace(/-temple$/, "");
  const state = templeData?.state || "India";
  const deity = templeData?.deity || "the Divine";

  // 1. Classification of trekking vs crowded temples
  const trekkingSlugs = [
    "ahobilam", "amarnath-cave", "kedarnath", "vaishno-devi",
    "shikharji", "yamunotri", "gangotri", "sabarimala", "maihar-devi"
  ];
  const isTrekking = trekkingSlugs.includes(slug);
  const terrainType = isTrekking ? "trekking" : "crowded";

  // 2. Default config based on deity and location
  const config: TempleConfig = {
    subtitle: `Abode of the Divine ${deity}`,
    terrainType,
    deityName: deity,
    stats: {
      shrines: 5,
      legacyYears: 1000,
      pilgrimsCount: 150
    },
    quickFacts: {
      location: `${templeData?.name || baseSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}, ${state}`,
      shrinesText: "Main Sanctum & Parivar Shrines",
      durationText: isTrekking ? "1 to 2 Full Days" : "2 to 4 Hours",
      terrainText: isTrekking ? "Steep forest walks & rocky paths" : "Queue lines, crowds & heavy rushes",
      rushDays: "Festivals, Weekends & Auspicious Days"
    },
    vipReality: {
      title: `Is VIP Darshan Available at ${templeData?.name || "this Temple"}?`,
      description: isTrekking
        ? "Due to the rugged forest location, there are no official paid VIP cards. Spiritual devotion and local guide coordination are the only ways to navigate upper and lower cave shrines safely."
        : "While official paid channels exist, tickets are highly limited and sell out weeks in advance. Devotees face long waiting under the sun even with VIP tickets. Our priority assistance ensures smooth gate coordination and dedicated devotee support."
    },
    poojas: [
      { name: "Special Archana Sewa", desc: "A personalized name-coordinated sankalp offering with matching flower and fruit shringar." },
      { name: "Maha Aarti Facilitation", desc: "Access the auspicious daily morning or evening direct view during principal aarti ceremonies." },
      { name: "Deity Bhog Offering", desc: "Facilitate fresh, pure vegetarian prasad offerings directly inside the sanctum." }
    ],
    shrines: [
      {
        name: "Main Garbhagriha",
        desc: "The sacred inner sanctum where the principal deity's ancient self-manifested idol resides.",
        image: templeData?.image || "https://images.unsplash.com/photo-1544013585-446a362cb705?q=80&w=800"
      },
      {
        name: "Parivar Devta Shrines",
        desc: "Dedicated auxiliary shrines located inside the outer temple complex walls.",
        image: (templeData?.gallery && templeData.gallery[1]) || "https://images.unsplash.com/photo-1544013585-446a362cb705?q=80&w=800"
      }
    ],
    faqs: [
      {
        question: `What is the best time to plan a visit to ${templeData?.name || "this temple"}?`,
        answer: `The best season is during pleasant cooler months when general weather is supportive. Major regional festivals are highly charged spiritually but draw massive devotee crowds.`
      },
      {
        question: "Is there any special dress code enforced inside the temple?",
        answer: "Devotees are requested to wear traditional Indian attire. Men can wear Dhotis or Kurtas, and women Sarees or Salwar Kameez. Avoid shorts, t-shirts, and highly casual modern wear."
      },
      {
        question: "How does Vandan Darshan assist in smooth temple entry?",
        answer: "We provide dedicated on-ground local devotees who guide you through the fastest queues, manage footwear/bag storage, coordinate wheelchair support for seniors, and guide your family step-by-step."
      }
    ]
  };

  // 3. Localized overrides for major temples
  if (slug === "ahobilam") {
    config.subtitle = "Abode of the Fierce & Compassionate Nava Narasimha";
    config.stats = { shrines: 9, legacyYears: 1000, pilgrimsCount: 50 };
    config.quickFacts.shrinesText = "9 Cave Shrines of Lord Narasimha";
    config.quickFacts.durationText = "1 to 2 Full Days for complete circuit";
    config.quickFacts.terrainText = "Mix of motorable trails & steep forest walks";
    config.quickFacts.rushDays = "Narasimha Jayanthi, Swati Nakshatram, Weekends";
    config.vipReality.title = "Is VIP Darshan Available at Ahobilam Temple?";
    config.vipReality.description = "Due to the rugged forest locations of the nine Nava Narasimha temples, there are no official paid VIP passes. Devotional willpower, proper trail safety, and expert local guide assistance are required to reach the shrines.";
    config.poojas = [
      { name: "Nava Narasimha Shanti Homam", desc: "A powerful fire ritual conducted at the base temple to remove negative planetary blocks." },
      { name: "Jwala Narasimha Kalyanotsavam", desc: "The divine wedding ceremony of Lord Narasimha with Chenchu Lakshmi at the sacred upper hills." },
      { name: "Daily Panchamrutha Abhishekam", desc: "Holy bath ritual conducted for the self-manifested Narasimha Shaligram Shilas." }
    ];
    config.shrines = [
      { name: "Jwala Narasimha", desc: "Perched high on a cliff, marking where the Lord's peak fiery wrath burst forth.", image: "https://upload.wikimedia.org/wikipedia/commons/6/67/14th_century_Ahobila_Narasimha_Swamy_temple%2C_Upper_Ahobilam%2C_Andhra_Pradesh_India_-_5.jpg" },
      { name: "Ahobila Narasimha", desc: "The ancient main upper cave shrine where Lord Narasimha stood in self-manifest form.", image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/14th_century_Ahobila_Narasimha_Swamy_temple%2C_Upper_Ahobilam%2C_Andhra_Pradesh_India_-_01.jpg" },
      { name: "Kroda Narasimha", desc: "A unique rock cave shrine depicting the Lord in His mighty Varaha (boar) avatar form.", image: "https://upload.wikimedia.org/wikipedia/commons/4/44/16th_century_Lakshmi_Narasimha_Swamy_temple%2C_Lower_Ahobilam%2C_Andhra_Pradesh_India_-_11.jpg" }
    ];
    config.faqs = [
      { question: "How difficult is the trekking path at Upper Ahobilam?", answer: "The trek to Upper Ahobilam cave temples is moderate but steep in certain regions, involving natural rock formations, walking along river banks, and ascending staircase pathways. Proper trekking shoes and local forest guides are highly recommended." },
      { question: "Can we cover all nine Nava Narasimha temples in a single day?", answer: "Covering all nine shrines in one day is extremely difficult physically, as several temples (like Pavana and Jwala) require dedicated hikes or off-road travel. It is highly recommended to plan a relaxed 2-day pilgrimage to cover all shrines without exhaustively rushing." },
      { question: "Are there any wild animal risks in the Nallamala forests?", answer: "The Nallamala forest range is a designated tiger reserve. The trails are completely safe during designated daylight pilgrimage timings (07:00 AM to 03:00 PM) as forest rangers and massive devotee crowds keep animals far from paved paths." }
    ];
  } else if (slug === "dwarkadhish") {
    config.subtitle = "Abode of the Divine & Eternal Lord Krishna (Dwarkadhish)";
    config.stats = { shrines: 5, legacyYears: 2500, pilgrimsCount: 250 };
    config.quickFacts.shrinesText = "Main Dwarkadhish & Parivar Shrines";
    config.quickFacts.durationText = "2 to 3 Hours (up to 5 during peak aarti)";
    config.quickFacts.terrainText = "Large stone steps, tight queue grids & crowding";
    config.quickFacts.rushDays = "Janmashtami, Holi, Rukmini Vivah, Weekends";
    config.vipReality.title = "Is VIP Darshan Available at Dwarkadhish Temple?";
    config.vipReality.description = "There is no official paid VIP Darshan online ticket sold by the Dwarkadhish Devasthan Trust. Rushes are massive during Mangla and Shringar Aartis. Our local coordinators assist you in navigating the massive devotee queues and securing a comfortable, close-up view without the stress.";
    config.poojas = [
      { name: "Chappan Bhog Utsav", desc: "A premium ritual offering 56 sacred traditional sweets and delicacies to Lord Dwarkadhish in your name." },
      { name: "Rukmini Devi Shringar Puja", desc: "Dedicated worship offering pure silk garments and gold-plated shringar to Rukmini Devi." },
      { name: "Maha Tulsi Archana", desc: "Sacred offering of fresh organic Tulsi leaves while chanting 1008 divine names of Shri Krishna." }
    ];
    config.shrines = [
      { name: "Dwarkadhish Main Shrine", desc: "The beautiful 5-storied temple structure supported by 72 magnificent pillars housing the gorgeous black marble deity of Dwarkadhish.", image: templeData?.image || "https://upload.wikimedia.org/wikipedia/commons/a/a2/Dwarkadheesh_temple.jpg" },
      { name: "Rukmini Devi Temple", desc: "Located 2 km away, dedicated to Lord Krishna's chief queen Rukmini Devi, highly known for its architectural beauty.", image: (templeData?.gallery && templeData.gallery[1]) || "https://upload.wikimedia.org/wikipedia/commons/f/fa/Dwarkadhish_Temple%2C_Dwarka%2C_Gujarat.JPG" },
      { name: "Trivikram Temple", desc: "Dedicated to the Trivikram form of Lord Vishnu, located within the beautiful primary temple complex.", image: (templeData?.gallery && templeData.gallery[2]) || "https://upload.wikimedia.org/wikipedia/commons/b/bd/DWARKADHISH_TEMPLE.jpg" }
    ];
    config.faqs = [
      { question: "What are the key daily Aarti timings at Dwarkadhish Temple?", answer: "The temple opens at 06:30 AM with Mangla Aarti, followed by Shringar at 08:00 AM, Rajbhog at 12:00 PM, Sandhya Aarti at 07:30 PM, and Shayan Aarti at 08:30 PM." },
      { question: "How long is the queue on regular vs festive days?", answer: "On regular days, the wait is 1 to 2 hours. During festivals like Janmashtami and peak pilgrimage seasons, waiting times can easily exceed 5 to 6 hours with massive crowd compression." },
      { question: "Is senior citizen wheelchair support available?", answer: "Yes, our on-ground team coordinates with official temple helpers to secure wheelchairs and handles manual transport through less crowded access gates." }
    ];
  } else if (slug === "kedarnath") {
    config.subtitle = "High-Altitude Abode of Lord Shiva";
    config.stats = { shrines: 1, legacyYears: 1200, pilgrimsCount: 180 };
    config.quickFacts.shrinesText = "Main Jyotirlinga Temple & Bhairav Shrine";
    config.quickFacts.durationText = "1 to 2 Days (requires overnight stay)";
    config.quickFacts.terrainText = "Steep 16 km mountain trek & cold weather";
    config.quickFacts.rushDays = "May to June, September to October, Mahashivratri";
    config.vipReality.title = "Is VIP Darshan Available at Kedarnath?";
    config.vipReality.description = "Official VIP slots are strictly managed and highly unpredictable due to climate conditions and government clearances. Devotees face freezing temperatures in line. Our support coordinates comfortable queue spots, hot meals, and immediate guide support.";
    config.poojas = [
      { name: "Rudra Abhishek Puja", desc: "A highly sacred water and milk bath ritual offered to the self-manifested Shiva Jyotirlinga." },
      { name: "Bhairav Nath Puja", desc: "Special prayers offered to the guardian deity Bhairav Nath on the neighboring mountain ridge." },
      { name: "Maha Shivratri Vishesh Seva", desc: "Overnight special prayers and deep mantra chanting during Shivratri." }
    ];
    config.shrines = [
      { name: "Kedarnath Main Sanctum", desc: "The iconic stone temple housing the triangular self-manifested humped Jyotirlinga of Lord Shiva.", image: templeData?.image || "https://upload.wikimedia.org/wikipedia/commons/4/49/Kedarnath_Temple_in_Uttarakhand%2C_India%2C_by_Yogabrata_Chakraborty.jpg" },
      { name: "Bhairav Mandir", desc: "Dedicated to Bhairav Nath, the guardian deity who protects the entire Kedarnath valley during winter.", image: (templeData?.gallery && templeData.gallery[1]) || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Kedarnath_Temple_in_Uttarakhand%2C_India%2C_photo_by_Yogabrata_Chakraborty.jpg" }
    ];
  } else if (slug === "kashi-vishwanath") {
    config.subtitle = "Golden Abode of the Lord of the Universe (Vishwanath)";
    config.stats = { shrines: 5, legacyYears: 2000, pilgrimsCount: 300 };
    config.quickFacts.shrinesText = "Golden Dome Jyotirlinga & Parivar Shrines";
    config.quickFacts.durationText = "1 to 2 Hours (up to 4 during peak days)";
    config.quickFacts.terrainText = "Crowded corridors, marble steps & tight security";
    config.quickFacts.rushDays = "Mondays, Mahashivratri, Sawan Month, Dev Deepawali";
    config.vipReality.title = "Is VIP Darshan Available at Kashi Vishwanath?";
    config.vipReality.description = "The temple board offers Sugam Darshan (assisted entry) tickets. However, corridor queue lines can still get extremely heavy on Mondays. Our local guides coordinate your exact Sugam entry gate, handle locker deposits for mobile phones, and ensure a smooth touch-the-deity (Sparsh) experience.";
    config.poojas = [
      { name: "Sugam Sparsh Darshan", desc: "Assisted priority entry allowing you to touch the holy Jyotirlinga and perform direct water offering." },
      { name: "Sapta Rishi Aarti Seva", desc: "Special evening ritual conducted by seven Vedic priests representing the seven cosmic sages." },
      { name: "Rudrabhishek with Ganga Jal", desc: "Holy recitation of Sri Rudram while bathing the Jyotirlinga with sacred Ganges water." }
    ];
    config.shrines = [
      { name: "Kashi Vishwanath Jyotirlinga", desc: "The supreme golden-spired inner temple housing the small self-manifested black stone Jyotirlinga.", image: templeData?.image || "https://upload.wikimedia.org/wikipedia/commons/e/ec/Shri_Kashi_Vishwanath_Temple_2.jpg" },
      { name: "Annapurna Temple", desc: "Located nearby, dedicated to the Goddess of Food and Nourishment, a key companion shrine.", image: (templeData?.gallery && templeData.gallery[1]) || "https://upload.wikimedia.org/wikipedia/commons/5/5c/Shri_Kashi_Vishwanath_Temple_7.jpg" }
    ];
  } else if (slug === "somnath") {
    config.subtitle = "The Eternal Shrine - First of the Twelve Jyotirlingas";
    config.stats = { shrines: 3, legacyYears: 1500, pilgrimsCount: 200 };
    config.quickFacts.shrinesText = "Main Jyotirlinga & Ocean-view Shrines";
    config.quickFacts.durationText = "1.5 to 2.5 Hours";
    config.quickFacts.terrainText = "Open marble hallways & heavy beach breezes";
    config.quickFacts.rushDays = "Maha Shivratri, Kartik Purnima, Shravan Month";
    config.vipReality.title = "Is VIP Darshan Available at Somnath Temple?";
    config.vipReality.description = "The Somnath Trust offers priority darshan tickets. However, queues during evening Aarti are extremely long. Our team handles entry gate alignment, coordinates immediate cloakroom service, and arranges seating spots for the stunning Light & Sound Show.";
    config.poojas = [
      { name: "Someshwar Maha Abhishek", desc: "High-grade liquid bath ritual with Vedic hymns chanting for ultimate spiritual peace." },
      { name: "Dhwajarochan Ceremony", desc: "Highly auspicious flag hoisting ceremony on the golden temple spire in your name." },
      { name: "Jyotirlinga Shringar Puja", desc: "Beautiful floral decoration of the sacred Jyotirlinga for the ultimate evening darshan." }
    ];
    config.shrines = [
      { name: "Somnath Jyotirlinga", desc: "The magnificent beachside temple rising majestically above the Arabian Sea, housing the primary Jyotirlinga.", image: templeData?.image || "https://upload.wikimedia.org/wikipedia/commons/6/6b/Dev_Somnath_Temple%2C_Dungarpur._by_Hritik_Sharma.jpg" },
      { name: "Old Somnath Mandir", desc: "The historic pink stone temple built by Queen Ahilyabai Holkar located just adjacent.", image: (templeData?.gallery && templeData.gallery[1]) || "https://upload.wikimedia.org/wikipedia/commons/f/f2/Shree_Somnath_Temple.jpg" }
    ];
  } else if (slug === "vaishno-devi") {
    config.subtitle = "Sacred Hilltop Cave Abode of Mata Vaishno Devi";
    config.stats = { shrines: 3, legacyYears: 1000, pilgrimsCount: 350 };
    config.quickFacts.shrinesText = "Holy Cave (Pindis of Durga, Lakshmi, Saraswati)";
    config.quickFacts.durationText = "1 to 2 Days (requires 13 km trek/helicopter)";
    config.quickFacts.terrainText = "Paved mountain trails, stairs & queue bays";
    config.quickFacts.rushDays = "Navratri, New Year, Summer Vacations, Weekends";
    config.vipReality.title = "Is VIP Darshan Available at Vaishno Devi?";
    config.vipReality.description = "Official VIP entries are restricted to national dignitaries. Helicopter booking represents the only priority route, which is extremely difficult to book online. Our on-ground coordinators arrange priority queue slots, coordinate clean stays at Katra/Ardhkuwari, and organize horse/battery car bookings.";
    config.poojas = [
      { name: "Atka Aarti Facilitation", desc: "A highly prestigious slot to sit directly in front of the holy cave during direct morning/evening aarti." },
      { name: "Mata ka Shringar Offering", desc: "Offer pure silk chunri, dry fruits, and gold ornaments directly at the principal shrine." },
      { name: "Sankalp Bhairav Nath Puja", desc: "Mandatory concluding prayers offered at the high-altitude Bhairav Nath shrine to complete the yatra." }
    ];
    config.shrines = [
      { name: "The Holy Cave", desc: "The natural mountain cave housing the three divine self-manifested rock Pindis representing Maha Kali, Maha Lakshmi, and Maha Saraswati.", image: templeData?.image || "https://upload.wikimedia.org/wikipedia/commons/0/04/Mata_Vaishno_Devi_Mandir%2C_Katra.jpg" },
      { name: "Ardhkuwari Cave", desc: "The womb-shaped cave (Garbh Joon) where the Goddess meditated for nine months, a key spiritual stop.", image: (templeData?.gallery && templeData.gallery[1]) || "https://upload.wikimedia.org/wikipedia/commons/2/2d/Vaishno_Devi_Mandir%2C_Dhan.png" },
      { name: "Bhairav Ghati", desc: "Perched higher up, housing the temple of Bhairav Nath. The pilgrimage is incomplete without visiting this spot.", image: (templeData?.gallery && templeData.gallery[3]) || "https://upload.wikimedia.org/wikipedia/commons/3/3b/Vaishno_Devi_temple_complex_at_night.jpg" }
    ];
  } else if (slug === "ram-mandir") {
    config.subtitle = "The Grand and Historic Abode of Shri Ram Lalla";
    config.stats = { shrines: 1, legacyYears: 500, pilgrimsCount: 500 };
    config.quickFacts.shrinesText = "Grand Mandir Complex & Shri Ram Lalla Sanctum";
    config.quickFacts.durationText = "2 to 3 Hours (requires walking grand entry)";
    config.quickFacts.terrainText = "Beautiful sandstone corridors & long secure walks";
    config.quickFacts.rushDays = "Ram Navami, Diwali, Weekends & Auspicious Days";
    config.vipReality.title = "Is VIP Darshan Available at Ayodhya Ram Mandir?";
    config.vipReality.description = "The Trust offers free passes for Aarti online, but slots sell out instantly. Queue lengths are huge. Our ground team ensures swift navigation from the security gates, handles footwear management, and positions your family for a comfortable, uninterrupted view of the beautiful Ram Lalla idol.";
    config.poojas = [
      { name: "Ram Lalla Mangala Aarti", desc: "Sacred early morning prayer service offered directly to the beautiful child form of Lord Rama." },
      { name: "Maha Tulsi Archana", desc: "Dedicated worship using fresh organic Tulsi leaves and reciting the holy Ram Sahasranama." },
      { name: "Sankalp Prasad Sewa", desc: "Bhog and sweets offered in your name, with authentic dry-fruit prasad packed and dispatched." }
    ];
    config.shrines = [
      { name: "Main Garbhagriha", desc: "The grand inner temple sanctum housing the world-famous black stone idol of Shri Ram Lalla in His 5-year-old child form.", image: templeData?.image || "https://upload.wikimedia.org/wikipedia/commons/d/d1/Ram_Janmbhoomi_Mandir%2C_Ayodhya_Dham.jpg" }
    ];
  }

  return config;
};

export const getNearbyTemples = (baseSlug: string): Array<{ slug: string; name: string; distance: string; desc: string; image: string }> => {
  const list = [
    { slug: "somnath-temple", name: "Somnath Temple", distance: "90 km", desc: "The eternal beachside shrine, first of the twelve sacred Shiva Jyotirlingas.", image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Dev_Somnath_Temple%2C_Dungarpur._by_Hritik_Sharma.jpg" },
    { slug: "dwarkadhish-temple", name: "Dwarkadhish Temple", distance: "120 km", desc: "The magnificent 5-storied temple of Lord Krishna at the edge of Gomti river.", image: "https://hblimg.mmtcdn.com/content/hubble/img/dwarka/mmt/activities/m_Dwarkadhish%20Temple-1_l_498_640.jpg" },
    { slug: "kashi-vishwanath-temple", name: "Kashi Vishwanath", distance: "150 km", desc: "The legendary golden-spired temple of Lord Shiva in the holy city of Varanasi.", image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Shri_Kashi_Vishwanath_Temple_2.jpg" },
    { slug: "vaishno-devi-temple", name: "Vaishno Devi", distance: "200 km", desc: "The highly revered cave shrine of Goddess Durga nested inside the Trikuta mountains.", image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mata_Vaishno_Devi_Mandir%2C_Katra.jpg" },
    { slug: "kedarnath-temple", name: "Kedarnath Temple", distance: "250 km", desc: "The scenic mountain jyotirlinga temple of Lord Shiva surrounded by Himalayan peaks.", image: "https://upload.wikimedia.org/wikipedia/commons/4/49/Kedarnath_Temple_in_Uttarakhand%2C_India%2C_by_Yogabrata_Chakraborty.jpg" }
  ];
  return list.filter(item => item.slug !== baseSlug.toLowerCase()).slice(0, 3);
};
