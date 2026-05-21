export interface TempleData {
  name?: string;
  deity?: string;
  location?: string;
  state?: string;
  category?: string;
}

// Helper to deterministically get a random item from an array based on a seed string (like temple name)
function seededRandomItem<T>(seed: string, array: T[]): T {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % array.length;
  return array[index];
}

export const generateServiceContent = (type: string, templeName: string, templeData: TempleData) => {
  const deity = templeData?.deity || "the supreme deity";
  const location = templeData?.state || "India";
  const category = templeData?.category || "holy shrine";
  
  const seed = templeName + type;

  if (type === 'puja') {
    return {
      mainDescription: seededRandomItem(seed, [
        `Performing a sacred Puja at ${templeName} is considered highly auspicious. Dedicated to ${deity}, this ${category} draws devotees seeking profound spiritual elevation. By initiating a Sankalp here in your family's name, you align your inner energies with the cosmic vibrations of ${location}.`,
        `The divine aura of ${templeName} makes it a premier destination for Vedic rituals. Revering ${deity}, this ancient ${category} is renowned for fulfilling the heartfelt wishes of devotees. Engage verified priests to perform intricate Archanas, ensuring your prayers are channeled with utmost purity.`,
        `Invoke the eternal grace of ${deity} through an authentic Puja at ${templeName}. Situated in the spiritually charged lands of ${location}, this ${category} is deeply embedded in scriptural lore. Our platform ensures that genuine Vedic pandits conduct the ceremony strictly according to the agamas.`
      ]),
      benefits: [
        {
          title: "Astrological Dosha Nivaran",
          desc: seededRandomItem(seed + "b1", [
            `Specific archanas performed to ${deity} are highly effective in neutralizing planetary afflictions (doshas) present in your horoscope.`,
            `The powerful vibrations at this ${category} help pacify malefic planetary influences and bring cosmic harmony to your life.`,
            `Invoking ${deity}'s blessings helps in mitigating Navagraha doshas, paving the way for undisturbed success and peace.`
          ])
        },
        {
          title: "Karmic Cleansing & Spiritual Growth",
          desc: seededRandomItem(seed + "b2", [
            `Participating in a homam or abhishek here accelerates karmic purification, elevating your soul towards spiritual liberation (Moksha).`,
            `The sacred fire rituals (Yajnas) performed in your name at ${templeName} cleanse past karmic debts and invoke divine protection.`,
            `Bathing the idol of ${deity} with sacred panchamrit purifies the mind, fostering deep inner peace and clarity of thought.`
          ])
        },
        {
          title: "Family Prosperity & Health",
          desc: seededRandomItem(seed + "b3", [
            `A gotra-specific Sankalp ensures that the immense blessings of ${deity} envelop your entire lineage, granting longevity and robust health.`,
            `Rituals performed at this ${category} are known to resolve familial disputes, bless couples with progeny, and ensure financial stability.`,
            `Offer prayers for the well-being of your ancestors and the bright future of your descendants through specialized ancestral pujas.`
          ])
        }
      ],
      process: [
        { step: "Sankalp Creation", desc: "Share your full name, Gotra, and Nakshatra. The priest will take a personalized Sankalp on your behalf." },
        { step: "Vedic Ritual Execution", desc: "The Puja is performed with authentic samagri in the temple precincts while chanting powerful mantras." },
        { step: "Divine Blessings", desc: "Receive a digital recording or photos of the Sankalp, followed by the delivery of energised Prasad to your home." }
      ]
    };
  }

  if (type === 'prasad') {
    return {
      mainDescription: seededRandomItem(seed, [
        `The Prasadam of ${deity} from ${templeName} is not just an offering; it is a physical manifestation of divine grace. Prepared in the sacred temple kitchens of ${location}, every morsel is infused with holy chants and absolute purity.`,
        `Receive the direct blessings of ${deity} delivered to your doorstep. The sacred offerings at ${templeName}, a revered ${category}, carry immense spiritual energy. Consuming this Prasad brings peace, health, and a profound connection to the divine.`,
        `Embrace the sanctity of ${templeName} with our authentic Prasad delivery. After being offered to ${deity} during the most auspicious aartis in ${location}, the Prasad is carefully packed to retain its purity and divine vibrations until it reaches your home.`
      ]),
      benefits: [
        {
          title: "Infusion of Divine Energy",
          desc: seededRandomItem(seed + "b1", [
            `Consuming the Naivedyam offered to ${deity} transfers the pure, sattvic vibrations of the sanctum directly into your physical body.`,
            `The holy kitchen's sacred fire and continuous chanting imbue the Prasad with healing energies that rejuvenate the mind and soul.`,
            `Eating this sacred offering helps cleanse internal impurities and fosters a state of profound spiritual bliss.`
          ])
        },
        {
          title: "Blessings for the Household",
          desc: seededRandomItem(seed + "b2", [
            `Sharing the ${templeName} Prasad with family members distributes the divine grace, fostering love, unity, and harmony at home.`,
            `Keeping the holy thread (Moli) or Sindoor received with the Prasad acts as a protective talisman against negative forces.`,
            `The presence of the energized Prasad in your home invites prosperity and the constant protective gaze of ${deity}.`
          ])
        },
        {
          title: "Fulfillment of Vows (Mannat)",
          desc: seededRandomItem(seed + "b3", [
            `Accepting the Prasad is the culmination of your prayers and a physical confirmation that your devotion has been accepted by ${deity}.`,
            `For those unable to travel to ${location}, receiving the Prasad bridges the physical distance, completing your spiritual pilgrimage remotely.`,
            `It marks the successful completion of specific fasts or vows undertaken in reverence to this ${category}.`
          ])
        }
      ],
      process: [
        { step: "Sacred Preparation", desc: "The Prasad is prepared by initiated temple cooks using pure, sattvic ingredients in the holy temple kitchen." },
        { step: "Divine Offering", desc: "The preparation is offered as Naivedyam to the main deity during the prime Aarti, infusing it with cosmic energy." },
        { step: "Hygienic Transit", desc: "The blessed items are carefully vacuum-sealed and shipped via express delivery to maintain absolute purity and freshness." }
      ]
    };
  }

  if (type === 'chadhava') {
    return {
      mainDescription: seededRandomItem(seed, [
        `Offering Chadhava to ${deity} at ${templeName} is a profound expression of devotion and surrender. In the heart of ${location}, devotees present Vastram (garments), ornaments, or floral garlands to adorn the divine idol, seeking supreme blessings and grace.`,
        `Elevate your spiritual journey by adorning ${deity} at the historic ${templeName}. Providing Shringar or Vastram at this ${category} is a centuries-old tradition that symbolizes letting go of material attachments and embracing divine love.`,
        `Participate in the sacred adornment (Shringar) of ${deity} at ${templeName}. By offering a Chadhava, you visually and spiritually connect with the deity in ${location}, earning immense spiritual merit and expressing unparalleled gratitude.`
      ]),
      benefits: [
        {
          title: "Symbol of Complete Surrender",
          desc: seededRandomItem(seed + "b1", [
            `Offering Vastram (clothing) to ${deity} symbolizes stripping away the ego and clothing the soul in divine grace and humility.`,
            `Presenting ornaments or Mukut (crown) represents offering your wealth and achievements back to the supreme creator.`,
            `The act of Chadhava dissolves materialistic arrogance and fosters a deep, unshakeable bond with the divine.`
          ])
        },
        {
          title: "Earning Profound Spiritual Merit (Punya)",
          desc: seededRandomItem(seed + "b2", [
            `Scriptures state that adorning the deity at a ${category} multiplies spiritual merit exponentially, paving the way for Moksha.`,
            `Sponsoring the floral Shringar brings joy to the deity, which in turn manifests as happiness and vibrant energy in the devotee's life.`,
            `Offering a Deepam (lamp) or specific chadhava eradicates the darkness of ignorance and illuminates the path to self-realization.`
          ])
        },
        {
          title: "Fulfillment of Heartfelt Desires",
          desc: seededRandomItem(seed + "b3", [
            `Devotees often offer Chadhava upon the successful completion of a major life milestone, such as a wedding or childbirth, seeking continued blessings.`,
            `It is a powerful way to say 'Thank You' to ${deity} for prayers answered and difficulties overcome in your personal or professional life.`,
            `Specific offerings are prescribed to overcome distinct challenges, ensuring the protective embrace of ${templeName}'s presiding deity.`
          ])
        }
      ],
      process: [
        { step: "Selection of Offering", desc: "Choose from Sacred Vastram, Floral Shringar, Mukut, or Deepam based on your devotion and specific prayers." },
        { step: "Temple Adornment", desc: "Local representatives hand over the offering to the head priests, who adorn the deity during the designated Shringar Aarti." },
        { step: "Divine Acknowledgement", desc: "Receive visual confirmation (if permitted by temple rules) and the blessed return-prasad shipped to your home." }
      ]
    };
  }

  // Default Darshan or fallback
  return {
    mainDescription: `Experience the divine presence of ${deity} at ${templeName}. Situated in ${location}, this ${category} offers a profound spiritual experience. Let our team assist you in a smooth, priority darshan, avoiding long queues and ensuring your focus remains solely on devotion.`,
    benefits: [
      { title: "Priority Access", desc: "Skip the long, exhausting queues and get direct, peaceful access to the sanctum sanctorum." },
      { title: "Guided Assistance", desc: "Local spiritual guides will assist you with the temple protocols, timings, and local legends." },
      { title: "Peace of Mind", desc: "Focus entirely on your prayers and connection with the divine while we handle the logistics." }
    ],
    process: [
      { step: "Booking Confirmation", desc: "Select your preferred date and time for the VIP Darshan experience." },
      { step: "Local Coordination", desc: "Meet our local representative at the designated point near the temple premises." },
      { step: "Seamless Darshan", desc: "Enjoy a guided, hassle-free entry and a deeply fulfilling spiritual encounter." }
    ]
  };
};
