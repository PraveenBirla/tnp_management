import { Outlet } from 'react-router-dom'
import StudentTopNavbar from './StudentTopNavbar'

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <StudentTopNavbar />
      <Outlet />
    </div>
  )
}
