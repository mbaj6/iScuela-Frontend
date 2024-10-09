import Link from 'next/link'

export default function Assignments() {
  const assignments = [
    { id: 1, title: 'Python Basics Quiz', dueDate: '2024-04-15', course: 'Introduction to Python' },
    { id: 2, title: 'React Component Project', dueDate: '2024-04-20', course: 'Web Development with React' },
    { id: 3, title: 'Data Analysis Report', dueDate: '2024-04-25', course: 'Data Science Fundamentals' },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Assignments</h1>
      <table className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Course</th>
            <th className="px-6 py-3 text-left">Due Date</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id} className="border-b">
              <td className="px-6 py-4">{assignment.title}</td>
              <td className="px-6 py-4">{assignment.course}</td>
              <td className="px-6 py-4">{assignment.dueDate}</td>
              <td className="px-6 py-4">
                <Link href={`/assignments/${assignment.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
