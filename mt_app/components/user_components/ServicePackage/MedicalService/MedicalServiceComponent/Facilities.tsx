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
    <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Facilities</h2>
            <div className="bg-white p-10 border border-gray-300 rounded-2xl shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {facilities.map((facility, index) => {
                  const IconComponent = facility.icon;
                  return (
                    <div key={index} className="text-center">
                      <IconComponent className="w-6 h-6 mx-auto mb-2 text-teal-500" />
                      <p className="text-xs font-bold whitespace-pre-line text-black">{facility.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
  )
}
export default Facilities