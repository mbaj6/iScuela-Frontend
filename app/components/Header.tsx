import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          LMS
        </Link>
        <div>
          <Link href="/login" className="text-white mr-4">
            Login
          </Link>
          <Link href="/register" className="text-white">
            Register
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
