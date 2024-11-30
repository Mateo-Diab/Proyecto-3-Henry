import Login from './views/Login/Login'
import AppointementsView from './views/AppointementsView/AppointementsView'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import Home from './views/Home/Home'
import Contact from './views/Contact/Contact'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import About from './views/About/About'
import FormAppointements from './views/FormAppointements/FormAppointements'
import Register from './views/Register/Register'
import { UsersContext } from './contexts/UsersContext'
import { useEffect, useContext } from 'react'

function App() {

  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useContext(UsersContext);

  
  useEffect(() => {

    const routes = ["/home", "/appointements", "/contact", "/about", "/newappointement"];

    if(!user && location.pathname !== "/login" && location.pathname !== "/register"){
      navigate("/login");
    }

    if(user && (location.pathname === "/login" || location.pathname === "/register" || !routes.includes(location.pathname))){
      navigate("/home")
    }

  }, [location.pathname, user, navigate])

    return (
      <div>
        
        { !user ? (
            <main>
              <Routes>
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
              </Routes>
            </main>
          ) : (
              <main>
                <NavBar />  
                <Routes>
                  <Route path='/home' element={<Home/>}></Route>
                  <Route path='/appointements' element={<AppointementsView/>}></Route>
                  <Route path='/contact' element={<Contact/>}></Route>
                  <Route path='/newappointement' element={<FormAppointements/>}></Route>
                  <Route path='/about' element={<About/>}></Route>
                </Routes>
              </main>
          )
        }
      </div>
    )
}

export default App