// src/components/organisms/Footer.tsx
'use client'
import React, { memo } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin
} from "lucide-react";

// Atoms
import { 
  AnimatedOrb,
  LogoAnimated,
  FooterLink,
  ContactItem,
  SocialLink,
  NewsletterForm,
  Copyright
} from "@/components/atoms";

// Molecules
import { FooterSection } from "@/components/molecules";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Data
const socialLinks = [
  { 
    name: "Instagram", 
    icon: Instagram, 
    url: "https://instagram.com/bangunkota", 
    color: "hover:text-pink-400 hover:bg-pink-400/10" 
  },
  { 
    name: "Twitter", 
    icon: Twitter, 
    url: "https://twitter.com/bangunkota", 
    color: "hover:text-blue-400 hover:bg-blue-400/10" 
  },
  { 
    name: "YouTube", 
    icon: Youtube, 
    url: "https://youtube.com/@bangunkota", 
    color: "hover:text-red-400 hover:bg-red-400/10" 
  },
  { 
    name: "LinkedIn", 
    icon: Linkedin, 
    url: "https://linkedin.com/company/bangunkota", 
    color: "hover:text-blue-600 hover:bg-blue-600/10" 
  },
];

const navigationLinks = [
  { name: "Tentang Kami", href: "#about" },
  { name: "Program", href: "#programs" },
  { name: "Media", href: "#media" },
  { name: "Mitra", href: "#partners" },
  { name: "Dampak", href: "#impact" },
  { name: "Kontak", href: "#contact" },
];

const infoLinks = [
  { name: "Kebijakan Privasi", href: "/privacy" },
  { name: "Syarat & Ketentuan", href: "/terms" },
  { name: "FAQ", href: "/faq" },
  { name: "Panduan Komunitas", href: "/guide" },
];

const contactInfo = [
  { 
    icon: MapPin, 
    text: "Bekasi, Jawa Barat, Indonesia",
    color: "text-accent-orange-400"
  },
  { 
    icon: Mail, 
    text: "halo@bangunkota.id",
    href: "mailto:halo@bangunkota.id",
    color: "text-primary-400"
  },
  { 
    icon: Phone, 
    text: "+62 812 3456 7890",
    href: "tel:+6281234567890",
    color: "text-secondary-400"
  },
];

const Footer = memo(() => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <AnimatedOrb 
          position="top-0 left-0" 
          color="bg-primary-400/10" 
          size="w-96 h-96" 
        />
        <AnimatedOrb 
          position="bottom-0 right-0" 
          color="bg-secondary-400/10" 
          size="w-80 h-80" 
          delay={2}
        />
        <AnimatedOrb 
          position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
          color="bg-accent-orange-400/5" 
          size="w-72 h-72" 
          delay={4}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(234,179,8,0.03),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* Brand Section */}
            <motion.div 
              className="lg:col-span-5 space-y-6"
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: "easeInOut" }
                }
              }}
            >
              <LogoAnimated />

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Ruang bersama untuk{" "}
                <span className="text-primary-400 font-semibold">berkarya</span>,{" "}
                <span className="text-secondary-400 font-semibold">bersinergi</span>, dan{" "}
                <span className="text-accent-orange-400 font-semibold">membangun kota</span>{" "}
                yang inklusif & berkelanjutan.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((contact) => (
                  <ContactItem
                    key={contact.text}
                    icon={contact.icon}
                    text={contact.text}
                    href={contact.href}
                    color={contact.color}
                  />
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <SocialLink
                    key={social.name}
                    icon={social.icon}
                    url={social.url}
                    color={social.color}
                  />
                ))}
              </div>
            </motion.div>

            {/* Navigation Links */}
            <FooterSection title="Navigasi">
              <ul className="space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href}>
                      {link.name}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </FooterSection>

            {/* Information Links */}
            <FooterSection title="Informasi">
              <ul className="space-y-3">
                {infoLinks.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href}>
                      {link.name}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </FooterSection>

            {/* Newsletter Section */}
            <motion.div 
              className="lg:col-span-3"
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: "easeInOut" }
                }
              }}
            >
              <NewsletterForm />
            </motion.div>
          </div>

          {/* Bottom Section */}
          <Copyright />
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;