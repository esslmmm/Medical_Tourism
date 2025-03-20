import FirstInputs from './ContactUs/FirstInputs';
import SecondInputs from './ContactUs/SecondInputs';
import NavbarContactUs from "./ContactUs/NavbarContactUs";
import Footer from "./ContactUs/Footer";



const ContactForm = () => {
    return (
        <div>
            <NavbarContactUs />
            <div className="flex flex-col items-center py-12 px-4 bg-gray-200 text-black">
                <h2 className="text-2xl font-semibold mb-6">Send us an Email</h2>
                <form className="w-full max-w-3xl space-y-4">
                    <FirstInputs />
                    <SecondInputs />
                    <button
                        type="submit"
                        className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 focus:ring focus:ring-gray-400"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default ContactForm;
