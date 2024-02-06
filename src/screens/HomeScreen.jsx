import { useEffect } from 'react';
import  Dashboard  from '../components/Dashboard'
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginSuccess } from '../slices/authSlice';
import { toast } from "react-toastify";
import Sidebar from '../components/Sidebar';
import { useState } from 'react';


const HomeScreen = () => {
    const loginSuccess = useSelector(state => state.auth.loginSuccess);
    const dispatch = useDispatch();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(prev => !prev);
    };
    useEffect(() => {
        if (loginSuccess) {
            toast.success('Выполнен вход в систему!');
            dispatch(setLoginSuccess(false)); // Сброс флага
        }
    }, [loginSuccess, dispatch]);

    return (
        <div>
            <Header  toggleSidebar={toggleSidebar} />
            <div className='flex'>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
                <Dashboard />
            </div>
        </div>
    )
}
export default HomeScreen;