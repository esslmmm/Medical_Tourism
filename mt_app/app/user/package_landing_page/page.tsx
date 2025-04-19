import AdditionService from "../../../components/user_components/package_landing_page/AdditionService"
import HospitalCard from "../../../components/user_components/package_landing_page/HospitalCard"
import OfferService from "../../../components/user_components/package_landing_page/OfferService"
import ImageCarousel from "../../../components/user_components/package_landing_page/PackageImage"
import Timeline from "../../../components/user_components/package_landing_page/Timeline"
import PlaceToVisit from "../../../components/user_components/package_landing_page/PlaceToVisit"
import RoomGallery from "../../../components/user_components/accommodation_booking/RoomGallery"
import AccommodationDetails from "../../../components/user_components/accommodation_booking/AccommodationDetail"

const PackageLandingPage = () => {
  return (
    <div>
    <ImageCarousel/>
    <OfferService />
    <HospitalCard />
    <RoomGallery />
    <AccommodationDetails />
    </div>
  )
}
export default PackageLandingPage