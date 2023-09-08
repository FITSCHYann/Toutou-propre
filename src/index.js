import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { UserProvider } from "./context/user.context"
import SignIn from './component/Public/Login/SignIn';
import SignUp from './component/Public/Login/SignUp';
import Welcome from './component/Public/Welcome/Welcome';
import Salon from './component/Public/Salon/Salon';
import Benefit from './component/Public/Benefit/Benefit';
import Rate from './component/Public/Rate/Rate';
import Contact from './component/Public/Contact/Contact';
import TakeAppointment from './component/Private/User account/TakeAppointment';
import AdminDashboard from "./component/Private/Admin account/AdminDashboard"
import UserDaschboard from "./component/Private/User account/UserDaschboard"
import Appointment from './component/Private/Admin account/Appointment';
import Users from './component/Private/Admin account/Users';
import MyAppointment from './component/Private/User account/MyAppointment';
import MyAccount from './component/Private/User account/MyAccount';


const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path='/' element={<Welcome />} />
              <Route path='/Accueil' element={<Welcome />} />
              <Route path='/Admin' element={<AdminDashboard />} />
              <Route path='/Admin/Rendez-vous' element={<Appointment />} />
              <Route path='/Admin/Utilisateurs' element={<Users />} />
              <Route path='/User' element={<UserDaschboard />} />
              <Route path='/User/Mes-rendez-vous' element={<MyAppointment />} />
              <Route path='/User/Mon-compte' element={<MyAccount />} />
              <Route path='/Salon' element={<Salon />} />
              <Route path='/Prestation' element={<Benefit />} />
              <Route path='/Tarif' element={<Rate />} />
              <Route path='/Contact' element={<Contact />} />
              <Route path='/Rendez-vous' element={<TakeAppointment />} />
              <Route path='/login/signin' element={<SignIn />} />
              <Route path='/login/signup' element={<SignUp />} />
              <Route path='*' element={<Welcome />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  </React.StrictMode>
);

