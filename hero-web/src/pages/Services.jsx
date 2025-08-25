import React from 'react';
import ServicesHero from '../components/services/ServicesHero';
import ServicesSolutions from '../components/services/ServicesSolutions';
import ServicesCTA from '../components/services/ServicesCTA';

export default function Services() {
  return (
    <div className="services-page">
      <ServicesHero />
      <ServicesSolutions />
      <ServicesCTA />
    </div>
  );
}


