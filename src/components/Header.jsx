import zyro from '../assets/zyro.png'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router';
import { GiHamburgerMenu } from 'react-icons/gi'


const Header = ({ toggleSidebar }) => {
    const { userInfo } = useSelector((state) => state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = () => {
        // eslint-disable-next-line no-undef
        dispatch(logout());
        if(logout()){
            navigate('/')
        }
    }


    return (
        <div className="  border-b border-red-500 w-auto"> 
        { userInfo ? (
            <div className='flex justify-between my-4 container mx-auto'> 
                <div className='text-xl'>
                    <p id='username'>Здравстуйте, {userInfo.userName} !</p>
                </div>
                <div className='text-xl cursor-pointer hover-effect'>
                    <p onClick={handleLogout} >Выйти</p>
                </div>
            </div>
        ) : (
            <div className="flex justify-between  container mx-auto">
                   <button
                 onClick={toggleSidebar}
                className="p-3 border-2 border-zinc-800 rounded-xl"
                aria-label="toggle sidebar"
            >
                <GiHamburgerMenu />
            </button>
                <div>
                    <img className='h-24 ' src={zyro}  />
                </div>
                <div className='my-auto'>   
                    <p className="text-2xl  font-normal robotoC text-center">Админ панель</p>
                </div>  
            </div>
        ) }
            
        </div>
    )
}
export default Header;