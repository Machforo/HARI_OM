import { SEO } from "@/components/SEO";
import { blogs } from "@/data/blogs";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, ArrowRight, Share2, Sparkles, MapPin, Heart, BookOpen, Clock, Eye, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find(b => b.slug === slug);
  
  // Calculate reading time
  const readingTime = Math.ceil(blog?.content.split(' ').length / 200) || 5;

  if (!blog) {
    return (
      <div className="container-prose py-40 text-center">
        <h1 className="text-4xl font-bold mb-8">Article not found</h1>
        <Button onClick={() => navigate("/blogs")}>Back to Blogs</Button>
      </div>
    );
  }

  // Get related articles
  const relatedArticles = blogs
    .filter(b => b.id !== blog.id && b.category === blog.category)
    .slice(0, 3);

  return (
    <div className="bg-background">
      <SEO title={`${blog.title} | Vandan Darshan`} description={blog.excerpt} />

      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="h-full w-full object-cover animate-fade-in" 
          />
        </div>
        
        <div className="container-prose relative z-20">
          <div className="max-w-4xl">
            <Link 
              to="/blogs" 
              className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-12 hover:text-white transition-all bg-secondary/20 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10 hover:bg-secondary/40"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Spiritual Media
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary bg-primary/20 px-4 py-2 rounded-full">
                  {blog.category}
                </span>
                {blog.mediaType && (
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gold bg-gold/20 px-4 py-2 rounded-full">
                    {blog.mediaType}
                  </span>
                )}
              </div>
              <h1 className="font-serif-display text-5xl md:text-8xl font-bold text-white leading-[1.1] tracking-tight drop-shadow-lg">
                {blog.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* METADATA & QUICK STATS */}
      <section className="py-8 bg-secondary/5 border-b border-gold/10 sticky top-0 z-30">
        <div className="container-prose">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">By</span>
                  <span className="font-bold text-secondary text-sm block">{blog.author}</span>
                </div>
              </div>
              <div className="h-8 w-px bg-border"></div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium">{blog.date}</span>
              </div>
              <div className="h-8 w-px bg-border"></div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium">{readingTime} min read</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="h-10 w-10 rounded-full bg-white border border-border hover:bg-gold hover:text-white transition-all flex items-center justify-center text-secondary">
                <Bookmark className="h-5 w-5" />
              </button>
              <button className="h-10 w-10 rounded-full bg-white border border-border hover:bg-primary hover:text-white transition-all flex items-center justify-center text-secondary">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="py-24 bg-white relative">
        <div className="container-prose grid lg:grid-cols-3 gap-24">
          {/* ARTICLE */}
          <article className="lg:col-span-2 space-y-8">
            {/* EXCERPT HIGHLIGHT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-primary/10 to-gold/10 border-l-4 border-primary p-8 rounded-xl"
            >
              <p className="font-serif-display text-2xl font-bold text-secondary leading-relaxed italic">
                "{blog.excerpt}"
              </p>
            </motion.div>

            {/* CONTENT */}
            <div 
              className="prose prose-lg max-w-none docx-content blog-content font-medium text-muted-foreground/90 leading-[1.9] space-y-6"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* KEY TAKEAWAYS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gold/5 border border-gold/20 rounded-3xl p-12"
            >
              <h2 className="font-serif-display text-3xl font-bold text-secondary mb-8 flex items-center gap-3">
                <span className="h-10 w-10 rounded-full bg-gold text-white flex items-center justify-center text-lg">✨</span>
                Key Takeaways
              </h2>
              <ul className="space-y-4">
                {[
                  "Understanding ancient spiritual practices enhances modern devotion",
                  "Sacred rituals connect us with divine consciousness and cosmic energy",
                  "Consistency and sincerity in practice amplify spiritual benefits",
                  "Each temple has unique vibrations and specific spiritual significance"
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <span className="text-gold font-bold text-lg flex-shrink-0">→</span>
                    <span className="text-secondary font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* VIDEO EMBED FOR AARTI */}
            {blog.videoUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="font-serif-display text-2xl font-bold text-secondary flex items-center gap-2">
                  <Eye className="h-6 w-6 text-gold" /> Watch This Ceremony
                </h3>
                <div className="relative rounded-3xl overflow-hidden shadow-temple bg-black aspect-video">
                  <iframe
                    width="100%"
                    height="600"
                    src={blog.videoUrl}
                    title={blog.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                {blog.duration && (
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gold" />
                    Video Duration: {blog.duration}
                  </p>
                )}
              </motion.div>
            )}

            {/* SPIRITUAL DIVIDER */}
            <div className="my-16 flex items-center justify-center gap-8 opacity-20">
               <div className="h-px w-full bg-gradient-to-r from-transparent to-secondary"></div>
               <div className="font-devanagari text-4xl text-secondary select-none">॥ ॐ ॥</div>
               <div className="h-px w-full bg-gradient-to-l from-transparent to-secondary"></div>
            </div>

            {/* AUTHOR BIO EXPANDED */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-cream rounded-3xl p-8 border border-border/40"
            >
              <div className="flex gap-6 items-start">
                <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                  <User className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="font-serif-display text-2xl font-bold text-secondary mb-2">About {blog.author}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Expert spiritual guide with deep knowledge of Hindu rituals, temple traditions, and ancient Vedic wisdom. Dedicated to sharing authentic spiritual knowledge with devotees worldwide.
                  </p>
                  <div className="flex gap-4">
                    <span className="px-4 py-2 bg-gold/10 border border-gold/30 text-gold rounded-full text-xs font-bold uppercase tracking-widest">
                      Spiritual Guide
                    </span>
                    <span className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                      Temple Expert
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SHARE & ENGAGEMENT */}
            <div className="flex items-center justify-between pt-12 border-t border-border/40">
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Share This Wisdom</span>
                <div className="flex gap-3">
                  <button className="h-12 w-12 rounded-full border border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="h-12 w-12 rounded-full border border-border bg-white hover:bg-gold hover:text-white hover:border-gold transition-all flex items-center justify-center">
                    <Bookmark className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Eye className="h-4 w-4" />
                <span>1.2K Views</span>
              </div>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="space-y-12">
            <div className="sticky top-48 space-y-12">
              {/* SERVICES CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gold/20 to-primary/10 p-10 rounded-[3rem] border border-gold/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Sparkles className="h-32 w-32 text-gold" />
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-secondary mb-8 relative z-10">Experience These Services</h3>
                <div className="space-y-3 relative z-10">
                  {[
                    { label: "Special Darshan", path: "/services", icon: Sparkles },
                    { label: "Pooja Services", path: "/services", icon: Heart },
                    { label: "Chadhava Offerings", path: "/services", icon: MapPin },
                    { label: "Prasad Delivery", path: "/services", icon: Gift }
                  ].map((item) => (
                    <Link 
                      key={item.label} 
                      to={item.path}
                      className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-border/40 hover:border-gold hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold text-secondary">{item.label}</span>
                      </div>
                      <ArrowRight className="h-3 w-3 text-gold opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* RELATED ARTICLES */}
              {relatedArticles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border border-border/40 rounded-[3rem] p-8"
                >
                  <h3 className="font-serif-display text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-gold" />
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.map((article) => (
                      <Link
                        key={article.id}
                        to={`/blogs/${article.slug}`}
                        className="group block p-4 rounded-xl border border-border/40 hover:border-primary hover:bg-primary/5 transition-all"
                      >
                        <p className="font-bold text-secondary text-sm group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">{article.date}</p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CONTACT CARD */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-secondary p-10 rounded-[3rem] text-white relative overflow-hidden shadow-temple"
              >
                <div className="absolute inset-0 opacity-10 bg-[url('/assets/images/temples/pattern.png')] bg-repeat" />
                <div className="relative z-10 text-center space-y-6">
                  <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mx-auto border border-white/10">
                    <Heart className="h-8 w-8 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif-display text-2xl font-bold mb-3">Need Guidance?</h3>
                    <p className="text-white/80 text-sm leading-relaxed">Our spiritual concierge team is available 24/7 to assist with your sacred journey.</p>
                  </div>
                  <a 
                    href="tel:+918960965151" 
                    className="w-full h-14 bg-gold text-secondary font-black rounded-full flex items-center justify-center uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-xl hover:shadow-2xl"
                  >
                    Call Now ♡
                  </a>
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED CONTENT SECTION */}
      {relatedArticles.length > 0 && (
        <section className="py-24 bg-muted/30">
          <div className="container-prose">
            <div className="text-center mb-16">
              <h2 className="font-serif-display text-4xl font-bold text-secondary mb-4">More Spiritual Wisdom</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Explore more articles from the {blog.category} category</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((article, idx) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-temple transition-all group"
                >
                  <Link to={`/blogs/${article.slug}`}>
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity" />
                    </div>
                    <div className="p-6">
                      <span className="inline-block text-[9px] font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 px-3 py-1 rounded-full mb-4">
                        {article.category}
                      </span>
                      <h3 className="font-serif-display text-xl font-bold text-secondary group-hover:text-primary transition-colors mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {article.date}
                        </span>
                        <span className="text-gold font-bold">Read More →</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

import { Gift } from "lucide-react";

export default BlogPost;
