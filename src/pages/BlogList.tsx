import { SEO } from "@/components/SEO";
import { blogs } from "@/data/blogs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Sparkles } from "lucide-react";

const BlogList = () => {
  return (
    <div className="bg-background">
      <SEO 
        title="Spiritual Wisdom — Divine Insights & Pilgrimage Guides | Vandan Darshan" 
        description="Deepen your understanding of ancient Indian traditions, rituals, and sacred destinations through our curated spiritual blogs."
      />

      <section className="pt-48 pb-24 bg-gradient-cream overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/assets/images/temples/pattern.png')] bg-repeat" />
        <div className="container-prose text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gold/10 text-gold mb-10 border border-gold/10"
          >
            <Sparkles className="h-10 w-10" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif-display text-5xl md:text-8xl font-bold text-secondary mb-8 leading-tight"
          >
            Spiritual <span className="text-primary italic">Wisdom</span>
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Explore ancient temple legends, ritual significance, and sacred journey guides curated for your spiritual growth.
          </p>
          <div className="flex items-center justify-center gap-4 opacity-30">
             <div className="h-px w-20 bg-gold"></div>
             <div className="font-devanagari text-2xl text-gold">॥ ॐ ॥</div>
             <div className="h-px w-20 bg-gold"></div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        <div className="container-prose">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {blogs.map((blog, i) => (
              <motion.article 
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Link to={`/blogs/${blog.slug}`}>
                  <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-10 shadow-soft group-hover:shadow-temple transition-all duration-700">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                    <div className="absolute top-8 left-8">
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white bg-primary/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl">
                         {blog.category}
                       </span>
                    </div>
                  </div>
                  <div className="px-4">
                    <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-5">
                      <span className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> {blog.date}</span>
                      <span className="h-1 w-1 rounded-full bg-gold/40" />
                      <span className="flex items-center gap-2"><User className="h-3.5 w-3.5" /> {blog.author}</span>
                    </div>
                    <h2 className="font-serif-display text-3xl font-bold text-secondary group-hover:text-primary transition-colors mb-5 leading-tight">
                      {blog.title}
                    </h2>
                    <p className="text-muted-foreground text-base line-clamp-3 leading-[1.8] mb-8 font-medium">
                      {blog.excerpt}
                    </p>
                    <div className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-primary gap-3 group-hover:gap-5 transition-all">
                      Read Revelation <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER / CTA */}
      <section className="py-32 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/assets/images/temples/pattern.png')] bg-repeat" />
        <div className="container-prose relative z-10">
          <div className="bg-white rounded-[4rem] p-12 md:p-24 text-center shadow-2xl border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
               <Sparkles className="h-64 w-64 text-primary" />
             </div>
            <h2 className="font-serif-display text-4xl md:text-6xl font-bold text-secondary mb-8 leading-tight">Connect with the <span className="text-primary italic">Divine</span> Essence</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">Join our blessed community to receive weekly updates on rituals, festivals, and sacred insights.</p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-5" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 h-16 rounded-full border-2 border-border/40 px-8 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold text-secondary transition-all" 
              />
              <button className="h-16 px-10 bg-primary text-white font-black rounded-full uppercase tracking-[0.3em] text-[10px] hover:bg-secondary hover:shadow-xl transition-all shadow-primary/30">
                Subscribe ॥
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogList;
