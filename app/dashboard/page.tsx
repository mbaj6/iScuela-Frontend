'use client'

import ProtectedRoute from '../components/ProtectedRoute'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCourses } from '@/app/utils/api'

interface Course {
  id: number
  title: string
  description: string
}

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    async function fetchCourses() {
      try {
        const coursesData = await getCourses()
        setCourses(coursesData)
      } catch (error) {
        console.error('Failed to fetch courses:', error)
      }
    }
    fetchCourses()
  }, [])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Courses</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-gray-50 overflow-hidden shadow-lg rounded-lg">
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{course.title}</h2>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      <Link 
                        href={`/courses/${course.id}`}
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                      >
                        View Course
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
