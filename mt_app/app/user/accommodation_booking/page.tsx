import AccommodationDetails from "../../../components/user_components/accommodation_booking/AccommodationDetail"
import ReviewSection from "../../../components/user_components/accommodation_booking/ReviewAccommodation"
import RoomGallery from "../../../components/user_components/accommodation_booking/RoomGallery"
import RoomOptionCard from "../../../components/user_components/accommodation_booking/RoomOptionCard"
import SelectAccommodation from "../../../components/user_components/accommodation_booking/SelectAccommodation"
import SelectRoom from "../../../components/user_components/accommodation_booking/SelectRoom"


const AccommodationBooking = () => {
  return (
    <div>
    <RoomGallery />
    <AccommodationDetails />
    <SelectRoom />
    <RoomOptionCard />
</div>
  )
}
export default AccommodationBooking