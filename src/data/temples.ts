import dwarkadhish from "@/assets/temple-dwarkadhish.jpg";
import somnath from "@/assets/temple-somnath.jpg";
import tirupati from "@/assets/temple-tirupati.jpg";
import vaishnodevi from "@/assets/temple-vaishnodevi.jpg";
import kashi from "@/assets/temple-kashi.jpg";
import mahakal from "@/assets/temple-mahakal.jpg";
import kedarnath from "@/assets/temple-kedarnath.jpg";
import badrinath from "@/assets/temple-badrinath.jpg";
import jagannath from "@/assets/temple-jagannath.jpg";
import shirdi from "@/assets/temple-shirdi.jpg";
import siddhivinayak from "@/assets/temple-siddhivinayak.jpg";
import golden from "@/assets/temple-golden.jpg";

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
};

export const temples: Temple[] = [
  {
    slug: "dwarkadhish",
    name: "Dwarkadhish Temple",
    deity: "Lord Krishna",
    location: "Dwarka",
    state: "Gujarat",
    image: dwarkadhish,
    tagline: "Jagat Mandir — kingdom of Lord Krishna, one of the sacred Char Dham.",
    bestTime: "Oct – Mar",
    highlights: ["Char Dham", "VIP Darshan", "Janmashtami special"],
  },
  {
    slug: "somnath",
    name: "Somnath Temple",
    deity: "Lord Shiva",
    location: "Prabhas Patan",
    state: "Gujarat",
    image: somnath,
    tagline: "First among the twelve Jyotirlingas, by the Arabian Sea.",
    bestTime: "Nov – Feb",
    highlights: ["Jyotirlinga", "Sea-side", "Evening Aarti"],
  },
  {
    slug: "tirupati",
    name: "Tirumala Tirupati",
    deity: "Lord Venkateswara",
    location: "Tirumala",
    state: "Andhra Pradesh",
    image: tirupati,
    tagline: "The richest and most-visited Vaishnavite shrine in the world.",
    bestTime: "Sep – Feb",
    highlights: ["Special Entry", "Laddu Prasadam", "Brahmotsavam"],
  },
  {
    slug: "vaishno-devi",
    name: "Mata Vaishno Devi",
    deity: "Goddess Vaishnavi",
    location: "Katra",
    state: "Jammu & Kashmir",
    image: vaishnodevi,
    tagline: "Sacred cave shrine in the Trikuta hills, calling every devotee.",
    bestTime: "Mar – Oct",
    highlights: ["Helicopter Yatra", "VIP Darshan", "Navratri"],
  },
  {
    slug: "kashi-vishwanath",
    name: "Kashi Vishwanath",
    deity: "Lord Shiva",
    location: "Varanasi",
    state: "Uttar Pradesh",
    image: kashi,
    tagline: "The golden temple on the ghats of mother Ganga.",
    bestTime: "Oct – Mar",
    highlights: ["Jyotirlinga", "Ganga Aarti", "Sugam Darshan"],
  },
  {
    slug: "mahakaleshwar",
    name: "Mahakaleshwar",
    deity: "Lord Shiva",
    location: "Ujjain",
    state: "Madhya Pradesh",
    image: mahakal,
    tagline: "Witness the only Bhasma Aarti at this powerful Jyotirlinga.",
    bestTime: "Oct – Mar",
    highlights: ["Bhasma Aarti", "Jyotirlinga", "Shravan Maas"],
  },
  {
    slug: "kedarnath",
    name: "Kedarnath",
    deity: "Lord Shiva",
    location: "Rudraprayag",
    state: "Uttarakhand",
    image: kedarnath,
    tagline: "Highest of the Char Dham, nestled in the Garhwal Himalayas.",
    bestTime: "May – Jun, Sep – Oct",
    highlights: ["Char Dham", "Helicopter Yatra", "Jyotirlinga"],
  },
  {
    slug: "badrinath",
    name: "Badrinath",
    deity: "Lord Vishnu",
    location: "Chamoli",
    state: "Uttarakhand",
    image: badrinath,
    tagline: "Abode of Badri Vishal, sacred Char Dham of the north.",
    bestTime: "May – Oct",
    highlights: ["Char Dham", "Tapt Kund", "Mana Village"],
  },
  {
    slug: "jagannath-puri",
    name: "Jagannath Puri",
    deity: "Lord Jagannath",
    location: "Puri",
    state: "Odisha",
    image: jagannath,
    tagline: "Home of the famed Rath Yatra and Mahaprasad.",
    bestTime: "Oct – Feb",
    highlights: ["Char Dham", "Rath Yatra", "Mahaprasad"],
  },
  {
    slug: "shirdi",
    name: "Shirdi Sai Baba",
    deity: "Sai Baba",
    location: "Shirdi",
    state: "Maharashtra",
    image: shirdi,
    tagline: "Samadhi of Sai Baba — Shraddha and Saburi for every seeker.",
    bestTime: "Oct – Feb",
    highlights: ["VIP Darshan", "Aarti Pass", "Thursday special"],
  },
  {
    slug: "siddhivinayak",
    name: "Siddhivinayak Temple",
    deity: "Lord Ganesha",
    location: "Mumbai",
    state: "Maharashtra",
    image: siddhivinayak,
    tagline: "The wish-granting Vinayak of Mumbai.",
    bestTime: "Year-round",
    highlights: ["Tuesday special", "Aarti Pass", "Ganesh Chaturthi"],
  },
  {
    slug: "golden-temple",
    name: "Golden Temple",
    deity: "Sri Harmandir Sahib",
    location: "Amritsar",
    state: "Punjab",
    image: golden,
    tagline: "Sri Harmandir Sahib — sanctum of equality and sewa.",
    bestTime: "Nov – Mar",
    highlights: ["Sarovar Darshan", "Langar Sewa", "Palki Sahib"],
  },
];

export const getTemple = (slug: string) => temples.find((t) => t.slug === slug);
