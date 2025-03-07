const ContactForm = () => {
    return (
        <div className="flex flex-col items-center py-12 px-4">
            <h2 className="text-2xl font-semibold mb-6">Send us an Email</h2>
            <form className="w-full max-w-3xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">First name*</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Last name*</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email*</label>
                        <input
                            type="email"
                            className="mt-1 block w-full border rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Phone number*</label>
                        <input
                            type="tel"
                            className="mt-1 block w-full border rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Country*</label>
                        <select className="mt-1 block w-full border rounded-md p-2" required>
                            <option value="">Select a country</option>
                            <option value="us">United States</option>
                            <option value="uk">United Kingdom</option>
                            <option value="ca">Canada</option>
                            {/* Add more countries as needed */}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Type*</label>
                        <select className="mt-1 block w-full border rounded-md p-2" required>
                            <option value="">Select a type</option>
                            <option value="general">General Inquiry</option>
                            <option value="booking">Booking</option>
                            <option value="support">Support</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium">How can we help you?</label>
                    <textarea
                        className="mt-1 block w-full border rounded-md p-2"
                        rows={4}
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms" className="text-sm">
                        By proceeding with this booking, I agree to Medical Tourism{" "}
                        <a href="#" className="underline">Terms of Use</a> and{" "}
                        <a href="#" className="underline">Privacy Policy</a>.
                    </label>
                </div>

                <button
                    type="submit"
                    className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
