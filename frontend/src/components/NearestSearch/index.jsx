import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import CardCarousel from '../CardCarousel'
import Location from '../Location'
const NearestSearch = (props) => {
    return (
        <>
            <div className="text-center bg-slate-200 p-20">
                <h2 className='font-bold text-6xl'>Find the Nearest Expert for you!</h2>
                <p className='font-semibold text-xl mt-3'>Get Personalized advice from top experts to your specific questions</p>
                <Location />
            </div>
        </>

    )
}

export default NearestSearch