import { ArrowRight, Calendar, User, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { blogs as allBlogs } from "@/data/blogs";

const blogs = allBlogs.slice(0, 3);

export const BlogPreview = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container-prose">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-4">Divine Wisdom</h2>
            <h3 className="font-serif-display text-4xl md:text-5xl font-bold text-secondary leading-tight">Spiritual <span className="text-primary italic">Chronicles</span></h3>
            <p className="text-muted-foreground mt-6 font-medium leading-relaxed">Deepen your understanding of ancient traditions, rituals, and the celestial world through our curated blogs.</p>
          </div>
          <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white rounded-full px-8">
            <Link to="/media">Explore All Blogs <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-10"
        >
          {blogs.map((blog) => (
            <motion.article 
              key={blog.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 }
              }}
              className="group cursor-pointer"
            >
              <motion.div 
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative aspect-[16/10] rounded-[3rem] overflow-hidden mb-8 shadow-soft group-hover:shadow-2xl transition-all duration-500"
              >
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                  <Link to={`/media/blogs/${blog.slug}`} className="inline-block text-[10px] font-black uppercase tracking-widest text-gold bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 hover:bg-gold hover:text-white transition-colors">
                    Read Chronicles ॥
                  </Link>
                </div>
              </motion.div>
              <div className="px-4">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-4">
                  <span className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> {blog.date}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-gold/40" />
                  <span className="flex items-center gap-2"><User className="h-3.5 w-3.5" /> {blog.author}</span>
                </div>
                <h4 className="font-serif-display text-2xl md:text-3xl font-bold text-secondary group-hover:text-primary transition-colors mb-4 leading-tight">
                  {blog.title}
                </h4>
                <p className="text-muted-foreground text-base line-clamp-2 leading-relaxed mb-6 font-medium">
                  {blog.excerpt}
                </p>
                <Link to={`/media/blogs/${blog.slug}`} className="inline-flex items-center text-xs font-black uppercase tracking-[0.3em] text-primary gap-2 group/btn">
                  Read Article <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
