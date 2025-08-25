import React from 'react';
import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';

export default function Contact() {
  return (
    <div className="contact-page">
      <ContactHero />
      <ContactForm />
    </div>
  );
}


