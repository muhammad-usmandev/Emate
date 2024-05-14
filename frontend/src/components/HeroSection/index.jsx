const HeroSection = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-around items-center p-20">
                <div className="w-[315px]">
                    <h1 className="font-black text-6xl leading-relaxed">Be a <span className="bg-slate-300 p-3 rounded text-white">Mentor</span></h1>
                    <h4 className="font-semibold text-xl pt-3 leading-relaxed">Turn your passion and knowledge into a thriving business.
                        Help your audience get ahead in life</h4>
                </div>
                <div className="sm: md:pt-10">
                    <img
                        src="https://i.imgur.com/sxbxff5.jpg"
                        className="max-w-[500px] rounded-3xl"
                        loading="lazy"
                    /></div>
            </div>
        </>

    )
}

export default HeroSection