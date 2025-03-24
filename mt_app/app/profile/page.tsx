'use client'

import { useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const Profile = () => {
const {data: session, status} = useSession()
const router = useRouter()

useEffect(() => {
  if (status === 'unauthenticated'){
    router.push('/')
  }

}, [router, status])

// console.log('session', session?.user?.role)
// console.log('status', status)
  return (
    status === 'authenticated' && session.user && (<div>
        <div>
            <p>Name {session.user.name}</p>
            <p>Email {session.user.email}</p>
            <p>Role {session.user.role}</p>
            <button onClick={()=> signOut( {callbackUrl:'/'})} className="border bg-red-100">signOut</button>
        </div>
    </div>)
    
  )
}
export default Profile