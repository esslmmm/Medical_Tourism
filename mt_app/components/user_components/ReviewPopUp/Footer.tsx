export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8 px-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
                {/* Logo & Copyright */}
                <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl font-semibold">
                        <span className="text-red-500">Med</span>
                        <span className="text-green-500">ical</span>{" "}
                        <span className="text-black">Tour</span>
                        <span className="text-blue-500">ism</span>
                    </h2>
                    <p className="text-sm mt-2">&copy; 2020 Nexcent Ltd.</p>
                    <p className="text-xs">All rights reserved</p>
                </div>

                {/* Company Section */}
                <div className="mb-6 md:mb-0">
                    <h3 className="text-lg font-semibold text-white">Company</h3>
                    <ul className="mt-2 space-y-1">
                        <li><a href="#" className="hover:underline">About us</a></li>
                        <li><a href="#" className="hover:underline">Technical feedback</a></li>
                        <li><a href="#" className="hover:underline">Hospitals</a></li>
                        <li><a href="#" className="hover:underline">Packages</a></li>
                    </ul>
                </div>

                {/* Support Section */}
                <div className="mb-6 md:mb-0">
                    <h3 className="text-lg font-semibold text-white">Support</h3>
                    <ul className="mt-2 space-y-1">
                        <li><a href="#" className="hover:underline">Chat support</a></li>
                        <li><a href="#" className="hover:underline">Help center</a></li>
                        <li><a href="#" className="hover:underline">Cancellation</a></li>
                        <li><a href="#" className="hover:underline">My booking</a></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <h3 className="text-lg font-semibold text-white">Contact us</h3>
                    <ul className="mt-2 space-y-1">
                        <li>
                            <a href="mailto:support@figma.com" className="flex items-center hover:underline">
                                📧 support@figma.com
                            </a>
                        </li>
                        <li>
                            <a href="tel:+18008543680" className="flex items-center hover:underline">
                                📞 +1 800 854-36-80
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Windows Activation Notice */}
            <div className="text-right text-xs text-gray-500 mt-6">
                Activate Windows <span className="text-gray-400">Go to Settings to activate Windows.</span>
            </div>
        </footer>
    );
}
