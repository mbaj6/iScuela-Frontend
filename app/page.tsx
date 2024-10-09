'use client'

import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">Welcome to LMS</h1>
          <p className="text-xl text-gray-600">Your one-stop solution for online learning</p>
        </header>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image 
                src="/images/iScuela-ONE.webp" 
                alt="Learning" 
                width={192} 
                height={192} 
                className="h-48 w-full object-cover md:w-48"
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Features</div>
              <p className="mt-2 text-gray-600">
                Discover a world of knowledge with our comprehensive learning management system. 
                Access courses, track progress, and engage with instructors all in one place.
              </p>
              <div className="mt-4 flex space-x-4">
                <Link href="/login" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Login
                </Link>
                <Link href="/register" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-xl mb-2">Wide Range of Courses</h3>
            <p className="text-gray-600">Explore courses in various subjects tailored to your learning needs.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-xl mb-2">Interactive Learning</h3>
            <p className="text-gray-600">Engage with instructors and peers through our interactive platform.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-xl mb-2">Progress Tracking</h3>
            <p className="text-gray-600">Monitor your learning progress and achievements with ease.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
