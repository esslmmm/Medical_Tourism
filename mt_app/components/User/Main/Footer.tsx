// import Link from "next/link";
// import { Roboto } from "next/font/google";

// const roboto = Roboto({ subsets: ["latin"] });

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-[#263238] text-gray-300 py-8 px-6">
//       <div className="container mx-auto flex flex-col md:flex-row items-start pt-10">
//         <div className="mb-6 md:mb-0 ml-15">
//           <Link href="/">
//             <img src="/img/Footer&Navbar/Medical Tourism.png" alt="Logo" className="w-35 h-auto " />
//           </Link>
//           <p className="text-sm mt-2">Copyright &copy; 2020 Nexcent Ltd.</p>
//           <p className="text-xs">All rights reserved</p>
//         </div>

//         <div className="mb-6 md:mb-0 ml-50">
//           <h3 className="text-lg font-semibold text-white mb-3">Company</h3>
//           <ul className="mt-2 space-y-2">
//             <li><a href="#" className="hover:underline">About us</a></li>
//             <li><a href="#" className="hover:underline">Technical feedback</a></li>
//             <li><a href="#" className="hover:underline">Hospitals</a></li>
//             <li><a href="#" className="hover:underline">Packages</a></li>
//           </ul>
//         </div>

//         <div className="mb-6 md:mb-5 ml-25">
//           <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
//           <ul className="mt-2 space-y-2">
//             <li><a href="#" className="hover:underline">Chat support</a></li>
//             <li><a href="#" className="hover:underline">Help center</a></li>
//             <li><a href="#" className="hover:underline">Cancellation</a></li>
//             <li><a href="#" className="hover:underline">My booking</a></li>
//           </ul>
//         </div>

//         <div className="ml-25">
//           <h3 className="text-lg font-semibold text-white mb-3">Contact us</h3>
//           <ul className="mt-2 space-y-2">
//             <li>
//               <a href="mailto:support@figma.com" className={`flex items-center hover:underline ${roboto.className}`}>
//                 <img src="/img/Footer&Navbar/email.png" alt="Email Icon" className="w-5 h-5 mr-2" />
//                 support@figma.com
//               </a>
//             </li>
//             <li>
//               <a href="tel:+18008543680" className={`flex items-center hover:underline ${roboto.className}`}>
//                 <img src="/img/Footer&Navbar/phone.png" alt="Phone Icon" className="w-4 h-4 mr-3" />
//                 +1 800 854-36-80
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// components/Footer.tsx
import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-12 gap-8 flex justify-evenly">
        {/* Brand Info */}
        {/* <div>
          <h2 className="text-xl font-bold mb-3">Senior Project</h2>
          <p className="text-sm text-slate-400 mb-4">
            Connecting you to world-class healthcare abroad. Trusted medical tourism facilitation.
          </p>
          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <p className="flex items-center gap-2">
              <Mail size={16} /> support@lamduan.mfu.ac.th
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> +1 (800) 555-0123
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} /> 150 Chiang Rai, Thailand
            </p>
          </div>
        </div> */}

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/treatments" className="hover:text-white">Treatments</Link></li>
            <li><Link href="/hospitals" className="hover:text-white">Partner Hospitals</Link></li>
            <li><Link href="/stories" className="hover:text-white">Patient Stories</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
            <li><Link href="/contact-us" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link href="/disclaimer" className="hover:text-white">Disclaimer</Link></li>
            <li><Link href="/cookies" className="hover:text-white">Cookie Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter / Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
          <p className="text-sm text-slate-400 ">
            Get updates on top treatments,
          </p>
          <p className="text-sm text-slate-400 mb-4">
             hospital partners, and travel tips.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-teal-400"><Facebook size={18} /></Link>
            <Link href="#" className="hover:text-teal-400"><Instagram size={18} /></Link>
            <Link href="#" className="hover:text-teal-400"><Linkedin size={18} /></Link>
            <Link href="#" className="hover:text-teal-400"><Youtube size={18} /></Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 py-10 text-center text-sm text-slate-500 mx-10">
        <p>© {new Date().getFullYear()} Senior Project. All rights reserved.</p>
        <p className="mt-1 text-xs">
          Senior Project is a medical facilitation service, not a healthcare provider.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
