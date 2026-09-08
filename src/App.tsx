/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { Booking } from './components/Booking';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BackToTop } from './components/BackToTop';
import { PromoModal } from './components/PromoModal';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('Graphic Design');
  const [selectedPackage, setSelectedPackage] = useState<string>('Standard');

  const scrollToBooking = () => {
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    scrollToBooking();
  };

  const handleSelectPackage = (packageName: string) => {
    setSelectedPackage(packageName);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-[#090D10] text-[#E2E8F0] selection:bg-emerald-500/30 selection:text-emerald-300 relative">
      {/* Top Navbar */}
      <Navbar onBookClick={scrollToBooking} />

      <main>
        {/* 1. Hero Section */}
        <Hero 
          onBookClick={scrollToBooking} 
          onExploreServices={scrollToServices} 
        />

        {/* 2. About Section */}
        <About />

        {/* 3. Services Section */}
        <Services onSelectService={handleSelectService} />

        {/* 4. Portfolio/Work Showcase */}
        <Portfolio onBookClick={scrollToBooking} />

        {/* 5. Testimonials/Reviews Section */}
        <Testimonials />

        {/* 6. Pricing/Packages Section */}
        <Pricing onSelectPackage={handleSelectPackage} />

        {/* 7. Booking Section */}
        <Booking 
          preselectedService={selectedService} 
          preselectedPackage={selectedPackage} 
        />

        {/* 8. Contact Section */}
        <Contact />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* Floating WhatsApp chat widget (bottom-right) */}
      <FloatingWhatsApp />

      {/* Floating Back to Top button (bottom-left) */}
      <BackToTop />

      {/* Promotional Pop-Up (appears once per session) */}
      <PromoModal onScrollToBooking={scrollToBooking} />
    </div>
  );
}
