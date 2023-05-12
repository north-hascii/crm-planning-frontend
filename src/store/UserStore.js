import {makeAutoObservable} from "mobx";
import {localStorageParams} from "../utils/consts";

export default class UserStore {
    get userId() {
        return this._userId;
    }
    get userToken() {
        return this._userToken;
    }

    setUserToken(value) {
        localStorage.setItem(localStorageParams.user_token, value)
        this._userToken = value;
    }

    constructor() {
        this._isAuth = false
        this._userToken = ''
        this._userRole = ''
        this._user = {}
        this._userEmail = ''
        this._userSecondName = ''
        this._userId = -1
        makeAutoObservable(this)
    }

    get isAuth() {
        return this._isAuth;
    }

    setIsAuth(value) {
        this._isAuth = value;
    }

    setUserId(value) {
        this._userI = value
    }

    setUserEmail(value) {
        this._userEmail = value
    }

    setUserSecondName(value) {
        this._userSecondName = value
    }

    get userEmail() {
        return this._userEmail;
    }

    get userSecondName() {
        return this._userSecondName;
    }

    get userRole() {
        return this._userRole;
    }

    setUserRole(value) {
        localStorage.setItem(localStorageParams.user_role, value)
        this._userRole = value;
    }

    clearCache() {
        this._isAuth = false
        this._userToken = ''
        this._userRole = ''
        this._user = {}
    }
}