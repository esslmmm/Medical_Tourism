import React from 'react'
import { Star } from "lucide-react";
import { useState } from "react";
const StarRating = () => {
const [rating, setRating] = useState(4);
  return (
      <div><div className="mt-6 text-center">
          <h4 className="text-sm font-medium">What is your rate</h4>
          <div className="flex justify-center space-x-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                      key={star}
                      size={24}
                      className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-300"
                          }`}
                      onClick={() => setRating(star)}
                  />
              ))}
          </div>
      </div></div>
  )
}

export default StarRating