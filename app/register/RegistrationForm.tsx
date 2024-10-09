'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { register } from '@/app/utils/api'
import styles from '@/styles/RegistrationForm.module.css'

export default function RegistrationForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('student')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(username, password, userType)
      router.push('/login')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Register</h2>
      <div className={styles.formGroup}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="userType">User Type</label>
        <select
          id="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>
      <button type="submit" className={styles.submitButton}>Register</button>
    </form>
  )
}
