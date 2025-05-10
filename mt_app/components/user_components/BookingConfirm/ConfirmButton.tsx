import React from 'react'
import { useRouter } from "next/navigation";

const ConfirmButton = () => {
  const router = useRouter();

  const navigateTohotels = () => {
    router.push(`/user/profile/approval-status/1`);
  };
  return (
    
      <div className='max-w-2xl mx-auto p-6 '>
        <button className="w-full bg-[#2196F3] text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300" onClick={navigateTohotels}>
          Confirm
      </button></div>
  )
}

export default ConfirmButton