'use client'

import { useState, useEffect } from 'react'
import { getCourseById } from '@/app/utils/api'

interface Course {
  name: string;
  content: string;
  // Add other course properties as needed
}

export default function CourseDetail({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    async function fetchCourse() {
      try {
        const courseData = await getCourseById(parseInt(params.id))
        setCourse(courseData)
      } catch (error) {
        console.error('Failed to fetch course:', error)
      }
    }
    fetchCourse()
  }, [params.id])

  if (!course) return <div>Loading...</div>

  return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.content}</p>
    </div>
  )
}
