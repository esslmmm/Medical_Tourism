import React from 'react'

const SecondInputs = () => {
  return (
      <div><div>
          <label className="block text-sm font-medium">How can we help you?</label>
          <textarea
              className="mt-1 block w-full border rounded-md p-2 bg-white text-black"
              rows={4}
          />
      </div>

          <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" required className="text-black" />
              <label htmlFor="terms" className="text-sm">
                  By proceeding with this booking, I agree to Medical Tourism{" "}
                  <a href="#" className="underline">Terms of Use</a> and{" "}
                  <a href="#" className="underline">Privacy Policy</a>.
              </label>
          </div></div>
  )
}

export default SecondInputs