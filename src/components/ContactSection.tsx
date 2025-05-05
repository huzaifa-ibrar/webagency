"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [calendlyLoading, setCalendlyLoading] = useState(true);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after submission
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after some time
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  // Handler for Calendly iframe load event
  const handleCalendlyLoad = () => {
    setCalendlyLoading(false);
  };

  // Contact items data
  const contactItems = [
    {
      id: 'location',
      title: 'Our Location',
      value: '123 Digital Avenue, Tech City',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-netspire-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: 'email',
      title: 'Email Us',
      value: 'netspirestudios@gmail.com',
      link: 'mailto:netspirestudios@gmail.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-netspire-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'phone',
      title: 'Call Us',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-netspire-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
  ];

  // Social media links data
  const socialLinks = [
    { 
      name: 'Twitter', 
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ) 
    },
    { 
      name: 'LinkedIn', 
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ) 
    },
    { 
      name: 'Instagram', 
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ) 
    },
    { 
      name: 'GitHub', 
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ) 
    }
  ];
  
  const formFieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: custom * 0.1
      }
    })
  };

  return (
    <section id="contact" className="py-24 bg-netspire-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute right-0 top-[20%] w-[600px] h-[600px] rounded-full bg-netspire-pink opacity-5 blur-3xl"></div>
      <div className="absolute left-0 bottom-[10%] w-[400px] h-[400px] rounded-full bg-netspire-pink opacity-10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 md:mb-6"
          >
            Get in <span className="text-gradient">Touch</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 md:mb-12"
          >
            Ready to start your project? Contact us today and let's create something amazing together.
          </motion.p>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-netspire-gray/20 to-netspire-gray/5 backdrop-filter backdrop-blur-lg rounded-2xl overflow-hidden border border-netspire-gray/20 relative h-full"
          >
            <div className="relative h-full flex flex-col">
              {/* Top decorative element */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-netspire-pink to-transparent"></div>
              
              {/* Header */}
              <div className="bg-netspire-gray/30 py-6 px-8">
                <h3 className="text-2xl font-bold">Contact Information</h3>
                <p className="text-gray-400 mt-1">Reach out to us through any of these channels</p>
              </div>
              
              {/* Contact items */}
              <div className="p-8 flex-grow">
                <div className="space-y-8">
                  {contactItems.map((item, index) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <div className="flex items-center space-x-5">
                        <div className="flex-shrink-0 group-hover:scale-110 transition-all duration-300 w-12 h-12 bg-gradient-to-br from-netspire-pink/20 to-netspire-pink-light/20 rounded-xl flex items-center justify-center shadow-lg">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-1 group-hover:text-netspire-pink transition-colors">{item.title}</h4>
                          {item.link ? (
                            <a 
                              href={item.link}
                              className="text-gray-300 hover:text-netspire-pink transition-colors group-hover:translate-x-1 inline-block transform transition-transform duration-300"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-gray-300">{item.value}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Social links */}
              <div className="px-8 pb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold mb-5 inline-block relative">
                    Connect With Us
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-netspire-pink to-transparent"></span>
                  </h4>
                  
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((social) => (
                      <motion.a 
                        key={social.name}
                        href="#"
                        whileHover={{ scale: 1.1, y: -3 }}
                        className="relative group"
                      >
                        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-netspire-pink to-netspire-pink-light opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></span>
                        <span className="relative bg-netspire-gray/30 p-3 rounded-full text-white flex items-center justify-center z-10 border border-netspire-gray/20 group-hover:border-netspire-pink/30 transition-colors">
                          <span className="sr-only">{social.name}</span>
                          {social.icon}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              {/* Working hours */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="mx-8 mb-8 p-4 bg-netspire-gray/20 rounded-xl border border-netspire-gray/20 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-netspire-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <p className="text-sm text-gray-300">Working Hours</p>
                  <p className="text-white font-medium mt-1">Monday - Friday: 9am - 6pm</p>
                  <p className="text-white font-medium">Weekends: By appointment</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Calendly Embed */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-netspire-gray bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl border border-netspire-gray border-opacity-20 overflow-hidden h-full flex relative"
          >
            {calendlyLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#050505] bg-opacity-90 z-10">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-netspire-pink animate-spin mb-4"></div>
                  <p className="text-netspire-pink text-lg font-medium">Loading calendar...</p>
                </div>
              </div>
            )}
            <iframe
              src="https://calendly.com/netspirestudios/30min?background_color=050505&text_color=ffffff&primary_color=FF1053&hide_event_type_details=1&hide_gdpr_banner=1&accent_color=FF4778&hide_landing_page_details=1&border_color=333333&font=Inter"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Schedule a meeting with Netspire"
              className="min-h-[650px] md:min-h-[650px] w-full"
              onLoad={handleCalendlyLoad}
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 