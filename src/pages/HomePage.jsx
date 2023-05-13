import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTE, localStorageParams} from "../utils/consts";
import Header from "../components/header/header";
import {StoreContext} from "../index";

function HomePage(props) {
    const {user} = useContext(StoreContext)
    const navigate = useNavigate()

    // React.useEffect(() => {
        // if (!localStorage.getItem(localStorageParams.user_token)) {
        //     navigate(AUTH_ROUTE)
        // }
    // }, [])
    return (
        <div className={'home-page'}>
        {/*<Header/>*/}
        <div>
            HOME PAGE
        </div>
    </div>
    );
}

export default HomePage;