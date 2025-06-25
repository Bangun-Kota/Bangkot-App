'use client'

import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import ValueSection from '@/sections/ValueSection'
import VisionMissionSection from '@/sections/VisionMissionSection'
import ProjectSection from '@/sections/ProjectSection'
import MediaSection from '@/sections/MediaSection'
import OurServicesSection from '@/sections/OurServicesSection'
import CommunityAreasSection from '@/sections/CommunityAreasSection'
import ProgramsSection from '@/sections/ProgramsSection'
import ImpactSection from '@/sections/ImpactSection'
import PartnershipSection from '@/sections/PartnershipSection'
import CTASection from '@/sections/CTASection'
import ContactSection from '@/sections/ContactSection'

export default function Home() {
  return (
    <>
      <main>
         <HeroSection />
         <AboutSection />
         <ValueSection />
         <VisionMissionSection />
         <ProjectSection/>
         <MediaSection/>
         <CommunityAreasSection />
         <ProgramsSection />
         <ImpactSection />
         <PartnershipSection />
         <OurServicesSection />
         <CTASection />
         <ContactSection />
      </main>
    </>
  )
}