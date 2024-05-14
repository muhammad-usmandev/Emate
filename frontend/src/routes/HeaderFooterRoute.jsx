import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import UserHeader from '../components/UserHeader'
import { useSelector } from "react-redux"

function getUser() {
    return localStorage.getItem('token')
}

const HeaderFooterRoute = (props) => {
    const [user, setUser] = useState(getUser())

    return (
        <>
            {user ? <>
                <UserHeader></UserHeader>
                {props.children}
                <Footer></Footer>
            </> : <>
                <Header></Header>
                {props.children}
                <Footer></Footer>

            </>}


        </>
    )
}

export default HeaderFooterRoute