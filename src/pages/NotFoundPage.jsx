import React, {useContext} from 'react';
import {AUTH_ROUTE, HOME_ROUTE, localStorageParams} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {StoreContext} from "../index";

const NotFoundPage = observer(() => {
        const {user} = useContext(StoreContext)
        const navigate = useNavigate()
        React.useEffect(() => {
            if (user.isAuth) {
                // navigate(HOME_ROUTE)
            } else {
                navigate(AUTH_ROUTE)
            }
        }, [])

        return (
            <div>
                    <div>PAGE NOT FOUND</div>
            </div>
        );
    }
)

export default NotFoundPage;