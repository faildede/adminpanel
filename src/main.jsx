import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Route, RouterProvider,  createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.jsx'
import Products from './screens/Products.jsx'
import Order from './screens/Order.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Register from './screens/Register.jsx'
import { ToastContainer } from 'react-toastify';


const router  = createBrowserRouter(
  createRoutesFromElements(

    <Route>
      <Route path="/" element={<App/>} />
      <Route path='/sds' element={<Register />} />
      <Route  element={<PrivateRoute />} >
          <Route index={true} path='/Homescreen' element={<HomeScreen />} />
          <Route index={true} path="/Product" element={<Products/>} />
          <Route index={true} path='/Order' element={<Order/>} />
      </Route>
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <React.StrictMode>
      <ToastContainer/>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>

)
