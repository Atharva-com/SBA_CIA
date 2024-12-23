"use client"
import React from 'react';
import ServicesSection from './services/Services';
import Hero from './components/hero/HeroSection';
import AboutSection from './about/About';
import { ProjectsSection } from './projects/Projects';
import ContactBanner from './contact/ContactBanner';




export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ContactBanner />
      <ProjectsSection />
    </main>
  );
}
