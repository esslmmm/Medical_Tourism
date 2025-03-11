import Image from "next/image";
import NavbarBookingDetails from "./componants/BookingDetails/Components/NavbarBookingDetails";
import NavbarBookingEdit from "./componants/BookingEdit/Components/NavbarBookingEdit";
import NavbarBookingConfirm from "./componants/BookingConfirm/Components/NavbarBookingConfirm";
import Footer from "./componants/BookingDetails/Components/Footer";
import MainPageBookingDetails from "./componants/BookingDetails/MainPage/MainPageBookingDetails";
import MainPageBookingEdit from "./componants/BookingEdit/MainPage/MainPageBookingEdit";
import MainPageBookingConfirm from "./componants/BookingConfirm/MainPage/MainPageBookingConfirm";
import MainPageBookingManagement from "./componants/BookingManagement/MainPage/MainPageBookingManagement";
import StaffChat from "./componants/StaffChat/StaffChat";
import ContactUs from "./componants/ContactUs/MainPage/ContactUs";
import ReviewPopUp from "./componants/ReviewPopUp/MainPage/ReviewPopUp";
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
        {/* <NavbarBookingEdit /> */}
        <StaffChat />
      </body>
      <Footer />
    </html>
  );
}

