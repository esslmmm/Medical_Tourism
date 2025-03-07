import { Card, CardContent } from "./widgetsBM/card";
import { Tabs, TabsList, TabsTrigger } from "./widgetsBM/tabs";
import { FaRegUser, FaCalendarAlt, FaRegCommentDots } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineEventAvailable } from "react-icons/md";

export default function UserDetail() {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r p-5 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-teal-600">Medical <br /> Tourism</h2>
                    <nav className="mt-8">
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                                <FaRegUser size={18} />
                                <span>Profile</span>
                            </li>
                            <li className="flex items-center space-x-3 text-teal-600 font-semibold cursor-pointer">
                                <MdOutlineEventAvailable size={18} />
                                <span>Booking Management</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer relative">
                                <FaRegCommentDots size={18} />
                                <span>Chat</span>
                                <span className="absolute right-0 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">•</span>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                    <HiOutlineLogout size={18} />
                    <span>Log out</span>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 p-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <Tabs defaultValue="user">
                        <TabsList className="bg-white shadow-md p-2 rounded-lg">
                            <TabsTrigger value="Service Detail">Service Detail</TabsTrigger>
                            <TabsTrigger value="User Detail" className="bg-gray-200">User Detail</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    {/* User Profile */}
                    <div className="flex items-center space-x-3">
                        {/* <img
                            src="https://via.placeholder.com/40"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                        /> */}
                        <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                        <div>
                            <p className="text-sm-black font-semibold text-black">Ekkarat Singkhala</p>
                            <p className="text-xs text-gray-500">Junior Staff</p>
                        </div>
                    </div>
                </div>

                {/* User Details */}
                <section className="mt-6 space-y-4">
                    {/* Contact Detail */}
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-black font-semibold mb-4">Contact Detail</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="font-medium text-black">First Name</p>
                                    <p className="text-black">Ekkarat</p>
                                </div>
                                <div>
                                    <p className="font-medium text-black">Last Name</p>
                                    <p className="text-black">Singkhala</p>
                                </div>
                                <div>
                                    <p className="font-medium text-black">Country</p>
                                    <p className="text-black">Thailand</p>
                                </div>
                                <div>
                                    <p className="font-medium text-black">Phone</p>
                                    <p className="text-black">+66 812511440</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="font-medium text-black">Email</p>
                                    <p className="text-black">6531501137@lamduan.mfu.ac.th</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Patient Detail */}
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-black font-semibold mb-4">Patient Detail</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="font-medium text-black">First Name</p>
                                    <p className="text-gray-600">Ekkarat</p>
                                </div>
                                <div>
                                    <p className="font-medium text-black">Last Name</p>
                                    <p className="text-gray-600">Singkhala</p>
                                </div>
                                <div>
                                    <p className="font-medium text-black">Gender</p>
                                    <p className="text-gray-600">Male</p>
                                </div>
                                <div>
                                    <p className="font-medium text-black">Nationality</p>
                                    <p className="text-gray-600">Thai</p>
                                </div>
                                <div>
                                    <p className="font-medium text-black">Date of Birth</p>
                                    <p className="text-gray-600">10-10-1990</p>
                                </div>
                                <div>
                                    <p className="font-medium text-black">Passport ID</p>
                                    <p className="text-gray-600">AB-365-134-1345</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </main>
        </div>
    );
}
