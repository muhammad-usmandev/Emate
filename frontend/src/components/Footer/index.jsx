import companyLogo from '../../assets/png/Black-logo-no-background.png';
import { useNavigate } from "react-router-dom"
const Footer = () => {
    const navigate = useNavigate()
    const logoClickHandler = () => {
        navigate('/')
    }
    return (
        <>
            <div>
                <footer className="bg-slate-200 dark:bg-gray-900">
                    <div className="container px-6 py-2 mx-auto">
                        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

                        <div className="flex flex-col items-center justify-between sm:flex-row">
                            <a href="#">
                                <img className="w-[90px] h-[90px] cursor-pointer" src={companyLogo} alt="Logo" onClick={() => {
                        logoClickHandler()
                    }}/>
                            </a>

                            <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-300">© Copyright 2024. All Rights Reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>

    )
}

export default Footer
