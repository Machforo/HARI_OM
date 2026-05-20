import { SEO } from "@/components/SEO";
import { blogs, MEDIA_TYPES } from "@/data/blogs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Sparkles, Play, FileText, Newspaper } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type MediaType = 'blog' | 'aarti' | 'news' | 'event';

const mediaTypeConfig = {
  blog: {
    label: 'Blogs',
    icon: FileText,
    description: 'Explore ancient temple legends and spiritual wisdom'
  },
  aarti: {
    label: 'Aarti',
    icon: Play,
    description: 'Watch sacred aarti ceremonies from India\'s holiest shrines'
  },
  news: {
    label: 'News',
    icon: Newspaper,
    description: 'Latest spiritual news and announcements'
  },
  event: {
    label: 'Events',
    icon: Sparkles,
    description: 'Upcoming spiritual festivals and events'
  }
};

const SpiritualMedia = () => {
  const [activeType, setActiveType] = useState<MediaType>('blog');

  // Filter content by media type
  const filteredContent = blogs.filter(item => (item.mediaType || 'blog') === activeType);

  return (
    <div className="bg-background">
      <SEO
        title="Spiritual Media — Divine Aartis, Blogs, News & Events | Vandan Darshan"
        description="Immerse yourself in sacred aartis, spiritual wisdom blogs, temple news, and upcoming spiritual events. Discover the beauty of Indian traditions through curated spiritual content."
      />

      {/* HERO SECTION */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://harichetan.com/wp-content/uploads/2025/01/Chanting.jpg"
            alt="Spiritual Media Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1240]/95 via-[#1A1240]/50 to-transparent" />
        </div>

        <div className="container-prose relative z-10 h-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/20 text-gold mb-8 border border-gold/30"
          >
            <Sparkles className="h-10 w-10" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-8xl font-bold text-white mb-6 leading-tight"
          >
            Spiritual <span className="text-gold italic">Media</span>
          </motion.h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
            Experience the divine through sacred aartis, profound spiritual wisdom, temple news, and celestial events from India's holiest shrines.
          </p>
        </div>
      </section>

      {/* MEDIA TYPE TABS */}
      <section className="py-12 bg-white sticky top-0 z-40 border-b border-gold/10 shadow-soft">
        <div className="container-prose">
          <div className="flex flex-wrap justify-center gap-3">
            {(Object.entries(mediaTypeConfig) as [MediaType, typeof mediaTypeConfig['blog']][]).map(([type, config]) => {
              const Icon = config.icon;
              const count = blogs.filter(item => (item.mediaType || 'blog') === type).length;

              return (
                <motion.button
                  key={type}
                  onClick={() => setActiveType(type)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2 border-2",
                    activeType === type
                      ? "bg-primary border-primary text-white shadow-lg"
                      : "border-gold/30 text-secondary hover:border-gold/60"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {config.label} ({count})
                </motion.button>
              );
            })}
          </div>

          {/* Type Description */}
          <motion.p
            key={activeType}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-muted-foreground mt-6 font-medium"
          >
            {mediaTypeConfig[activeType].description}
          </motion.p>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="py-24 bg-white relative">
        <div className="container-prose">
          <motion.div
            key={activeType}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20"
          >
            {filteredContent.length > 0 ? (
              filteredContent.map((item, i) => {
                const isAarti = (item.mediaType || 'blog') === 'aarti';

                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <Link to={`/blogs/${item.slug}`}>
                      <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-10 shadow-soft group-hover:shadow-temple transition-all duration-700">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-700" />

                        {/* Category Badge */}
                        <div className="absolute top-8 left-8">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white bg-primary/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl">
                            {item.category}
                          </span>
                        </div>

                        {/* Video Play Button for Aarti */}
                        {isAarti && (
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center group-hover:bg-black/40 transition-colors"
                          >
                            <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                              <Play className="h-6 w-6 text-primary group-hover:text-white ml-1" fill="currentColor" />
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Content Info */}
                      <div className="px-4">
                        <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-5">
                          <span className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5" /> {item.date}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-gold/40" />
                          <span className="flex items-center gap-2">
                            <User className="h-3.5 w-3.5" /> {item.author}
                          </span>
                        </div>
                        <h2 className="font-serif-display text-3xl font-bold text-secondary group-hover:text-primary transition-colors mb-5 leading-tight">
                          {item.title}
                        </h2>
                        <p className="text-muted-foreground text-base line-clamp-3 leading-[1.8] mb-8 font-medium">
                          {item.excerpt}
                        </p>

                        {/* Duration for Video */}
                        {isAarti && item.duration && (
                          <p className="text-xs text-gold font-bold uppercase tracking-widest mb-4">
                            ⏱️ Duration: {item.duration}
                          </p>
                        )}

                        <div className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-primary gap-3 group-hover:gap-5 transition-all">
                          {isAarti ? 'Watch Now' : 'Read More'} <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <Sparkles className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">Coming soon! Check back for exciting spiritual content.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="py-32 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/assets/images/temples/pattern.png')] bg-repeat" />
        <div className="container-prose relative z-10">
          <div className="bg-white rounded-[4rem] p-12 md:p-24 text-center shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
              <Sparkles className="h-64 w-64 text-primary" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-6">
                Stay Connected with Spiritual Wisdom
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Subscribe to receive curated spiritual content, exclusive aartis, upcoming events, and divine wisdom directly to your inbox.
              </p>

              <div className="max-w-md mx-auto flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full border border-gold/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-bold uppercase tracking-widest text-sm transition-all">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-24 bg-white">
        <div className="container-prose">
          <div className="text-center mb-16">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-4">Why Spiritual Media</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-secondary">
              Deepen Your Spiritual <span className="text-gold italic">Connection</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "🎬",
                title: "Live Sacred Aartis",
                desc: "Experience the most mesmerizing aarti ceremonies from India's holiest temples, bringing divine vibrations directly to your home."
              },
              {
                icon: "📚",
                title: "Spiritual Wisdom",
                desc: "Deepen your understanding of ancient rituals, temple significance, and the profound meaning behind every spiritual practice."
              },
              {
                icon: "📰",
                title: "Temple News",
                desc: "Stay updated with the latest happenings at sacred shrines, including important announcements and spiritual discoveries."
              },
              {
                icon: "🎉",
                title: "Festival Calendar",
                desc: "Never miss an important spiritual event. Get detailed information about upcoming festivals and sacred celebrations."
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-gradient-cream rounded-3xl border border-border/20 hover:shadow-lg transition-all"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h4 className="font-serif font-bold text-secondary text-xl mb-3">{benefit.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO RICH CONTENT SECTION */}
      <section className="py-24 bg-muted/30">
        <div className="container-prose max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl p-12 md:p-16 space-y-6 shadow-soft border border-gold/10">
            <h2 className="font-serif text-3xl font-bold text-secondary">
              The Sacred Power of Aartis in Hindu Spirituality
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              An aarti is one of the most fundamental and beautiful rituals in Hinduism, performed at sacred temples across India for centuries. 
              The word 'aarti' comes from the Sanskrit word 'aratrika', which means the removal of darkness. Through the ritual of aarti, 
              devotees seek the divine blessings of the deity and purify their hearts and minds.
            </p>

            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-secondary">The Significance of Sacred Ceremonies</h3>
              <p className="text-muted-foreground leading-relaxed">
                Each aarti performed at India's holiest shrines carries deep spiritual significance. The lighting of lamps symbolizes 
                the dispelling of ignorance and the illumination of the path to enlightenment. The chanting of Vedic mantras during aarti 
                creates a powerful energetic field that uplifts the consciousness of all participants.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-secondary">Connect with Divine Energy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Through our Spiritual Media platform, you can witness and participate in the most sacred aartis performed at temples like 
                Kashi Vishwanath, Kedarnath, Varanasi Ganga Aarti, and many more. Each ceremony is a gateway to experiencing the divine presence 
                and receiving spiritual blessings from the comfort of your home. The Vandan Darshan community connects millions of devotees 
                seeking authentic spiritual experiences and divine connection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpiritualMedia;
