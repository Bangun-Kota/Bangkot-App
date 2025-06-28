'use client'

import HeroSection from '@/app/sections/HeroSection'
import AboutSection from '@/app/sections/AboutSection'
import ValueSection from '@/app/sections/ValueSection'
import VisionMissionSection from '@/app/sections/VisionMissionSection'
import OurServicesSection from '@/app/sections/OurServicesSection'
import ProgramsSection from '@/app/sections/ProgramsSection'
import CommunityAreasSection from '@/app/sections/CommunityAreasSection'
import ProjectSection from '@/app/sections/ProjectSection'
import ImpactSection from '@/app/sections/ImpactSection'
import OurTeamSection from '@/app/sections/OurTeamSection'
import MediaSection from '@/app/sections/MediaSection'
import PartnershipSection from '@/app/sections/PartnershipSection'
import CTASection from '@/app/sections/CTASection'
import ContactSection from '@/app/sections/ContactSection'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

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