import React from 'react'
import { Card, CardContent } from "./widgets/card";

const ContactDetails = () => {
  return (
      <div><Card>
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
      </Card></div>
  )
}

export default ContactDetails