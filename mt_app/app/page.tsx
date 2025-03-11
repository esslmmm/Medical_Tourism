import Navbar from "./components/Navbar";
import Advertisement from "./components/Advertisement";
import PackageList from "./components/PackageList";
import MedicalList from "./components/MedicalList";
import DoctorList from "./components/DoctorList";
import Hospitaltap from "./components/Hospitaltap";
import Footer from "./components/Footer";
import "./globals.css";

interface HomePageProps {
  children: React.ReactNode;
}

const HomePage: React.FC<HomePageProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Advertisement />
      <div className="text-center pt-10 pb-8">
        <h1 className="font-semibold text-[#4D4D4D]" style={{ fontSize: 35 }}>
          Select your package <br /> or customize your own package
        </h1>
        <b className="text-[#717171] font-regular" style={{ fontSize: 16 }}>
          Choose the package that's right for you?
        </b>
      </div>
      <PackageList />
      <h2 className="font-Inter text-6xl font-semibold text-center py-8 my-8 text-white bg-[#2BB08A] opacity-60">
        DOCTORS
      </h2>
      <DoctorList />
      <MedicalList />
      <Hospitaltap />
      <Footer />
      {children} {/* Renders the page content that is passed from the individual page component */}
    </div>
  );
};

export default HomePage;