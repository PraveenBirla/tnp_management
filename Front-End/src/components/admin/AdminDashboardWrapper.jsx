import TopNavbar from './TopNavbar'
import { Outlet } from 'react-router-dom'

export default function AdminDashboardWrapper() {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavbar />
      <Outlet />
    </div>
  )
}
