"use client"
import React from 'react';
import ServicesSection from './services/Services';
import Hero from './components/hero/HeroSection';



export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ServicesSection />
    </main>
  );
}
