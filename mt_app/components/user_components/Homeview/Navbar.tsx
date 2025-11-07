const Navbar = () => {
  return (
    <div><nav className="bg-teal-400 text-white px-8 py-4 flex justify-between items-center">
        <div className="text-lg font-bold leading-tight">
          <div>SENIOR</div>
          <div>PROJECT</div>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium cursor-pointer hover:opacity-80">Contact US</span>
          <span className="text-sm font-medium cursor-pointer hover:opacity-80">THB</span>
          <div className="w-8 h-6 rounded overflow-hidden flex items-center justify-center">
            <svg className="w-8 h-6" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
              <rect width="60" height="30" fill="#012169"/>
              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFF" strokeWidth="6"/>
              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
              <path d="M30,0 L30,30 M0,15 L60,15" stroke="#FFF" strokeWidth="10"/>
              <path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" strokeWidth="6"/>
            </svg>
          </div>
          <button className="px-5 py-2 bg-white text-teal-400 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors">
            Register
          </button>
          <button className="px-5 py-2 bg-white text-teal-400 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors">
            Sign in
          </button>
        </div>
      </nav></div>
  )
}
export default Navbar