import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { COLORS } from '@/app/constants/color';
import Image from 'next/image';
import Logo from '../../../public/images/logo.png';
import Playstore from '../../../public/images/playstore.png';
import Appstore from '../../../public/images/appstore.png';

const ModernFooter = () => {
  const navigation = {
    membership: [
      { name: 'Home', href: '#' },
      { name: 'How It Works', href: '#' },
    ],
    resources: [
      { name: 'Help Center', href: '#' },
      { name: 'The Blog', href: '#' },
      { name: 'Vet Finder', href: '#' },
    ],
    company: [
      { name: 'Press', href: '#' },
      { name: 'Partnerships', href: '#' },
      { name: 'Careers', href: '#' },
    ],
  };

  const legalLinks = [
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Code of Conduct', href: '#' },
    { name: 'Accessibility', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Pricing', href: '#' },
  ];

  return (
    <footer className={`${COLORS.bgPurple}  text-white`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* <HeroSection /> */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src={Logo}
                alt="pawsmart logo"
                height={50}
                width={50}
                className="rounded-full"
              />
              <span className="text-xl font-bold">pawp smart</span>
            </div>
            <p className="text-2xl font-semibold mb-8">
              Modern pet care for everyone.
            </p>
          </div>
          <div>
            <h3 className="text-gray-400 font-medium mb-4">Membership</h3>
            <ul className="space-y-3">
              {navigation.membership.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-gray-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-400 font-medium mb-4">Resources</h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-gray-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-400 font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-gray-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-3">
              <Image src={Appstore} alt="App Store" className="h-10 w-20" />
              <Image src={Playstore} alt="Google Play" className="h-10 w-20" />
            </ul>
          </div>
        </div>

        <div className="flex gap-6 mb-12">
          <Facebook className="w-6 h-6 hover:text-gray-300 cursor-pointer" />
          <Twitter className="w-6 h-6 hover:text-gray-300 cursor-pointer" />
          <Instagram className="w-6 h-6 hover:text-gray-300 cursor-pointer" />
          {/* <Pinterest className="w-6 h-6 hover:text-gray-300 cursor-pointer" />
          <TikTok className="w-6 h-6 hover:text-gray-300 cursor-pointer" /> */}
          <Linkedin className="w-6 h-6 hover:text-gray-300 cursor-pointer" />
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              © 2024 Pawp, Inc. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {legalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-gray-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
