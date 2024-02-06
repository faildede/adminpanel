import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials, setLoginSuccess } from '../slices/authSlice'
import { toast } from "react-toastify";
import Loading from "../components/Loading";


const Login = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading, error }] = useLoginMutation();

    const  { userInfo } = useSelector((state) => state.auth);

 
    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const res = await login({ Email, Password }).unwrap();
            dispatch(setCredentials({...res}));
            dispatch(setLoginSuccess(true))
                navigate('/Homescreen');
        
      
        } catch(error) {
      toast.error(error?.data?.message || error.error); //ловит ошибку 
            // TODO: сделать компонент для отправки ошибки вытаскивая значения 
        }
    }
  
    if(error) {
        console.error(error.data.message || error.error)
    }
    useEffect(() => {
       if(userInfo) {
            navigate('');
        }
    }, [navigate, userInfo])

    return (
        <div>
          { isLoading ?  (
          <div className="container mx-auto may-auto ">
                <Loading/>
          </div>
          
           ) : (      
            <div className="w-full max-w-md p-8 space-y-3 container border-solid border-2 h-full my-24 mx-auto border-red-600 rounded-xl  ">
                <h1 className="text-3xl font-medium text-center robotoC ">Войти</h1><div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                </div>
            <div className=" ">
            <form onSubmit={submitHandler} action="" className="space-y-6">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="username"className="block text-xl">Почта: </label>
                        <input 
                        type="text" 
                        value={Email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Введите почту" 
                        className="w-full px-4 py-3 rounded-md robotoC border focus:outline-none dark:border-gray-700 text-black focus:dark:border-red-600" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block text-xl">Пароль: </label>
                        <input  
                        type="password" 
                        value={Password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Введите пароль" 
                        className="w-full px-4 robotoC py-3  border rounded-md border-black  focus:outline-none focus:dark:border-red-600" />
                    
                    </div>
                    <div className="flex-1 h-px my-12 dark:bg-gray-700"></div>
                     
                    <button className="block w-full p-3 mt-24 text-center rounded-sm text-white   dark:bg-red-500" type="submit">Войти</button>
                </form>
            </div>
	
        </div>)}



        </div>
    )
}
export default Login;