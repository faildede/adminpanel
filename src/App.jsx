import './App.css';
import Login from './screens/Login';
import { ToastContainer } from 'react-toastify';
import  'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom';
import Header from './components/Header'


function App() {
  return (
    <>
       <ToastContainer/>
          <div>
            <Header />
            <Login />
          </div>
        <Outlet />
    </>
  );
}

export default App;
