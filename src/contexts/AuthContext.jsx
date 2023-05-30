import { useState , useEffect , createContext  } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [auth , setAuth] = useState(false);
    const [userToken , setUserToken] = useState(null);
    const [type , setType] = useState(null);
    useEffect(() => {
        if (localStorage.getItem("accessToken") != null) {
            setAuth(true);
            setUserToken(localStorage.getItem("accessToken"));
            setType(localStorage.getItem("type"));
        }
    } , []);
    return (
        <AuthContext.Provider value={{auth , setAuth , userToken , setUserToken , type , setType}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;