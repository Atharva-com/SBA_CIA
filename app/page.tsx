"use client"
import React from 'react';
import ServicesSection from './services/Services';
import Hero from './components/hero/HeroSection';
import AboutSection from './about/About';
import TeamSection from './team/Team';
import { ProjectsSection } from './projects/Projects';



export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TeamSection />

    </main>
  );
}
