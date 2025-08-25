import React from 'react';
import AboutHero from '../components/about/AboutHero';
import AboutStory from '../components/about/AboutStory';
import AboutValues from '../components/about/AboutValues';
import AboutCTA from '../components/about/AboutCTA';

export default function About() {
  return (
    <div className="about-page">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutCTA />
    </div>
  );
}


