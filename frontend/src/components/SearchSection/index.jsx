import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import CardCarousel from '../CardCarousel'
const SearchSection = (props) => {
    return (
        <>
        {/* ref={sectionRef} */}
            <div className="text-center bg-white p-20">
                <h2 className='font-bold text-6xl'>Find the right expert</h2>
                <p className='font-semibold text-xl mt-3'>Get Personalized advice from top experts to your specific questions</p>
                <div className="mt-5 text-center flex justify-center items-center relative">
                    <input
                        type="text"
                        placeholder="Try 'I am a software engineer looking for a career advice'"
                        className="px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-3xl font-medium placeholder:font-normal w-full"
                    />
                    <button className='absolute inset-y-1 right-2 md:hidden ml-2 px-2 py-2 bg-transparent text-black rounded-full cursor-pointer'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <button className='absolute inset-y-1 right-2 hidden md:block ml-2 px-4 py-2 bg-indigo-400 text-white rounded-3xl cursor-pointer hover:bg-indigo-200 hover:text-black'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
                    </button>
                </div>
                <div className='mt-5'>
                    <CardCarousel />
                </div>


            </div>
        </>

    )
}

export default SearchSection