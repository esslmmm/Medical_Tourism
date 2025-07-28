import Navbarpro from "@/components/user_components/Main/Navbarpro";
import DoctorList from "@/components/user_components/DoctorList/DoctorList";
import Footer from "@/components/user_components/Main/Footer";
import "@/app/globals.css";


export default function Home() {
  return (
    <div>
        <Navbarpro />
        <DoctorList />
        <Footer />
    </div>
  );
}
