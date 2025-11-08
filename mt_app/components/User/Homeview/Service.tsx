import {
  Heart,
  Activity,
  Bone,
  ClipboardCheck,
  Scissors,
  Smile,
  Eye,
  Baby,
  Brain,
  Star,
  ChevronRight,
} from "lucide-react";

const Service = () => {
  // 🔹 Treatment List
  const treatments = [
    { icon: Heart, name: "Heart", color: "text-blue-500" },
    { icon: Activity, name: "Cancer", color: "text-blue-500" },
    { icon: Bone, name: "Bone & Spine", color: "text-blue-500" },
    { icon: ClipboardCheck, name: "Check-up", color: "text-blue-500" },
    { icon: Scissors, name: "Surgery", color: "text-blue-500" },
    { icon: Smile, name: "Dental", color: "text-blue-500" },
    { icon: Eye, name: "Eye & Ent", color: "text-blue-500" },
    { icon: Baby, name: "Mother & Child", color: "text-blue-500" },
    { icon: Smile, name: "Aesthetic", color: "text-blue-500" },
    { icon: Brain, name: "Brain", color: "text-blue-500" },
  ];

  return (
    <div><section className="max-w-7xl mx-auto px-6 py-7">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Treatment & Wellness Service</h2>
          <a href="#" className="text-teal-500 hover:text-teal-600 flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {treatments.map((treatment, idx) => (
            <div key={idx} className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center gap-3">
              <treatment.icon className={`w-12 h-12 ${treatment.color}`} />
              <span className="font-medium text-center">{treatment.name}</span>
            </div>
          ))}
        </div>
      </section></div>
  )
}
export default Service