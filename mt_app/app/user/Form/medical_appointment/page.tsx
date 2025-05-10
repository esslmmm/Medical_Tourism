import BookAnAppointment from "../../../../components/user_components/medical_appointment/BookAnAppointment"
import MedicalService from '../../../../components/user_components/BookingDetails/MedicalService';
import PlaceToVisit from '../../../../components/user_components/BookingDetails/PlaceToVisit';
import Accommodation from '../../../../components/user_components/BookingDetails/Accommodation';
import Interpreter from '../../../../components/user_components/BookingDetails/Interpreter';



const MedicalAppointment = () => {
  return (
      <div className="flex bg-green-100">
      <div className="w-2/3">
        <BookAnAppointment/>
      </div>

        <div className="w-1/3 bg-white border-l border-[#E0E0E0]">
          <MedicalService />
          <PlaceToVisit />
          <Accommodation />
          <Interpreter />
            <div className="mt-4 text-right">
              <a href="#" className="text-blue-500 text-sm font-semibold">Show all detail</a>
            </div>
        </div>
      </div>
  )
}
export default MedicalAppointment