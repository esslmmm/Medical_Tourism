import React from 'react'

const ContactDetails = () => {
  return (
      <div>{/* Contact Detail */}
          <div className="bg-white p-6 rounded-lg shadow border mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Detail</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                  <div>
                      <p className="font-medium">First Name</p>
                      <p>Ekkarat</p>
                  </div>
                  <div>
                      <p className="font-medium">Last Name</p>
                      <p>Singhkha</p>
                  </div>
                  <div>
                      <p className="font-medium">Country</p>
                      <p>Thailand</p>
                  </div>
                  <div>
                      <p className="font-medium">Phone</p>
                      <p>+66 872311430</p>
                  </div>
                  <div className="col-span-2">
                      <p className="font-medium">Email</p>
                      <p>620501231@lamduan.mfu.ac.th</p>
                  </div>
              </div>
          </div></div>
  )
}

export default ContactDetails