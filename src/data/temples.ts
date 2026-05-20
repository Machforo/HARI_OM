import { templeMetadata } from "./templeMetadata";

export type Temple = {
  slug: string;
  name: string;
  deity: string;
  location: string;
  state: string;
  image: string;
  tagline: string;
  bestTime: string;
  highlights: string[];
  category?: string;
};

// Top featured temples with full data
export const templeList: Temple[] = [
  {
    slug: "ahobilam",
    name: "Ahobilam Temple",
    deity: "Lord Narasimha",
    location: "Nandyal",
    state: "Andhra Pradesh",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Upper_Ahobilam_temple_Gopuram_02.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    tagline: "The sacred Nava Narasimha Kshetra in the Nallamala forests.",
    bestTime: "Sep – Mar",
    highlights: ["Nava Narasimha", "Forest Trek", "Ugra Stambham"],
    category: "Andhra Pradesh"
  },
  {
    slug: "dwarkadhish",
    name: "Dwarkadhish Temple",
    deity: "Lord Krishna",
    location: "Dwarka",
    state: "Gujarat",
    image: "https://hblimg.mmtcdn.com/content/hubble/img/dwarka/mmt/activities/m_Dwarkadhish%20Temple-1_l_498_640.jpg",
    tagline: "Jagat Mandir — kingdom of Lord Krishna, one of the sacred Char Dham.",
    bestTime: "Oct – Mar",
    highlights: ["Char Dham", "Special Darshan", "Janmashtami special"],
    category: "Char Dham"
  },
  {
    slug: "somnath",
    name: "Somnath Temple",
    deity: "Lord Shiva",
    location: "Prabhas Patan",
    state: "Gujarat",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/10/Somanath_mandir_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    tagline: "First among the twelve Jyotirlingas, by the Arabian Sea.",
    bestTime: "Nov – Feb",
    highlights: ["Jyotirlinga", "Sea-side", "Evening Aarti"],
    category: "Jyotirlinga"
  },
  {
    slug: "kedarnath",
    name: "Kedarnath Temple",
    deity: "Lord Shiva",
    location: "Rudraprayag",
    state: "Uttarakhand",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Kedarnath_Temple_in_Rainy_season.jpg",
    tagline: "Highest of the Char Dham, nestled in the Garhwal Himalayas.",
    bestTime: "May – Jun, Sep – Oct",
    highlights: ["Char Dham", "Helicopter Yatra", "Jyotirlinga"],
    category: "Char Dham"
  },
  {
    slug: "kashi-vishwanath",
    name: "Kashi Vishwanath",
    deity: "Lord Shiva",
    location: "Varanasi",
    state: "Uttar Pradesh",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Kashi_Vishwanath.jpg",
    tagline: "The golden temple on the ghats of mother Ganga.",
    bestTime: "Oct – Mar",
    highlights: ["Jyotirlinga", "Ganga Aarti", "Sugam Darshan"],
    category: "Jyotirlinga"
  },
  {
    slug: "vaishno-devi",
    name: "Mata Vaishno Devi",
    deity: "Goddess Vaishnavi",
    location: "Katra",
    state: "Jammu & Kashmir",
    image: "https://substackcdn.com/image/fetch/$s_!nMlI!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8b7931c1-b550-44b2-935e-80be13f08f29_826x508.jpeg",
    tagline: "Sacred cave shrine in the Trikuta hills, calling every devotee.",
    bestTime: "Mar – Oct",
    highlights: ["Helicopter Yatra", "Special Darshan", "Navratri"],
    category: "North India"
  },
];

export const temples = templeList; // Alias for backward compatibility

