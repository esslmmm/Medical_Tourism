import Image from "next/image";
import NavbarBD from "./componants/NavbarBD";
import NavbarBE from "./componants/NavbarBE";
import NavbarBC from "./componants/NavbarBC";
import Footer from "./componants/Footer";
import BodyBD from "./componants/BodyBD";
import BodyBE from "./componants/BodyBE";
import BodyBC from "./componants/BodyBC";
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
        <NavbarBC />
        <BodyBC />
      </body>
      <Footer />
    </html>
  );
}

