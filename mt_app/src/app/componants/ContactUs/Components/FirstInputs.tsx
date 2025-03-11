import React from 'react'

const FirstInputs = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">First name*</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border rounded-md p-2 bg-white text-black"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Last name*</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border rounded-md p-2 bg-white text-black"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Email*</label>
                    <input
                        type="email"
                        className="mt-1 block w-full border rounded-md p-2 bg-white text-black"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Phone number*</label>
                    <input
                        type="tel"
                        className="mt-1 block w-full border rounded-md p-2 bg-white text-black"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Country*</label>
                    <select className="mt-1 block w-full border rounded-md p-2 bg-white text-black" required>\
                        <option value="">Select a country</option>
                        <option value="us">Myanmar</option>
                        <option value="uk">Thai</option>
                        <option value="ca">Arab</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Type*</label>
                    <select className="mt-1 block w-full border rounded-md p-2 bg-white text-black" required>
                        <option value="">Select a type</option>
                        <option value="general">Meidcal</option>
                        <option value="booking">Booking</option>
                        <option value="support">Support</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default FirstInputs