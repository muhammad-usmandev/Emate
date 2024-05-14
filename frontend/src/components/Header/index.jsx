import companyLogo from '../../assets/png/Black-logo-no-background.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
const Header = () => {
    const navigate = useNavigate()
    const logoClickHandler = () => {
        navigate('/')
    }
    const logInClickHandler = () => {
        navigate('/login')
    }
    const signUpClickHandler = () => {
        navigate('/signup')
    }
    return (
        <>
            <nav className="w-full h-[80px] bg-indigo-300 flex justify-between items-center px-4 pt-0 md:px-16 fixed top-0 z-50">
                <div>
                    <img className='w-[70px] h-[70px] cursor-pointer' src={companyLogo} alt="Logo" onClick={() => {
                        logoClickHandler()
                    }}/>
                </div>
                {/* <ul className='hidden md:flex font-semibold'>
                    <li className='mx-[12px] cursor-pointer hover:text-white text-xl'>Home</li>
                    <li className='mx-[12px] cursor-pointer hover:text-white text-xl'>About Us</li>
                    <li className='mx-[12px] cursor-pointer hover:text-white text-xl'>Contact</li>
                </ul> */}
                <div className='font-semibold md:flex'>
                    <button className='hidden md:block hover:bg-indigo-200 hover:text-black mx-[10px] px-4 py-2 bg-indigo-400 text-white rounded-3xl cursor-pointer'><FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => {
                        logInClickHandler()
                    }}/> AI Search</button>
                    <button className='hidden md:block hover:bg-indigo-200 hover:text-black mx-[10px] px-4 py-2 bg-indigo-400 text-white rounded-lg cursor-pointer' onClick={() => {
                        logInClickHandler()
                    }}>Login</button>
                    <button className='hidden md:block hover:bg-indigo-200 hover:text-black mx-[10px] px-4 py-2 bg-indigo-400 text-white rounded-lg cursor-pointer' onClick={() => {
                        signUpClickHandler()
                    }}>Sign Up</button>
                    <div className='md:hidden'>
                        <a href="#" className='text-4xl'>&#8801;</a>
                    </div>
                </div>
            </nav >
        </>

    )
}

export default Header