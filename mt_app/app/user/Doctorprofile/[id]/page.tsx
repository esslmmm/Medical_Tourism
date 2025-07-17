import Navbarpro from "../../../../components/user_components/Main/Navbarpro";
import DoctorProfile from "../../../../components/user_components/Doctorprofile/DoctorPro"
import EducationSection from "../../../../components/user_components/Doctorprofile/Education"
import CertificateSection from "../../../../components/user_components/Doctorprofile/Certificate"
import DoctorPackage from "../../../../components/user_components/Doctorprofile/DoctorPackage";
import Footer from "../../../../components/user_components/Main/Footer";
import "../../../../app/globals.css";

const HomePage: React.FC = () => {
  return (
    <div>
        <Navbarpro />
        <div className="bg-white min-h-screen">
          <DoctorProfile />
          <EducationSection />
          <CertificateSection />
          <DoctorPackage />
        </div>
        <Footer />
    </div>
  );
};

export default HomePage;
