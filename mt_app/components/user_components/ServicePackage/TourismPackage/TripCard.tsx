import React from "react";

type TripCardProps = {
  image: string;
  title: string;
  duration: string;
  activities: string[];
  tags: string[];
  price: number;
  priceColor?: string;
};

const TripCard: React.FC<TripCardProps> = ({
  image,
  title,
  duration,
  activities,
  tags,
  price,
  priceColor = "text-red-500",
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-6 mb-4">
      <div className="flex gap-6">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-32 h-24 rounded-xl object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {title}{" "}
                <span className="text-orange-500 font-normal">({duration})</span>
              </h3>

              {/* Activities */}
              <ul className="text-gray-600 text-sm space-y-1">
                {activities.map((activity, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>

            <button className="text-teal-400 hover:text-teal-500 text-sm font-medium flex items-center gap-1">
              See details
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-teal-100 text-teal-700 text-sm rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price and Button */}
          <div className="flex justify-between items-center">
            <div className="flex items-baseline gap-1">
              <span className="text-gray-600 text-sm">Start from</span>
              <span className="text-gray-400 text-sm">฿</span>
              <span className={`text-2xl font-bold ${priceColor}`}>
                {price.toLocaleString()}
              </span>
            </div>

            <button className="px-6 py-2 border-2 border-teal-200 text-teal-400 hover:bg-teal-50 rounded-full font-medium transition-colors">
              Choose
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TripCards: React.FC = () => {
  const trips: TripCardProps[] = [
    {
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      title: "Phuket Go Around",
      duration: "3 days",
      activities: ["Phi Phi Islands", "City Tour", "James Bond Island"],
      tags: ["Summer", "Holiday", "Relax"],
      price: 2000,
      priceColor: "text-red-500",
    },
    {
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      title: "Summer Fun",
      duration: "2 days",
      activities: ["Phi Phi Islands", "City Tour"],
      tags: ["Holiday", "Relax"],
      price: 1000,
      priceColor: "text-red-500",
    },
    {
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      title: "Phuket City",
      duration: "1 day",
      activities: ["City Tour"],
      tags: ["Holiday", "Relax"],
      price: 500,
      priceColor: "text-red-500",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Trip</h1>
        <button className="text-teal-400 hover:text-teal-500 font-medium flex items-center gap-2">
          View more trip
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Trip Cards */}
      <div className="space-y-4">
        {trips.map((trip, index) => (
          <TripCard key={index} {...trip} />
        ))}
      </div>
    </div>
  );
};

export default TripCards;
