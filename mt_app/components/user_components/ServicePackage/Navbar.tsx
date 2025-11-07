import { 
  CheckIcon
} from '@heroicons/react/24/solid';

const Navbar = () => {
  return (
    <div className='bg-teal-500'>
        <div className='max-w-7xl mx-auto px-4 '>
        {/* Profile Section */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4 justify-between">
                <div>
                  <p className="text-4xl font-bold text-gray-200">SENIOR PROJECT</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full border-4 border-green-500"></div>
                  <h4 className="text-base font-bold text-white">Ekkarat Singkhala</h4>
                </div>
              </div>

              <div className="space-y-3 flex items-center gap-4 ">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-teal-500 rounded flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-base text-white">Medical Package</span>
                </div>
                <div className="flex items-center gap-3 bg-teal-800 p-4 border-2 border-green-500 rounded-4xl">
                  <div className="w-6 h-6 bg-teal-500 rounded flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-base text-white">Medical & Toursim Package</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-teal-500 rounded flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-base text-white">Doctor</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-teal-500 rounded flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-base text-white">Hospital</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-teal-500 rounded flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-base text-white">Hospital</span>
                </div>
              </div>
            </div>

      </div>
      </div>
  )
}
export default Navbar