export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  mediaType?: 'blog' | 'aarti' | 'news' | 'event';
  videoUrl?: string;
  duration?: string;
}

export const MEDIA_TYPES = {
  BLOG: 'blog',
  AARTI: 'aarti',
  NEWS: 'news',
  EVENT: 'event',
} as const;

export const blogs: BlogPost[] = [
  // ============ BLOGS ============
  {
    id: 1,
    slug: "significance-of-jyotirlingas",
    title: "The Spiritual Significance of 12 Jyotirlingas",
    excerpt: "Explore the ancient legends and spiritual power behind India's most sacred Shiva shrines. Understanding the profound meaning and divine manifestations of these sacred pilgrimage destinations.",
    content: `
      <p>The 12 Jyotirlingas are highly revered shrines dedicated to Lord Shiva, representing his infinite and radiant light. These shrines are considered the most sacred destinations for any devotee of Mahadev, each with unique spiritual properties and ancient legends.</p>
      <h2>What is a Jyotirlinga? Understanding Sacred Manifestations</h2>
      <p>The word 'Jyoti' means 'radiance' and 'Linga' represents the formless, infinite symbol of Shiva. Legend says that Lord Shiva first manifested himself as a pillar of light (Jyotirlinga) to resolve a dispute between Brahma and Vishnu. This divine manifestation symbolizes the supreme cosmic energy and the eternal nature of Shiva consciousness.</p>
      <h2>The 12 Jyotirlinga Locations and Their Significance</h2>
      <ul>
        <li><strong>Somnath:</strong> The first Jyotirlinga, located in Gujarat, symbolizes the victory of divinity over ignorance.</li>
        <li><strong>Mallikarjuna:</strong> Located on the Srisailam mountain in Andhra Pradesh, represents eternal devotion.</li>
        <li><strong>Mahakaleshwar:</strong> The self-manifested Linga in Ujjain, embodies time and cosmic cycles.</li>
        <li><strong>Omkareshwar:</strong> Located on an island in the Narmada river, symbolizes sacred syllable Om.</li>
        <li><strong>Kedarnath:</strong> The highest Jyotirlinga in the Himalayas, represents the gateway to spiritual transcendence.</li>
        <li><strong>Bhimashankar:</strong> Located in the Sahyadri hills of Maharashtra, symbolizes divine protection.</li>
        <li><strong>Kashi Vishwanath:</strong> The spiritual capital of India in Varanasi, represents liberation through divine grace.</li>
        <li><strong>Trimbakeshwar:</strong> Near the source of the Godavari river, embodies sacred waters and purification.</li>
        <li><strong>Baidyanath:</strong> Located in Deoghar, Jharkhand, represents healing and divine compassion.</li>
        <li><strong>Nageshwar:</strong> Situated near Dwarka in Gujarat, symbolizes serpent power and cosmic energy.</li>
        <li><strong>Rameshwaram:</strong> The southernmost Jyotirlinga in Tamil Nadu, represents the bridge between realms.</li>
        <li><strong>Grishneshwar:</strong> Located near the Ellora caves in Aurangabad, embodies eternal sculpture of consciousness.</li>
      </ul>
      <p>Visiting these 12 shrines is believed to wash away all sins and help the devotee attain Moksha (liberation). The pilgrimage itself becomes a journey of spiritual transformation, leading the seeker from ignorance to enlightenment.</p>
      <h2>The Spiritual Journey of Jyotirlinga Darshan</h2>
      <p>Each visit to a Jyotirlinga amplifies spiritual awareness and connects the devotee with the infinite consciousness of Lord Shiva. At Vandan Darshan, we facilitate seamless pilgrimage experiences to all 12 Jyotirlingas with expert guidance and authentic spiritual atmosphere.</p>
    `,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80",
    date: "May 10, 2024",
    author: "Shastri Ji",
    category: "Rituals",
    mediaType: "blog"
  },
  {
    id: 2,
    slug: "understanding-abhishekam",
    title: "Understanding Rituals: The Sacred Art of Abhishekam",
    excerpt: "A deep dive into the science and devotion behind the sacred ritual of bathing the deity. Discover how this ancient practice purifies the soul and connects us with divine energy.",
    content: `
      <p>Abhishekam is a ritual in which a devotee pours sacred substances like milk, honey, ghee, and sandalwood water over the idol of a deity. While it is a beautiful act of devotion, there is profound spiritual and scientific significance embedded within this ancient practice.</p>
      <h2>The Symbolism of Sacred Bathing: Purification of the Soul</h2>
      <p>The act of Abhishekam represents the purification of the soul and the cleansing of karmic impurities. Just as we wash the deity with pure substances, we symbolically ask for our own hearts to be cleansed of ego, anger, jealousy, and material desire. This practice embodies the principle that outer actions reflect inner spiritual transformation.</p>
      <h2>The Substances Used in Abhishekam and Their Significance</h2>
      <ul>
        <li><strong>Milk:</strong> Represents purity, health, and longevity. In Ayurvedic philosophy, milk nourishes all tissues and promotes spiritual growth.</li>
        <li><strong>Honey:</strong> Symbolizes sweetness in speech and behavior. Honey also represents the sweetness of divine grace and spiritual wisdom.</li>
        <li><strong>Curd:</strong> Represents fertility, health, and progeny. It symbolizes the transformation of raw energy into beneficial forms.</li>
        <li><strong>Ghee:</strong> Represents victory, success, and illumination. Ghee is considered the purest offering, carrying the essence of consciousness.</li>
        <li><strong>Sandalwood Water:</strong> Represents mental peace, cooling of the mind, and relief from karmic heat. Its fragrance symbolizes the presence of divinity.</li>
        <li><strong>Coconut Water:</strong> Represents the nectar of immortality and divine consciousness flowing through creation.</li>
        <li><strong>Rose Water:</strong> Symbolizes love, devotion, and the flowering of the heart chakra towards the divine.</li>
      </ul>
      <h2>The Science Behind the Practice</h2>
      <p>According to Vedic science, the materials used in Abhishekam have specific vibrational frequencies that resonate with the deity's cosmic energy. When performed with sincere devotion and proper Sankalp (sacred intention), Abhishekam creates a powerful energetic connection between the worshipper and the divine.</p>
      <h2>Performing Abhishekam with Spiritual Intention</h2>
      <p>When performed with a pure heart and correct Sankalp, Abhishekam connects the devotee directly with the divine energy of the deity. The ritual becomes a meditation in action, where every drop of sacred substance carries the prayers and aspirations of millions of devoted hearts.</p>
    `,
    image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80",
    date: "May 05, 2024",
    author: "Vandan Team",
    category: "Wisdom",
    mediaType: "blog"
  },
  {
    id: 3,
    slug: "char-dham-guide",
    title: "Planning Your First Char Dham Yatra: Complete Pilgrimage Guide",
    excerpt: "A comprehensive guide for beginners planning their sacred journey to the four abodes. Learn everything you need to know about this transformative pilgrimage experience.",
    content: `
      <p>The Char Dham Yatra—comprising Yamunotri, Gangotri, Kedarnath, and Badrinath—is the ultimate pilgrimage for any Hindu seeking spiritual enlightenment and divine blessings. Nestled in the majestic Garhwal Himalayas, this journey is as much about physical resilience as it is about spiritual faith and transformation.</p>
      <h2>Understanding the Char Dham: Four Sacred Abodes</h2>
      <p>The Char Dham represents four cardinal directions and four aspects of divine consciousness. Each temple holds unique spiritual significance and offers distinct blessings to devoted pilgrims.</p>
      <h2>Sequence and Route of the Yatra</h2>
      <p>Traditionally, the Yatra is performed from West to East: starting at Yamunotri (source of Yamuna), then Gangotri (source of Ganga), followed by Kedarnath (abode of Shiva), and finally Badrinath (abode of Vishnu). This sequence follows the natural geography and sacred principles of Hindu cosmology.</p>
      <h2>Comprehensive Tips for a Successful Pilgrimage</h2>
      <ul>
        <li><strong>Acclimatization:</strong> Spend a day in Rishikesh or Haridwar to attune yourself spiritually and adapt to the altitude.</li>
        <li><strong>Physical Fitness:</strong> Start walking 3-5 km daily at least a month before the Yatra. Yoga and breathing exercises enhance endurance.</li>
        <li><strong>Proper Clothing:</strong> Carry heavy woolens even in summer, as mountain weather is unpredictable. Comfortable hiking shoes are essential.</li>
        <li><strong>Registration and Documentation:</strong> Ensure you have the mandatory Chardham registration completed beforehand for safety tracking.</li>
        <li><strong>Dietary Preparation:</strong> Consume sattvic (pure) foods during your journey. Avoid meat, fish, and intoxicants.</li>
        <li><strong>Spiritual Preparation:</strong> Undertake meditation and prayer practices before embarking on this sacred journey.</li>
      </ul>
      <h2>Spiritual Significance and Transformation</h2>
      <p>The Char Dham Yatra is not merely a pilgrimage but a complete spiritual metamorphosis. The challenges of the journey—climbing mountains, facing natural elements—become metaphors for overcoming internal obstacles and limitations.</p>
      <p>At Vandan Darshan, we ensure your journey is seamless and sacred by handling all logistics, from helicopter bookings to priority darshan assistance, authentic local guide services, and spiritual guidance from learned priests.</p>
    `,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80",
    date: "April 28, 2024",
    author: "Spiritual Guide",
    category: "Yatra",
    mediaType: "blog"
  },
  
  // ============ AARTI VIDEOS ============
  {
    id: 4,
    slug: "maha-aarti-varanasi",
    title: "Ganga Aarti - Varanasi - Evening Divine Ceremony",
    excerpt: "Experience the most sacred and mesmerizing evening aarti performed on the banks of the holy River Ganga in Varanasi. A spiritual journey through chants and sacred flames.",
    content: `
      <p>The Ganga Aarti in Varanasi is one of the most spectacular and spiritually transformative ceremonies in the world. Performed daily at the Dashashwamedh Ghat, this ancient ritual has been conducted for centuries, connecting millions of devotees with the divine energy of Mother Ganga.</p>
      <h2>The Sacred Fire Ceremony</h2>
      <p>Watch as priests perform elaborate movements with flaming lamps while chanting Vedic mantras. The synchronized choreography of the ceremony represents the cosmic dance of creation and the eternal flow of divine consciousness through the holy waters.</p>
      <h2>Spiritual Significance</h2>
      <p>Witnessing the Ganga Aarti in person is considered one of the most purifying experiences. The sacred flames symbolize the destruction of ignorance and the illumination of spiritual knowledge. The river's current represents the flow of life and cosmic energy.</p>
    `,
    image: "https://harichetan.com/wp-content/uploads/2025/01/Chanting.jpg",
    date: "Daily Performance",
    author: "Vandan Darshan",
    category: "Rituals",
    mediaType: "aarti",
    videoUrl: "https://www.youtube.com/embed/WU-bvxvjXTE",
    duration: "45 minutes"
  },
  {
    id: 5,
    slug: "krishna-aarti-mathura",
    title: "Krishna Aarti - Mathura - Celestial Divine Dance",
    excerpt: "Immerse yourself in the divine aura of Krishna Aarti at the sacred temples of Mathura. Experience the celestial music and sacred rituals dedicated to Lord Krishna.",
    content: `
      <p>The Krishna Aarti performed in Mathura, the birthplace of Lord Krishna, is an enchanting spiritual experience filled with devotion, music, and cosmic energy.</p>
      <h2>The Divine Performance</h2>
      <p>Watch the priests dress Lord Krishna in elaborate ornaments and perform sacred rituals with rhythmic movements and ancient Vedic chants. The atmosphere fills with the fragrance of flowers, incense, and the divine presence.</p>
      <h2>Spiritual Connection</h2>
      <p>Krishna Aarti connects devotees directly with the consciousness of divine love and cosmic play. The bells, drums, and chanting create a vibration that elevates the spiritual awareness of all present.</p>
    `,
    image: "https://harichetan.com/wp-content/uploads/2025/01/Chanting.jpg",
    date: "Twice Daily",
    author: "Vandan Darshan",
    category: "Krishna",
    mediaType: "aarti",
    videoUrl: "https://www.youtube.com/embed/IJpwkT0Tg3g",
    duration: "30 minutes"
  },
  {
    id: 6,
    slug: "shiva-aarti-kedarnath",
    title: "Maha Shiva Aarti - Kedarnath - Himalayan Divine Ritual",
    excerpt: "Witness the mystical Shiva Aarti performed high in the Himalayas at the sacred Kedarnath temple. A spiritual awakening in the presence of eternal consciousness.",
    content: `
      <p>The Maha Shiva Aarti at Kedarnath, located in the pristine Himalayas, is a transformative spiritual experience performed against the backdrop of snow-capped peaks and eternal mountains.</p>
      <h2>The Cosmic Ceremony</h2>
      <p>Performed with ancient rituals and Vedic chants, this aarti connects the devotee with the consciousness of Lord Shiva and the eternal cosmic energy that flows through all creation.</p>
      <h2>Spiritual Transformation</h2>
      <p>The combination of the mountain's spiritual vibration, the sacred flames, and the priest's devotional chanting creates a powerful portal for spiritual awakening and divine connection.</p>
    `,
    image: "https://harichetan.com/wp-content/uploads/2025/01/Chanting.jpg",
    date: "Daily",
    author: "Vandan Darshan",
    category: "Rituals",
    mediaType: "aarti",
    videoUrl: "https://www.youtube.com/embed/7JQvhHAj9w8",
    duration: "50 minutes"
  },

  // ============ NEWS & EVENTS ============
  {
    id: 7,
    slug: "maha-kumbh-2025-guide",
    title: "Maha Kumbh 2025 - The Greatest Spiritual Gathering on Earth",
    excerpt: "Join millions of devotees in the Maha Kumbh 2025 at Prayagraj. The world's largest spiritual congregation with divine blessings and transformative experiences.",
    content: `
      <p>The Maha Kumbh 2025 at Prayagraj is set to be the most spectacular spiritual gathering in human history. This event occurs once every 144 years and attracts millions of devotees from around the world seeking spiritual purification and divine blessings.</p>
      <h2>Event Highlights</h2>
      <ul>
        <li>Sacred Baths on Auspicious Lunar Dates</li>
        <li>Participation from All Twelve Akharas (Spiritual Orders)</li>
        <li>Vedic Rituals and Chanting Ceremonies</li>
        <li>Spiritual Discourses from Enlightened Masters</li>
        <li>Cultural Programs and Ancient Traditions</li>
      </ul>
      <h2>Vandan Darshan's Maha Kumbh Services</h2>
      <p>We facilitate seamless participation in this sacred event with premium accommodation, priority sacred bath access, spiritual guidance, and complete logistics management.</p>
    `,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80",
    date: "Jan - Mar 2025",
    author: "Vandan Darshan",
    category: "Events",
    mediaType: "event"
  },
  {
    id: 8,
    slug: "ram-mandir-completion-celebrations",
    title: "Ram Mandir: Grand Reopening and Spiritual Celebrations",
    excerpt: "Discover the magnificent Ram Mandir in Ayodhya - a marvel of sacred architecture and devotion. Plan your divine visit to this newly consecrated sacred shrine.",
    content: `
      <p>The Ram Mandir in Ayodhya represents one of the most significant spiritual landmarks of modern times. After 500 years, Lord Ram has returned to his sacred abode, and millions are witnessing this momentous occasion.</p>
      <h2>Architectural Marvel</h2>
      <p>The temple showcases exquisite temple architecture with intricate carvings, stunning marble work, and acoustic chambers designed for optimal spiritual experience during rituals.</p>
      <h2>Spiritual Significance</h2>
      <p>The consecration of Ram Mandir marks the fulfillment of an ancient prophecy and represents the triumph of dharma (righteousness) over adharma (chaos).</p>
      <h2>Plan Your Visit</h2>
      <p>Vandan Darshan facilitates seamless pilgrimage experiences to Ram Mandir with priority darshan access, guided spiritual tours, and accommodation in sacred environments.</p>
    `,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80",
    date: "Ongoing",
    author: "Vandan Darshan",
    category: "News",
    mediaType: "news"
  },
  {
    id: 9,
    slug: "navratri-celebrations-2025",
    title: "Navratri 2025 - Nine Nights of Divine Feminine Energy",
    excerpt: "Join the magnificent Navratri celebrations across sacred temples in India. Nine nights of devotion, fasting, and spiritual transformation in honor of Goddess Shakti.",
    content: `
      <p>Navratri celebrates the nine forms of Goddess Shakti and represents the victory of good over evil. Each day honors a different manifestation of the divine feminine, bringing unique spiritual blessings and healing energies.</p>
      <h2>The Nine Days of Navratri</h2>
      <ul>
        <li><strong>Day 1-3:</strong> Durga Puja - The warrior goddess who destroys negativity</li>
        <li><strong>Day 4-6:</strong> Lakshmi Puja - The goddess of prosperity and abundance</li>
        <li><strong>Day 7-9:</strong> Saraswati Puja - The goddess of knowledge and wisdom</li>
      </ul>
      <h2>Sacred Observances</h2>
      <p>Devotees fast, perform rituals, dance the traditional Garba and Dandiya Raas, and seek blessings from the goddess for health, prosperity, and spiritual growth.</p>
      <h2>Vandan Darshan Navratri Services</h2>
      <p>Experience authentic Navratri celebrations at India's most sacred temples with guided spiritual experiences, ritual participation, and cultural immersion.</p>
    `,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80",
    date: "September - October 2025",
    author: "Vandan Darshan",
    category: "Festival",
    mediaType: "event"
  },
];
