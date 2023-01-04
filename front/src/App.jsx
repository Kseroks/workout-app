import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useAuth} from './hooks/useAuth'

import {routes} from './dataRoutes'
import NotFound from "./componenets/pages/NotFound/NotFound";

const App = () => {
  const {isAuth} = useAuth()
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(route => {
          if (route.auth && !isAuth) {
            return null
          }
          return (
            <Route key={`route ${route.path}`} path={route.path} element={<route.element/>}/>
          )
        })}
        <Route element={NotFound}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
