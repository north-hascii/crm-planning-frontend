import React from 'react';
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTE, localStorageParams, NOTFOUND_ROUTE} from "../utils/consts";

function HomePage(props) {
    const navigate = useNavigate()
    React.useEffect(() => {
        if (!localStorage.getItem(localStorageParams.user_token)) {
            navigate(AUTH_ROUTE)
        }
    }, [])
    return (<div>HOME</div>);
}

export default HomePage;