import Link from 'next/link'

export default function Courses() {
  const courses = [
    { id: 1, title: 'Introduction to Python', description: 'Learn the basics of Python programming' },
    { id: 2, title: 'Web Development with React', description: 'Build modern web applications with React' },
    { id: 3, title: 'Data Science Fundamentals', description: 'Explore the world of data science and analytics' },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <Link href={`/courses/${course.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View Course
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}