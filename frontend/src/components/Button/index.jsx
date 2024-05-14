const Button = ({ text }) => {
    return (
        <div className='btn'>
            <a href={text[1]}>
                <h6>{text[0]}</h6>
            </a>
        </div>
    )
}

export default Button;