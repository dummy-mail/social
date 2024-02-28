import Home from '../components/feature/Home';
import About from '../components/feature/About';
import Contact from '../components/feature/Contact';
import Calculator from '../components/feature/Calculator';
import CalcuLator from '../components/feature/OneFileCalci';
import { Route, Routes } from 'react-router-dom';
import Teacher from '../components/feature/Teacher';
import AddEditTeacher from '../components/feature/AddEditTeacher';
import Login from '../components/feature/Login';
import Logout from '../components/feature/Logout';
import Profile from '../components/feature/Profile';
import Game1 from '../components/feature/Game1';
import Inbox from '../components/feature/Inbox';
import CompA from '../components/feature/CompA';
import CompB from '../components/feature/CompB';

let AllRoutes = () =>{
        return(
            <Routes>
                <Route path='' element={<Home />} />
                <Route path='about' element={<About />} />
                {/* <Route path='contact' element={<Contact />} /> */}
                <Route path='calculator' element={<Calculator/>} />
                {/* <Route path='ofc' element={<CalcuLator/>} /> */}
                {/* <Route path='teacher' element={<Teacher/>} />
                <Route path='teacher/add' element={<AddEditTeacher/>} />
                <Route path='teacher/:id' element={<AddEditTeacher/>} /> */}
                <Route path='login' element={<Login/>} />
                <Route path='inbox' element={<Inbox/>} />
                <Route path='game1' element={<Game1/>} />
                <Route path='compa' element={<CompA/>} />
                <Route path='compb' element={<CompB/>} />
                <Route path='logout' element={<Logout/>} />
                <Route path='profile' element={<Profile/>} />
            </Routes>
        )
}

export default AllRoutes;