import AuthenticatedNavbar from '../../components/user_components/Main/AuthenticatedNavbar'
import Navbar from '../../components/user_components/Main/Navbar'
import { signIn, auth, signOut } from '../api/auth/auth'
import Image from "next/image"

export default async function SignIn() {
  const session = await auth()
  const user = session?.user

  return user ? 
  (
    <div>
    <AuthenticatedNavbar />
    <div className="flex flex-col items-center space-y-4 p-6">
      
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome {session?.user?.name}</h1>
        {session?.user?.image && (
          <Image 
            src={session.user.image} 
            alt="Profile picture"
            width={80}
            height={80}
            className="rounded-full mx-auto mb-4"
          />
        )}
        <p className="text-gray-600">Email: {session?.user?.email}</p>
      </div>
      
      <form
        action={async () => {
          "use server"
          await signOut();
        }}
      >
        <button 
          type="submit" 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
        >
          Sign out
        </button>
      </form>
    </div>
  </div>
  ) :
  (
    <div>
      <AuthenticatedNavbar />
        <div className="flex justify-center items-center min-h-screen">
          <form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors hover:cursor-pointer"
            >
              Sign in with Google
            </button>
          </form>
        </div>
    </div>
  )
}