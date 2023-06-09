import React from 'react';
import AppRouter from "./router/AppRouter";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/header/header";
import {localStorageParams} from "./utils/consts";
import {useContext} from "react";
import {StoreContext} from "./index";
import {observer} from "mobx-react-lite";

const App = observer(() => {
    const {user} = useContext(StoreContext)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
            const user_token = localStorage.getItem(localStorageParams.user_token)
            if (user_token) {
                user.setUserToken(user_token)
                user.setIsAuth(true)
                user.setUserEmail(localStorage.getItem(localStorageParams.user_email))
                user.setUserSecondName(localStorage.getItem(localStorageParams.user_second_name))
                user.setUserFirstName(localStorage.getItem(localStorageParams.user_first_name))
                user.setUserThirdName(localStorage.getItem(localStorageParams.user_third_name))
                const user_role = localStorage.getItem(localStorageParams.user_role)
                user.setUserRole(user_role)
            }
            // setTimeout(() => {
            //
            // }, 10000)
            setIsLoading(false)
    }, [])

    if (isLoading) {
        return (
            <div>
                {/*is loading*/}
            </div>
        )
    }

    return (<div className="App">
        <BrowserRouter>
            <Header/>
            <AppRouter/>
        </BrowserRouter>
    </div>);
})

export default App;
