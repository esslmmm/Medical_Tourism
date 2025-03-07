import Image from "next/image";
import NavbarBD from "./componants/NavbarBD";
import NavbarBE from "./componants/NavbarBE";
import NavbarBC from "./componants/NavbarBC";
import NavbarBM from "./componants/NavbarBM";
import Footer from "./componants/Footer";
import BodyBD from "./componants/BodyBD";
import BodyBE from "./componants/BodyBE";
import BodyBC from "./componants/BodyBC";
import BodyBM from "./componants/BodyBM";
import ContactUs from "./componants/ContactUs";
import ReviewPopUp from "./componants/ReviewPopUp";
import "./globals.css";

// /pages/index.js
export default function HomePage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavbarBM />
        <BodyBD />
      </body>
      <Footer />
    </html>
  );
}

