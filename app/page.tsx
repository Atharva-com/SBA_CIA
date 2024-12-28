"use client"
import React from 'react';
import ServicesSection from './homePage/services/Services';
import Hero from './homePage/hero/HeroSection';
import AboutSection from './homePage/about/About';
import { ProjectsSection } from './homePage/projects/Projects';
import ContactBanner from './homePage/contact/ContactBanner';
// import WhyChooseUs from './homePage/whyChooseUs/WhyChooseUs';
import ChatWidget from './utils/ChatWidget';
import { ParallaxProvider } from 'react-scroll-parallax';



export default function Home() {
  return (
    <ParallaxProvider>
      <main className="min-h-screen overflow-x-hidden">
        <ChatWidget />
        
          <Hero />
        
        
          <AboutSection />
        
        
          <ServicesSection />
        
        
          <ContactBanner />
        
        
          <ProjectsSection />
        
        {/* <WhyChooseUs /> */}
      </main>
    </ParallaxProvider>
  );
}