// All other temples (mapped from the docx files)
export const allTemplesList = [
  "Ahobilam", "Akshardham", "Amaralingeswara Swamy", "Amarnath Cave", "Ambaji", 
  "Arasavalli Sun", "Arunachaleswarar", "Attukal Bhagavathy", "Badrinath", 
  "Bageshwar Dham", "Baidyanath Jyotirlinga", "Banke Bihari", "Belur Math", 
  "Bhimashankar", "Birla Mandir Hyderabad", "Brahma Temple Pushkar", 
  "Brihadeeswarar", "Chamundeshwari", "Chhatarpur", "Chottanikkara", 
  "Dakshineswar Kali", "Dilwara", "Draksharamam", "Dwarkadhish", 
  "Ekambareswarar", "Gangotri", "Gnana Saraswati", "Gokarna Mahabaleshwar", 
  "Grishneshwar", "Guruvayur", "Hanuman Garhi", "ISKCON Bangalore", 
  "Jagannath", "Jwala Ji", "Kal Bhairav", "Kalighat Kali", "Kamakhya", 
  "Kamakshi Amman", "Kanaka Durga", "Karni Mata", "Kashi Vishwanath", 
  "Kedarnath", "Khajuraho", "Khatu Shyam Ji", "Konark Sun", "Kukke Subramanya", 
  "Lepakshi Veerabhadra", "Lingaraj", "Lotus", "Mahabodhi", "Mahakaleshwar", 
  "Mahalakshmi Kolhapur", "Maihar Devi", "Mallikarjuna Swamy", "Meenakshi", 
  "Mumbadevi", "Murudeshwar", "Nageshwar Jyotirlinga", "Nathdwara Shrinathji", 
  "Omkareshwar", "Padmanabhaswamy", "Palani Murugan", "Penchalakona", 
  "Prem Mandir", "Ram Mandir", "Rameswaram", "Ranganathaswamy", "Sabarimala", 
  "Salasar Balaji", "Shikharji", "Shirdi Sai Baba", "Shree Krishna Janmabhoomi", 
  "Shreemant Dagdusheth", "Shri Kshetra Dharmasthala", "Siddhivinayak", 
  "Simhachalam", "Somnath", "Sri Malyadri Lakshmi Narasimha", 
  "Sri Panakala Narasimha", "Sri Varasiddhi Vinayaka", "Srikalahasti", 
  "Sringeri Sharada Peetham", "Sripuram Golden", "Swaminarayan Akshardham", 
  "The Golden Temple", "Trimbakeshwar", "Tulja Bhavani", "Udupi Sri Krishna", 
  "Umananda", "Vadakkunnathan", "Vaishno Devi", "Vindhyachal", "Virupaksha", 
  "Vontimitta Kodanda Rama", "Yadadri Lakshmi Narasimha", "Yaganti Uma Maheswara", 
  "Yamunotri"
];

// Merge featured temples and all text temples for forms
export const allTemplesMerged = [
  ...templeList.map(t => ({ slug: t.slug, name: t.name })),
  ...allTemplesList
    .filter(name => !templeList.some(t => t.name.toLowerCase().includes(name.toLowerCase())))
    .map(name => ({
      slug: name.toLowerCase().replace(/ /g, "-").replace(/&/g, "and").replace(/,/g, ""),
      name: `${name} Temple`
    }))
].sort((a, b) => a.name.localeCompare(b.name));

export const getTemple = (slug: string) => {
  const featured = templeList.find((t) => t.slug === slug);
  if (featured) return featured;
  
  const name = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
  const metadata = templeMetadata[slug] || {};

  return {
    slug,
    name: `${name} Temple`,
    deity: metadata.deity || "Lord",
    location: "India",
    state: metadata.state || "Various",
    image: metadata.image || `https://images.unsplash.com/photo-1544011501-a212f2f4c82e?auto=format&fit=crop&q=80`,
    category: metadata.category,
    tagline: `Experience the divine presence at ${name} Temple.`,
    bestTime: "Year-round",
    highlights: ["Special Darshan", "Puja Booking", "Prasad Delivery"],
  } as Temple;
};

export const allTemplesFullList = allTemplesMerged.map(t => getTemple(t.slug));
