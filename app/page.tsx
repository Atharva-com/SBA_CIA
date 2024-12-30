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
import AnimatedText from './utils/AnimatedText';
import TestimonialsSection from './homePage/testimonals/TestimonialsSection';



export default function Home() {
  return (
    <ParallaxProvider>
      <main className="min-h-screen overflow-x-hidden">
        <ChatWidget />

        <Hero />

        <AboutSection />

        <AnimatedText />


        <ServicesSection />
        

        {/* <ContactBanner /> */}


        {/* <ProjectsSection /> */}


        {/* <TestimonialsSection /> */}


        {/* <WhyChooseUs /> */}
      </main>
    </ParallaxProvider>
  );
}
