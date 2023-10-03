import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
    user: null,
    isAthenticated: false,
    error: ""
}
const FAKE_USER = {
    name: "hossein",
    email: "hossein@gmail.com",
    password: "1234",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return { ...state, user: action.payload, isAthenticated: true }
        case 'logout':
            return { ...state, user: null, isAthenticated: false }
        case 'error':
            return { ...state, error: action.payload }
        default:
            throw new Error('خطایی وجود دارد..')
    }
}
export function AuthProvider({ children }) {

    const [{ user, isAthenticated, error }, dispatch] = useReducer(reducer, initialState)

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) dispatch({ type: "login", payload: FAKE_USER })
        else dispatch({ type: "error", payload: "ایمیل یا رمز عبور اشتباه است" })
    }

    function logout() {
        dispatch({ type: "logout" })
    }

    return (
        <AuthContext.Provider value={{ user, isAthenticated, error, login, logout,dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) throw new Error('Authcontext was used outside AuthProvider')
    return context
}