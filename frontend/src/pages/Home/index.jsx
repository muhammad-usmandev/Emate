import Faq from "../../components/FAQ"
import HeroSection from "../../components/HeroSection/index"
import NearestSearch from "../../components/NearestSearch"
import SearchSection from "../../components/SearchSection/index"

const Home = () => {
    return (
        <>
        <HeroSection />
        <SearchSection />
        <NearestSearch />
        <Faq />
        </>

    )
}

export { Home }