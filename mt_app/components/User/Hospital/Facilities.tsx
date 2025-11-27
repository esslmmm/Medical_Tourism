import { 
  PhoneIcon,
  PaperClipIcon,
  EnvelopeIcon,
  ChatBubbleBottomCenterTextIcon,
  MapIcon
} from '@heroicons/react/24/solid';

const facilities = [
  { icon: MapIcon, title: 'Hospital\npick-up & drop-off' },
  { icon: EnvelopeIcon, title: 'Invitation Letter' },
  { icon: ChatBubbleBottomCenterTextIcon, title: 'Coordinator' },
  { icon: PhoneIcon, title: 'Post-treatment\nfollow-up' },
  { icon: PaperClipIcon, title: 'Diagnostic\nTests & Lab Reports' }
];

const Facilities = () => {
  return (
    <div className='max-w-7xl mx-auto py-8 pb-5 relative'>
            <h2 className="text-3xl font-bold  mb-8 text-black">Facilities</h2>
            
            <div className="bg-white p-10 border border-gray-300 rounded-2xl shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {facilities.map((facility, index) => {
                  const IconComponent = facility.icon;
                  return (
                    <div key={index} className="text-center">
                      <IconComponent className="w-8 h-8 mx-auto mb-2 text-teal-500" />
                      <p className=" font-bold whitespace-pre-line text-black">{facility.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
  )
}
export default Facilities