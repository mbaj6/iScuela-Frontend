import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'

export default function GradesPage() {
  const grades = [
    { id: 1, course: 'Introduction to Python', assignment: 'Python Basics Quiz', grade: 85 },
    { id: 2, course: 'Web Development with React', assignment: 'React Component Project', grade: 92 },
    { id: 3, course: 'Data Science Fundamentals', assignment: 'Data Analysis Report', grade: 88 },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Grades</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Assignment</TableHead>
            <TableHead>Grade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {grades.map((grade) => (
            <TableRow key={grade.id}>
              <TableCell>{grade.course}</TableCell>
              <TableCell>{grade.assignment}</TableCell>
              <TableCell>{grade.grade}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
