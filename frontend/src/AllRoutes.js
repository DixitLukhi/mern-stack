import React from 'react'
import { Route, Routes } from "react-router-dom";
import App from './App';
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';

export default function AllRoutes() {
  return (
    <Routes>
      <Route path='/' exact Component={Home} />
      <Route path='/signup' exact Component={Signup} />
      <Route path='/signin' exact Component={Signin} />
    </Routes>
  )
}
