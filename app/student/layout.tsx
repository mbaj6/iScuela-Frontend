// app/student/layout.tsx
import StudentLayout from '../components/StudentLayout';

export default function StudentRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <StudentLayout>{children}</StudentLayout>;
}

