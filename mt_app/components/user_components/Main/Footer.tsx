import Link from "next/link";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"] });

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#263238] text-gray-300 py-8 px-6 flex justify-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-16 pt-10 text-center">
        <div>
          <Link href="/">
            <img
              src="/img/Footer&Navbar/carepath_logo.png"
              alt="Logo"
              className="w-35 h-auto mx-auto"
            />
          </Link>
          <p className="text-sm mt-2">Copyright &copy; 2025 Carepath Ltd.</p>
          <p className="text-xs">All rights reserved</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact us</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a
                href="mailto:support@figma.com"
                className={`flex items-center justify-center hover:underline ${roboto.className}`}
              >
                <img
                  src="/img/Footer&Navbar/email.png"
                  alt="Email Icon"
                  className="w-5 h-5 mr-2"
                />
                singkhala.e@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+66 811490745"
                className={`flex items-center justify-center hover:underline ${roboto.className}`}
              >
                <img
                  src="/img/Footer&Navbar/phone.png"
                  alt="Phone Icon"
                  className="w-4 h-4 mr-3"
                />
                +66 811490745
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
