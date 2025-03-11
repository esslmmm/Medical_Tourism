import Link from "next/link";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"] });

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#263238] text-gray-300 py-8 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-start pt-10">
        <div className="mb-6 md:mb-0 ml-15">
          <Link href="/">
            <img src="/Medical Tourism.png" alt="Logo" className="w-35 h-auto " />
          </Link>
          <p className="text-sm mt-2">Copyright &copy; 2020 Nexcent Ltd.</p>
          <p className="text-xs">All rights reserved</p>
        </div>

        <div className="mb-6 md:mb-0 ml-50">
          <h3 className="text-lg font-semibold text-white mb-3">Company</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:underline">About us</a></li>
            <li><a href="#" className="hover:underline">Technical feedback</a></li>
            <li><a href="#" className="hover:underline">Hospitals</a></li>
            <li><a href="#" className="hover:underline">Packages</a></li>
          </ul>
        </div>

        <div className="mb-6 md:mb-5 ml-25">
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:underline">Chat support</a></li>
            <li><a href="#" className="hover:underline">Help center</a></li>
            <li><a href="#" className="hover:underline">Cancellation</a></li>
            <li><a href="#" className="hover:underline">My booking</a></li>
          </ul>
        </div>

        <div className="ml-25">
          <h3 className="text-lg font-semibold text-white mb-3">Contact us</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="mailto:support@figma.com" className={`flex items-center hover:underline ${roboto.className}`}>
                <img src="/email.png" alt="Email Icon" className="w-5 h-5 mr-2" />
                support@figma.com
              </a>
            </li>
            <li>
              <a href="tel:+18008543680" className={`flex items-center hover:underline ${roboto.className}`}>
                <img src="/phone.png" alt="Phone Icon" className="w-4 h-4 mr-3" />
                +1 800 854-36-80
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;