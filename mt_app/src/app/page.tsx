import Image from "next/image";
import NavbarBookingDetails from "./componants/User/BookingDetails/Components/NavbarBookingDetails";
import NavbarBookingEdit from "./componants/User/BookingEdit/Components/NavbarBookingEdit";
import NavbarBookingConfirm from "./componants/User/BookingConfirm/Components/NavbarBookingConfirm";
import Footer from "./componants/User/BookingDetails/Components/Footer";
import MainPageBookingDetails from "./componants/User/BookingDetails/MainPage/MainPageBookingDetails";
import MainPageBookingEdit from "./componants/User/BookingEdit/MainPage/MainPageBookingEdit";
import MainPageBookingConfirm from "./componants/User/BookingConfirm/MainPage/MainPageBookingConfirm";
import MainPageBookingManagement from "./componants/Staff/BookingManagement/MainPage/MainPageBookingManagement";
import StaffChat from "./componants/Staff/StaffChat/StaffChat";
import StaffProfile from "./componants/Staff/StaffProfile/StaffProfile";
import UserProfile from "./componants/User/UserProfile/UserProfile";
import UserChat from "./componants/User/UserChat/UserChat";
import UserReviews from "./componants/User/UserReviews/UserReviews";
import ContactUs from "./componants/User/ContactUs/MainPage/ContactUs";
import ReviewPopUp from "./componants/User/ReviewPopUp/MainPage/ReviewPopUp";
import AdminProfile from "./componants/Admin/AdminProfile/AdminProfile";
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
        <AdminProfile />
      </body>
      {/* <Footer /> */}
    </html>
  );
}

