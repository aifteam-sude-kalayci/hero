import React from 'react';
import Clients from "../components/Clients";
import AboutHero from '../components/about/AboutHero';
import AboutStory from '../components/about/AboutStory';
import AboutValues from '../components/about/AboutValues';
import AboutCTA from '../components/about/AboutCTA';

export default function About() {
  return (
    <div className="about-page">
      <AboutStory />
      <AboutValues />
  
    </div>
  );
}


