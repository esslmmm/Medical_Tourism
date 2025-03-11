import Navbarpro from "../components/Navbarpro";
import DoctorList from "./components/DoctorList";
import Footer from "../components/Footer";
import "../globals.css";


export default function Home() {
  return (
    <div>
        <Navbarpro />
        <DoctorList />
        <Footer />
    </div>
  );
}
