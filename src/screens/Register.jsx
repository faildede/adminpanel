import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
        const [userName, setUserName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');

        const navigate = useNavigate();
        const dispatch = useDispatch();

        const { userInfo } = useSelector((state) => state.auth);

        const [register, { isLoading }] = useRegisterMutation();

        useEffect(() => {
            if (userInfo) {
                navigate('/Homescreen')
            }
        }, [navigate, userInfo])

        const submitHandler = async (e) => {
            e.preventDefault();
            if(password !== confirmPassword) {
                toast.error('Пароль не заполнен')
            } else {
                try {
                    const res = await register({ userName, email, password }).unwrap();
                    dispatch(setCredentials({...res}));
                    navigate('/Homescreen')
                } catch (err) {
                    toast.error(err.data?.message || err.error);
                }
            }
        }

    return (
        <div>
            <Header />
            {isLoading? (<Loading/>) : 
            (
                <section className="p-6 ">
                <form onSubmit={submitHandler}  className="container w-full max-w-xl p-8 mx-auto space-y-6 border-2 border-red-500 rounded-md shadow text-black">
                    <h2 className="w-full text-3xl font-bold leadi">Создать новую учетную запись</h2>
                    <div>
                        <label  className="block mb-1 ml-1">Имя: </label>
                        <input 
                        type="name" 
                        placeholder="Ваше имя" 
                        value={userName}
                        required="" 
                        onChange={(e) => setUserName(e.target.value)}
                        className="block w-full p-2 border border-black rounded focus:border-red-600 focus:outline-none   " />
                    </div>
                    <div>
                        <label  className="block mb-1 ml-1">Почта: </label>
                        <input 
                        type="email" 
                        value={email}
                        placeholder="Ваша почта" 
                        onChange={(e) => setEmail(e.target.value)}
                        required="" 
                        className="block w-full p-2 border border-black rounded focus:border-red-600 focus:outline-none " />
                    </div>
                    <div>
                        <label  className="block mb-1 ml-1">Пароль: </label>
                        <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" 
                        placeholder="" 
                        required="" 
                        className="block w-full p-2 border border-black rounded focus:border-red-600 focus:outline-none " />
                    </div>
                    <div>
                        <label  className="block mb-1 ml-1">Повторите пароль: </label>
                        <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                         placeholder="" 
                         required="" 
                         className="block w-full p-2 border border-black rounded focus:border-red-600 focus:outline-none" />
                    </div>
                    <div>
                        <button type="submit" className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ri dark:bg-red-500 focus:ri hover:ri dark:text-white">Создать</button>
                    </div>
                </form>
            </section>
            )}

        </div>
    )
}
export default Register;