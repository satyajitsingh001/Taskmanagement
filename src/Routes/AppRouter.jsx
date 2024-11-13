import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../Pages/Dashboard/Home';
import Alltask from '../Pages/Alltask/Alltask';
import Loginpage from '../Pages/Auth/Loginpage';
import Signup from '../Pages/Auth/Signup';
import ProtectedRoute from '../ProtectedRoutes';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Loginpage />} />
                <Route path='/signup' element={<Signup />} />

                <Route path="" element={<ProtectedRoute />}>
                    <Route path='/home' element={<Home />} />
                    <Route path='/task' element={<Alltask />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
