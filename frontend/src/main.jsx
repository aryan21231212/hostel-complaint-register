
import { createRoot } from 'react-dom/client'
import {Route ,Routes, BrowserRouter} from 'react-router-dom'
import './index.css'
import Signup from './pages/auth/Signup'
import Signin from './pages/auth/Login'
import StudentDashboard from './pages/student/StudentDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/studentDashboard' element={<StudentDashboard />} />
      <Route path='/AdminDashboard' element={<AdminDashboard />} />
      
    </Routes>
  </BrowserRouter>
   

)

