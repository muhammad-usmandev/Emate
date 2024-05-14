const LoadMore = (props) => {
    return (
        <div className="load-more-div-a load-more-div-b">
            {props.isCompleted ? (
                <button className='hidden md:block hover:bg-indigo-200 hover:text-black mx-[10px] px-4 py-2 bg-indigo-400 text-white rounded-lg cursor-pointer disabled' onClick={props.loadMore}>That's It</button>

            ) : (
                <button className='hidden md:block hover:bg-indigo-200 hover:text-black mx-[10px] px-4 py-2 bg-indigo-400 text-white rounded-lg cursor-pointer' onClick={props.loadMore}>Show More ...</button>
            )}
        </div>
    );
};

export default LoadMore;