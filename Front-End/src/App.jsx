import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import PublicLayout from './components/PublicLayout'

import Login from "./pages/public/Login"
import ForgotPassword from "./pages/public/ForgotPassword"
import ResetPassword from "./pages/public/ResetPassword"

// Public Pages
import Landing from './pages/public/Landing'
import About from './pages/public/About'
import Statistics from './pages/public/Statistics'
import Contact from './pages/public/Contact'

import AdminDashboardWrapper from './components/admin/AdminDashboardWrapper';
import DrivesPage from './components/admin/DrivesPage'
import  EventsPage from './components/admin/EventsPage'
import StudentsPage from './components/admin/StudentsPage'
import CreateDrivePage from './components/admin/CreateDriveModal'


import StudentDashboard from './components/student/StudentDashboard'
import StudentDrivesPage from './components/student/StudentDrivesPage'
import StudentEventsPage from './components/student/StudentEventsPage'
import StudentLearningPage from './components/student/StudentLearningPage'
import StudentAlumniPage from './components/student/StudentAlumniPage'
import StudentProfilePage from './components/student/StudentProfilePage'
import StudentProfilePending from './components/student/StudentProfilePending'
import StudentCreateProfile from './components/student/StudentCreateProfile'
function App() {
  return (
    <Routes>

      <Route element={<PublicLayout/>}>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login/>} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/reset-password" element={<ResetPassword />} />
     </Route>



      <Route path="/admin/*" element={<AdminDashboardWrapper />}>
      <Route index element={<DrivesPage />} />   {/* default */}
          <Route path="drives" element={<DrivesPage />} >
          <Route path="create" element={<CreateDrivePage />} />
          </Route>
          <Route path="events" element={<EventsPage />} />
          <Route path="students" element={<StudentsPage />} />

      </Route>

      <Route path="/student/*" element={<StudentDashboard />}>
         <Route index element={<StudentProfilePage />} />
         <Route path="drives" element={<StudentDrivesPage />} />
         <Route path="events" element={<StudentEventsPage />} />
         <Route path="learning" element={<StudentLearningPage />} />
         <Route path="alumni" element={<StudentAlumniPage />} />
         <Route path="profile" element={<StudentProfilePage />} />
          <Route path="profile-pending" element={<StudentProfilePending />}/>
          <Route path="create-profile"  element={<StudentCreateProfile/>}/>
      </Route>
    </Routes>
  )
}

export default App
