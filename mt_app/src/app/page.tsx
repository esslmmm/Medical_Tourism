import Image from "next/image";
import NavbarBD from "./componants/NavbarBD";
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
      </body>
    </html>

  );
}

