import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(135deg, #2d5a45 0%, #3a6b4a 100%)' }} className="text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/images/branding/logo.png"
                alt="Adish Ventures Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-serif font-bold">Adish Ventures</span>
            </div>
            <p className="text-yellow-50 text-sm">
              Redefining Botanical Vitality through 2,000 years of Himalayan wisdom and modern science.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-yellow-50 hover:text-yellow-300 transition">Products</Link></li>
              <li><Link href="/about" className="text-yellow-50 hover:text-yellow-300 transition">About Us</Link></li>
              <li><Link href="/blog" className="text-yellow-50 hover:text-yellow-300 transition">Blog</Link></li>
              <li><Link href="/contact" className="text-yellow-50 hover:text-yellow-300 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4 text-yellow-400">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="text-yellow-50 hover:text-yellow-300 transition">FAQ</Link></li>
              <li><Link href="/returns" className="text-yellow-50 hover:text-yellow-300 transition">Returns</Link></li>
              <li><Link href="/privacy-policy" className="text-yellow-50 hover:text-yellow-300 transition">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-yellow-50 hover:text-yellow-300 transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-yellow-400">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <Phone size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
                <a href="tel:+919560300777" className="text-yellow-50 hover:text-yellow-300 transition">+91 9560300777</a>
              </div>
              <div className="flex items-start space-x-2">
                <Mail size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
                <a href="mailto:mailus@adishventures.com" className="text-yellow-50 hover:text-yellow-300 transition">mailus@adishventures.com</a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
                <span className="text-yellow-50">India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-green-600 border-opacity-30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-yellow-50 text-sm">
              © 2026 Adish Ventures. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-yellow-50 hover:text-yellow-300 transition text-sm">Instagram</a>
              <a href="#" className="text-yellow-50 hover:text-yellow-300 transition text-sm">Twitter</a>
              <a href="#" className="text-yellow-50 hover:text-yellow-300 transition text-sm">Facebook</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
