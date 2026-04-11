import { Link } from 'react-router-dom';
import { Mail, Globe, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-32 border-t border-white/5 relative overflow-hidden bg-[#030303]">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-32">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-4 mb-10">
              <img src="/assets/branding/logo-white.png" alt="ACOB" className="h-10 w-auto" />
              <span className="font-heading text-2xl tracking-[0.2em] uppercase">ACOB</span>
            </Link>
            <p className="text-zinc-500 max-w-sm mb-12 text-sm leading-relaxed font-light font-body">
              Applied Cognitio Olympiad Bangladesh is an elite academic platform dedicated to the advancement of STEM-applied intelligence and cognitive synthesis.
            </p>
            <div className="flex gap-6">
              <a href="https://www.facebook.com/profile.php?id=61582673745324" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-sm glass flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
                <Share2 size={18} />
              </a>
              <a href="mailto:official.acobd@gmail.com" className="w-12 h-12 rounded-sm glass flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
                <Mail size={18} />
              </a>
              <a href="#" className="w-12 h-12 rounded-sm glass flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
                <Globe size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] mb-10 text-zinc-600 font-bold font-body">Architecture</h4>
            <ul className="space-y-6">
              <li><Link to="/" className="text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold font-body">Mission Story</Link></li>
              <li><Link to="/team" className="text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold font-body">The Triumvirate</Link></li>
              <li><Link to="/jobs" className="text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold font-body">Strategic Careers</Link></li>
              <li><Link to="/contact" className="text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold font-body">Communication</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] mb-10 text-zinc-600 font-bold font-body">Ecosystem</h4>
            <ul className="space-y-6">
               <li><a href="#" className="text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold font-body">Twitter / X</a></li>
               <li><a href="https://www.facebook.com/profile.php?id=61582673745324" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold font-body">Facebook</a></li>
               <li><a href="#" className="text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold font-body">LinkedIn</a></li>
               <li><a href="#" className="text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold font-body">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-700 font-bold font-body">
            Built by <span className="text-zinc-400">Glitched Tech</span>. [2026] All Rights Reserved.
          </p>
          <div className="flex gap-12">
            <a href="#" className="text-[10px] uppercase tracking-[0.3em] text-zinc-700 hover:text-white font-bold transition-colors font-body">Privacy Protocols</a>
            <a href="#" className="text-[10px] uppercase tracking-[0.3em] text-zinc-700 hover:text-white font-bold transition-colors font-body">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
