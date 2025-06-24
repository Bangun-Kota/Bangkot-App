'use client'

import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import ValueSection from '@/sections/ValueSection'
import VisionMissionSection from '@/sections/VisionMissionSection'
import CommunityAreasSection from '@/sections/CommunityAreasSection'
import ProgramsSection from '@/sections/ProgramsSection'
import ImpactSection from '@/sections/ImpactSection'
import PartnershipSection from '@/sections/PartnershipSection'
import CTASection from '@/sections/CTASection'

export default function Home() {
  return (
    <>
      <main>
         <HeroSection />
         <AboutSection />
         <ValueSection />
         <VisionMissionSection />
         <CommunityAreasSection />
         <ProgramsSection />
         <ImpactSection />
         <PartnershipSection />
         <CTASection />
      </main>
    </>
  )
}