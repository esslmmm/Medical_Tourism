import AdditionService from "../../../components/user_components/package_landing_page/AdditionService"
import HospitalCard from "../../../components/user_components/package_landing_page/HospitalCard"
import OfferService from "../../../components/user_components/package_landing_page/OfferService"
import ImageCarousel from "../../../components/user_components/package_landing_page/PackageImage"
import Timeline from "../../../components/user_components/package_landing_page/Timeline"
import PlaceToVisit from "../../../components/user_components/package_landing_page/PlaceToVisit"

const PackageLandingPage = () => {
  return (
    <div>
    <ImageCarousel/>
    <OfferService />
    <HospitalCard />
    <PlaceToVisit />
    <Timeline />
    <AdditionService />
    </div>
  )
}
export default PackageLandingPage