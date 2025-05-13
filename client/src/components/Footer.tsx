import { Link } from 'wouter';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="text-primary h-6 w-6 mr-2" />
              <span className="font-bold text-xl">EcoTips</span>
            </div>
            <p className="text-gray-400 mb-4">Sharing practical ideas for sustainable living, one tip at a time.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/"><a className="text-gray-400 hover:text-white">Home</a></Link></li>
              <li><Link href="/tips"><a className="text-gray-400 hover:text-white">Tips</a></Link></li>
              <li><Link href="/contribute"><a className="text-gray-400 hover:text-white">Contribute</a></Link></li>
              <li><Link href="/about"><a className="text-gray-400 hover:text-white">About Us</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/tips"><a className="text-gray-400 hover:text-white">Home</a></Link></li>
              <li><Link href="/tips"><a className="text-gray-400 hover:text-white">Food</a></Link></li>
              <li><Link href="/tips"><a className="text-gray-400 hover:text-white">Fashion</a></Link></li>
              <li><Link href="/tips"><a className="text-gray-400 hover:text-white">Energy</a></Link></li>
              <li><Link href="/tips"><a className="text-gray-400 hover:text-white">Transport</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:hello@ecotips.com" className="hover:text-white">hello@ecotips.com</a>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2" />
                <a href="tel:+1234567890" className="hover:text-white">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-2" />
                <span>123 Green Street, Eco City</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2023 EcoTips. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
