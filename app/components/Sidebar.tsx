import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Student Information', href: '/student' },
    { name: 'Teacher Portal', href: '/teacher' },
    { name: 'Reports', href: '/reports' },
    { name: 'Settings', href: '/settings' },
  ]

  return (
    <div className="bg-blue-900 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <Link href="/" className="text-white flex items-center space-x-2 px-4">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span className="text-2xl font-extrabold">LMS</span>
      </Link>
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              pathname === item.href ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-800 hover:text-white'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
