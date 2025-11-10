interface WarningProps {
  onGoBack: () => void;
}

const Warning: React.FC<WarningProps> = ({ onGoBack }) => {
  return (
    <div>
      <h1 className="my-5 text-2xl font-bold text-gray-900 text-center">Make a Booking</h1>
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 space-y-6 border-2 border-gray-200">
        <div className="flex items-start justify-between"> 
            <span className="text-lg font-semibold text-gray-900">Please finish an Appointment</span>
        </div>
        {/* Next Step */}
        <button
          onClick={onGoBack} // <-- call the callback
          className={`w-full bg-teal-500 text-white font-semibold py-4 rounded-2xl transition-colors hover:bg-emerald-600`}
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default Warning
