import React from 'react'
import { useState } from "react";
const ReviewInput = () => {
    const [review, setReview] = useState("");
  return (
      <div><div className="mt-6 text-center">
          <label className="text-sm font-medium block">
              Please share your opinion about the service
          </label>
          <textarea
              className="w-full mt-2 border rounded-md p-2 h-24 text-black"
              value={review}
              onChange={(e) => setReview(e.target.value)}
          />
      </div></div>
  )
}

export default ReviewInput