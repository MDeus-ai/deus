import React from 'react';
import { 
  FaHeart, 
  FaEnvelope, 
  FaPhone,
  FaLocationDot,
  FaLinkedinIn, 
  FaGithub, 
  FaXTwitter,
  FaWhatsapp,
  FaQuoteLeft,
  FaQuoteRight
} from 'react-icons/fa6';

function Footer() {
  const socialLinks = [
    {
      icon: FaLinkedinIn,
      href: "https://www.linkedin.com/in/muhumuza-deus-mugenyi-81a4a7268/",
      label: "LinkedIn",
      hoverColor: "group-hover/icon:bg-blue-500",
      baseColor: "bg-gray-800"
    },
    {
      icon: FaGithub,
      href: "https://github.com/MDeus-ai",
      label: "GitHub",
      hoverColor: "group-hover/icon:bg-gray-600",
      baseColor: "bg-gray-800"
    },
    {
      icon: FaXTwitter,
      href: "https://twitter.com/Muhumuzadeus5",
      label: "Twitter",
      hoverColor: "group-hover/icon:bg-blue-400",
      baseColor: "bg-gray-800"
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/256776646758",
      label: "WhatsApp",
      hoverColor: "group-hover/icon:bg-green-500",
      baseColor: "bg-gray-800"
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-black to-black pt-16 pb-6 px-6 font-roboto-slab">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_0.5px,transparent_0.5px),linear-gradient(to_bottom,#1f2937_0.5px,transparent_0.5px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:8rem_8rem]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Philosophy Section */}
          <div className="group">
            <h3 className="text-lg font-medium text-white pb-2 mb-6 relative">
              My Philosophy
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
            </h3>
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-gray-500 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300" />
              <FaQuoteLeft className="text-blue-400 text-xl absolute -top-3 -left-3 opacity-70 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-gray-300 text-base italic font-light leading-relaxed my-4 group-hover:text-white transition-colors duration-300">
                "If it works, don't touch it"
              </p>
              <FaQuoteRight className="text-purple-400 text-xl absolute -bottom-3 -right-3 opacity-70 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <p className="text-gray-400 text-sm leading-6 font-light mt-4">
              This principle guides my approach to machine learning, emphasizing stability and reliability in my projects.
            </p>
          </div>

          {/* Contact Section */}
          <div className="group">
            <h3 className="text-lg font-medium text-white pb-2 mb-6 relative">
              Get in Touch
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
            </h3>
            <div className="space-y-4">
              {[
                { icon: FaEnvelope, text: "muhumuzadeus.ai@gmail.com", href: "mailto:muhumuzadeus.ai@gmail.com" },
                { icon: FaPhone, text: "+256 776 646 758", href: "tel:+256776646758" },
                { icon: FaLocationDot, text: "Kampala, Uganda" }
              ].map((item, index) => (
                <div key={index} className="group/item">
                  {item.href ? (
                    <a 
                      href={item.href}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300"
                    >
                      <item.icon className="text-base text-blue-400 group-hover/item:text-blue-300" />
                      <span className="text-gray-400 text-sm group-hover/item:text-white transition-colors duration-300">
                        {item.text}
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                      <item.icon className="text-base text-blue-400" />
                      <span className="text-gray-400 text-sm">{item.text}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Social Links Section */}
          <div className="group">
            <h3 className="text-lg font-medium text-white pb-2 mb-6 relative">
              Connect With Me
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
            </h3>
            <p className="text-gray-400 text-sm leading-6 font-light mb-6">
              Join me on social media for the latest updates on my projects and insights into AI, machine learning.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label, hoverColor, baseColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/icon"
                  aria-label={label}
                >
                  <div className={`
                    relative p-3 rounded-lg border border-gray-700
                    ${baseColor} 
                    ${hoverColor}
                    transition-all duration-300
                    group-hover/icon:-translate-y-1
                    group-hover/icon:border-transparent
                    active:translate-y-0
                    active:transition-none
                  `}>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover/icon:opacity-70 transition duration-300" />
                    <Icon className="
                      relative text-base
                      text-gray-400
                      group-hover/icon:text-white
                      group-hover/icon:scale-110
                      transition-all duration-300
                      active:scale-100
                      active:transition-none
                    " />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="relative mt-12 pt-6 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          <p className="flex items-center justify-center text-gray-400 text-sm">
            Designed and built with 
            <FaHeart className="mx-2 text-red-500 animate-pulse hover:scale-110 transition-transform duration-300" />
            by Muhumuza Deus
          </p>
          <p className="mt-1 text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Muhumuza Deus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;