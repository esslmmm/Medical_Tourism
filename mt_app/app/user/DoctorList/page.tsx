import Navbarpro from "@/components/User/Main/Navbarpro";
import DoctorList from "@/components/User/DoctorList/DoctorList";
import Footer from "@/components/User/Main/Footer";
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
