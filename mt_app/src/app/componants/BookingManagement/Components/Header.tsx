import React from 'react'
import { Tabs, TabsList, TabsTrigger } from "./widgets/tabs";


const Header = () => {
  return (
      <div><div className="flex justify-between items-center">
          <Tabs defaultValue="user">
              <TabsList className="bg-white shadow-md p-2 rounded-lg">
                  <TabsTrigger value="Service Detail">Service Detail</TabsTrigger>
                  <TabsTrigger value="User Detail" className="bg-gray-200">User Detail</TabsTrigger>
              </TabsList>
          </Tabs>
          {/* User Profile */}
          <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
              <div>
                  <p className="text-sm-black font-semibold text-black">Ekkarat Singkhala</p>
                  <p className="text-xs text-gray-500">Junior Staff</p>
              </div>
          </div>
      </div></div>
  )
}

export default Header