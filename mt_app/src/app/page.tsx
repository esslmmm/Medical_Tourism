import Image from "next/image";
import NavbarBD from "./componants/NavbarBD";
import FooterBD from "./componants/FooterBD";
import BodyBD from "./componants/BodyBD";
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
        <NavbarBD />
        <BodyBD />
      </body>
      <FooterBD />
    </html>

  );
}

