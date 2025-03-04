export default function Navbar() {
    return (
        <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between border-b">
            <div className="text-xl font-semibold text-gray-800">Medical <span className="text-blue-500">Tourism</span></div>

            <div className="flex items-center space-x-6">
                <span className="text-gray-600">USD</span>
                <img src="/flags/uk.png" alt="UK Flag" className="w-6 h-4" />
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Welcome back,</span>
                    <span className="font-semibold text-gray-800">Wahiru Kuang Wafi</span>
                </div>
            </div>
        </nav>
    );
}
