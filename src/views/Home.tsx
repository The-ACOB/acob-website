import { motion } from 'framer-motion';
import { HeroGeometric } from "./components/ui/shape-landing-hero";
import { ContainerScroll } from "./components/ui/container-scroll-animation";
import { Brain, Target, Zap, GraduationCap, Users, Rocket, ExternalLink, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-page bg-[#030303] text-white">
      {/* Hero Section with Geometric Shapes */}
      <HeroGeometric 
        badge="Applied Intelligence Evolution"
        title1="Elevate Your"
        title2="Cognitive Vision"
      />

      {/* Philosophy Section with Scroll Animation */}
      <section className="relative">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center">
              <p className="text-[10px] uppercase tracking-[0.8em] text-cyan-400 font-bold mb-6">Our Philosophy</p>
              <h2 className="text-4xl md:text-7xl font-heading mb-12 max-w-4xl text-center leading-tight">
                THINKING <span className="text-zinc-800">VS</span> <br/>
                <span className="gradient-text italic-accent">MEMORIZING</span>
              </h2>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 h-full">
            {[
              { 
                icon: <Brain className="text-purple-500" size={32} />, 
                title: "Cognitive Synthesis", 
                desc: "Moving beyond rote learning to foster deep analytical thinking and complex problem solving." 
              },
              { 
                icon: <Target className="text-cyan-500" size={32} />, 
                title: "Applied Rigor", 
                desc: "Our olympiads are designed to test the application of STEM principles in simulated real-world scenarios." 
              },
              { 
                icon: <Zap className="text-yellow-500" size={32} />, 
                title: "Rapid Iteration", 
                desc: "Developing the agility to pivot strategies when faced with novel challenges and data sets." 
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-zinc-900 p-8 md:p-12 flex flex-col justify-center items-center text-center group border border-white/5">
                <div className="mb-8 opacity-60 group-hover:opacity-100 transition-all scale-125">{feature.icon}</div>
                <h3 className="text-xl font-heading mb-6 tracking-widest uppercase">{feature.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors font-body">{feature.desc}</p>
              </div>
            ))}
          </div>
        </ContainerScroll>
      </section>

      {/* Bento Grid Section */}
      <section className="py-48 bg-[#030303]">
        <div className="container">
          <div className="text-center mb-32">
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-6 font-body">Value Ecosystem</p>
            <h2 className="text-4xl md:text-6xl font-heading uppercase">BEYOND THE <span className="gradient-text italic-accent">CLASSROOM</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[350px]">
            {/* Card 1 */}
            <div className="md:col-span-8 glass border-white/5 p-16 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <Rocket size={240} className="text-white" />
              </div>
              <div>
                <GraduationCap className="text-cyan-500 mb-8" size={40} />
                <h3 className="text-3xl font-heading mb-6 uppercase">Elite Academic Edge</h3>
                <p className="text-zinc-500 max-w-md text-sm leading-relaxed group-hover:text-zinc-300 transition-colors font-body">
                  Master the core STEM principles through practical application. Our curriculum is built on international standards of excellence.
                </p>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-4 group-hover:text-cyan-400 transition-colors font-body">
                Explore Curriculum <ArrowRight size={14} />
              </div>
            </div>

            {/* Card 2 */}
            <div className="md:col-span-4 glass border-white/5 p-16 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute -bottom-12 -right-12 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity rotate-12">
                <Users size={200} className="text-white" />
              </div>
              <div>
                <Users className="text-purple-500 mb-8" size={40} />
                <h3 className="text-2xl font-heading mb-6 uppercase">Global Network</h3>
                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors font-body">
                  Join a community of high-achievers and mentors from world-class institutions.
                </p>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-4 group-hover:text-purple-400 transition-colors font-body">
                Join Us <ExternalLink size={14} />
              </div>
            </div>

            {/* Card 3 */}
            <div className="md:col-span-4 glass border-white/5 p-16 flex flex-col justify-between group overflow-hidden relative">
              <div>
                <Zap className="text-yellow-500 mb-8" size={40} />
                <h3 className="text-2xl font-heading mb-6 uppercase">2030 Ready</h3>
                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors font-body">
                  Equipping the next generation with adaptability, critical analysis, and technical fluency.
                </p>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-4 group-hover:text-yellow-500 transition-colors font-body">
                View Roadmap <ArrowRight size={14} />
              </div>
            </div>

            {/* Card 4 */}
            <div className="md:col-span-8 glass border-white/5 p-16 flex flex-col justify-between group relative bg-gradient-to-br from-zinc-900 to-black overflow-hidden">
               <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.08),transparent_70%)]" />
               <div>
                <h3 className="text-4xl font-heading mb-6 uppercase">Applied Intelligence <br/><span className="gradient-text italic-accent">Certificate</span></h3>
                <p className="text-zinc-500 max-w-md text-sm leading-relaxed font-body">
                  Earn a globally recognized credential that validates your cognitive synthesis and problem-solving abilities.
                </p>
              </div>
              <button className="self-start px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:scale-105 transition-all font-body">
                Get Certified
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* High-Impact CTA */}
      <section className="py-64 relative overflow-hidden">
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-9xl font-heading mb-16 tracking-tighter uppercase">
              READY TO <br/> <span className="gradient-text italic-accent">TRANSFORM?</span>
            </h2>
            <div className="flex justify-center gap-12">
               <button className="px-16 py-8 glass border-white/20 text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all rounded-sm font-body">
                Begin the Journey
              </button>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-600/5 rounded-full blur-[200px] pointer-events-none" />
      </section>
    </div>
  );
};

export default Home;
