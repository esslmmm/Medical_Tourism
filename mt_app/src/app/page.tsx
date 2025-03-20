import Image from "next/image";
import NavbarBookingDetails from "./componants/User/BookingDetails/Components/NavbarBookingDetails";
import NavbarBookingEdit from "./componants/User/BookingEdit/Components/NavbarBookingEdit";
import NavbarBookingConfirm from "./componants/User/BookingConfirm/Components/NavbarBookingConfirm";
import Footer from "./componants/User/BookingDetails/Components/Footer";
import MainPageBookingDetails from "./componants/User/BookingDetails/page";
import MainPageBookingEdit from "./componants/User/BookingEdit/page";
// import MainPageBookingConfirm from "./componants/User/BookingConfirm/Page";
import MainPageBookingManagement from "./componants/Staff/BookingManagement/MainPage/MainPageBookingManagement";
import StaffChat from "./componants/Staff/StaffChat/StaffChat";
import StaffProfile from "./componants/Staff/StaffProfile/StaffProfile";
import UserProfile from "./componants/User/UserProfile/page";
import UserChat from "./componants/User/UserChat/page";
import UserReviews from "./componants/User/UserReviews/page";
import ContactUs from "./componants/User/ContactUs/page";
import ReviewPopUp from "./componants/User/ReviewPopUp/page";
import AdminProfile from "./componants/Admin/AdminProfile/AdminProfile";
import AdminPlace from "./componants/Admin/AdminPlace/AdminPlace";
import AdminHospital from "./componants/Admin/AdminHospital/AdminHospital";
import AdminAccommodation from "./componants/Admin/AdminAccommodation/AdminAccommodation";
import AdminInterpreter from "./componants/Admin/AdminInterpreter/AdminInterpreter";
import AdminDoctor from "./componants/Admin/AdminDoctor/AdminDoctor";
import PackageList from "./componants/Admin/AdminPackagelist/AdminPackagelist";
import AdminPackage from "./componants/Admin/AdminPackage/AdminPackage";
import AdminPackageAdd from "./componants/Admin/AdminPackageAdd/AdminPackageAdd";
import AdminUserManagement from "./componants/Admin/AdminUserManagement/AdminUserManagement";
import AdminPackageDetail from "./componants/Admin/AdminPackageDetail/AdminPackageDetail";
import DoctorList from "./componants/Admin/AdminDoctorlist/AdminDoctorlist";
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
        <AdminPackageDetail />
      </body>
      {/* <Footer /> */}
    </html>
  );
}

