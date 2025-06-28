// src/components/atoms/NewsletterForm.tsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Email submitted:", email);
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail("");
    
    // Reset success state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">Newsletter</h3>
      <p className="text-gray-300 mb-6 leading-relaxed">
        Daftarkan email kamu untuk update program terbaru dari komunitas Bangunkota.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Alamat Email"
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:bg-white/15 transition-all duration-300"
            required
            disabled={isLoading || isSubmitted}
          />
          <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <motion.button
          type="submit"
          disabled={isLoading || isSubmitted}
          className="w-full bg-gradient-primary text-white font-bold py-4 rounded-2xl hover:shadow-yellow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
          whileHover={{ scale: isLoading || isSubmitted ? 1 : 1.02 }}
          whileTap={{ scale: isLoading || isSubmitted ? 1 : 0.98 }}
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              <span>Mengirim...</span>
            </>
          ) : isSubmitted ? (
            <>
              <Check className="w-5 h-5" />
              <span>Berhasil!</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Berlangganan</span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default NewsletterForm;