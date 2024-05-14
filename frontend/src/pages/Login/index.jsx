import companyLogo from '../../assets/png/Black-logo-no-background.png';
import { useNavigate } from "react-router-dom"
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/authSlice/authSlice';
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error } = useSelector((state) => state.user)
    const defaultValue = {
        email: '',
        password: ''
    };
    const validationSchema = yup.object().shape({
        email: yup.string().email().required('Please enter a valid email address'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Please enter a password')
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: defaultValue,
        validationSchema: validationSchema,
        // onSubmit: async (values, action) => {
        //     try {
        //         console.log(values)
        //         const response = await axios.post('http://localhost:3333/login', values);
        //         localStorage.setItem("token", response.data.token);
        //         console.log('Response:', response.data);
        //         // Handle success, e.g., redirect to another page
        //         action.resetForm();
        //         navigate("/")
        //     } catch (error) {
        //         console.error('Error:', error);
        //         // Handle error, e.g., display an error message to the user
        //     }
        // }
        onSubmit: async (values, action) => {
            dispatch(loginUser(values)).then((result) => {
                if (result.payload) {
                    action.resetForm();
                    navigate("/")
                }
            })
        }
    })
    const logoClickHandler = () => {
        navigate('/')
    }
    return (
        <>
            <div className="flex min-h-screen">
                <div className="flex flex-row w-full">
                    <div className='hidden lg:flex flex-col justify-between bg-white lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg'>
                        <div className="flex items-center justify-start space-x-3">
                            {/* <span className="bg-black rounded-full w-8 h-8"></span> */}
                            <img className='w-[70px] h-[70px] cursor-pointer' src={companyLogo} alt="Logo" onClick={() => {
                                logoClickHandler()
                            }} />
                        </div>
                        <div className='space-y-5'>
                            <h1 className="lg:text-3xl xl:text-5xl xl:leading-snug font-extrabold">Enter your account and discover new
                                experiences</h1>
                            <p className="text-lg">You do not have an account?</p>
                            <button onClick={() => {
                                navigate('/signup');
                            }}
                                className="inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white">Create
                                account here</button>
                        </div>
                        <p className="font-medium">© 2024 eMate</p>
                    </div>

                    <div className="flex flex-1 flex-col items-center justify-center px-10 relative h-screen">
                        <div className="flex lg:hidden justify-between items-center w-full py-4">
                            <div className="flex items-center justify-start space-x-3">
                                {/* <span className="bg-black rounded-full w-6 h-6"></span> */}
                                <img className='headerImg w-[70px] h-[70px] cursor-pointer' src={companyLogo} alt="Logo" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>Not a member? </span>
                                <a href="#" className="underline font-medium text-[#070eff]"> onClick={() => {
                                    navigate('/signup');
                                }}
                                    Sign up now
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
                            <div className="flex flex-col space-y-2 text-center">
                                <h2 className="text-3xl md:text-4xl font-bold">Sign in to account</h2>
                            </div>
                            <div className="flex flex-col max-w-md space-y-5">
                                <form className="flex flex-col max-w-md space-y-5" onSubmit={handleSubmit}>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="flex px-3 py-2 md:px-4 md:py-2 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoComplete="off"
                                    />
                                    {errors.email && touched.email ? <p className='text-red-800'>{errors.email}</p> : null}
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        autoComplete="off"
                                        className="flex px-3 py-2 md:px-4 md:py-2 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.password && touched.password ? <p className='text-red-800'>{errors.password}</p> : null}
                                    <button type='submit' className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">
                                        {loading ? 'Loding...' : 'Confirm'}
                                    </button>
                                    {error && ( <div className='text-red-800' role='alert'>{error}</div>)}
                                </form>

                                {/* <div className="flex justify-center items-center">
                                    <span className="w-full border border-black"></span>
                                    <span className="px-4">Or</span>
                                    <span className="w-full border border-black"></span>
                                </div>
                                <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black relative">
                                    <span className="absolute left-4">
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                            <path fill="#EA4335 " d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                                            <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                                            <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                                            <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
                                        </svg>
                                    </span>
                                    <span>Sign in with Google</span>
                                </button> */}
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </>

    )
}

export default Login