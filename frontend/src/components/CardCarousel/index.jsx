import hsProfile from '../../assets/png/hsprofile.png';
const CardCarousel = () => {
    return (
        <>
            <input className="sr-only peer" type="radio" name="carousel" id="carousel-1" checked />
            {/* <!-- content #1 --> */}
            <div
                className="relative w-96 mx-auto bg-white rounded-lg shadow-lg transition-all duration-300 opacity-0 peer-checked:opacity-100">
                <img className="rounded-t-lg w-96 h-64" src={hsProfile} alt="" />
                <div className="py-4 px-8">
                    <h1 className="hover:cursor-pointer mt-2 text-gray-900 font-bold text-2xl tracking-tight">Haris Leghari
                    </h1>
                    <p className="hover:cursor-pointer py-3 text-gray-600 leading-6">I am Software Engineer at Meta (fka Facebook)
                    </p>
                </div>
                {/* <!-- controls --> */}
                <div className="absolute top-1/2 w-full flex justify-between z-20">
                    <label htmlFor="carousel-3" className="inline-block text-blue-600 cursor-pointer -translate-x-5 bg-white rounded-full shadow-md active:translate-y-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                        </svg>
                    </label>
                    <label htmlFor="carousel-2" className="inline-block text-blue-600 cursor-pointer translate-x-5 bg-white rounded-full shadow-md active:translate-y-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
            </div>
        </>
    )
}
export default CardCarousel