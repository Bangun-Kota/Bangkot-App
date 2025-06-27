'use client'

import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import ValueSection from '@/sections/ValueSection'
import VisionMissionSection from '@/sections/VisionMissionSection'
import OurServicesSection from '@/sections/OurServicesSection'
import ProgramsSection from '@/sections/ProgramsSection'
import CommunityAreasSection from '@/sections/CommunityAreasSection'
import ProjectSection from '@/sections/ProjectSection'
import ImpactSection from '@/sections/ImpactSection'
import OurTeamSection from '@/sections/OurTeamSection'
import MediaSection from '@/sections/MediaSection'
import PartnershipSection from '@/sections/PartnershipSection'
import CTASection from '@/sections/CTASection'
import ContactSection from '@/sections/ContactSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function LandingPage() {
  return (
    <>
        <Header />
        {/* 1. Hook - Tarik perhatian pengunjung */}
        <HeroSection />
        
        {/* 2. Foundation - Bangun kepercayaan */}
        <AboutSection />
        <ValueSection />
        <VisionMissionSection />
        
        {/* 3. Offerings - Tampilkan layanan/solusi */}
        <OurServicesSection />
        <ProgramsSection />
        <CommunityAreasSection />
        
        {/* 4. Proof - Berikan bukti kredibilitas */}
        <ProjectSection />
        <ImpactSection />
        <OurTeamSection />
        <MediaSection />
        <PartnershipSection />
        
        {/* 5. Action - Dorong konversi */}
        <CTASection />
        <ContactSection />
        <Footer />
    </>
  )
}