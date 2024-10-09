import { Button } from '@/app/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/components/ui/card'



export default function QuizzesPage() {
  const quizzes = [
    { id: 1, title: 'Python Basics', description: 'Test your knowledge of Python fundamentals', timeLimit: '30 minutes' },
    { id: 2, title: 'React Concepts', description: 'Assess your understanding of React core concepts', timeLimit: '45 minutes' },
    { id: 3, title: 'Data Science Techniques', description: 'Evaluate your data science skills', timeLimit: '60 minutes' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id}>
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Time Limit: {quiz.timeLimit}</p>
              <Button>Start Quiz</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
