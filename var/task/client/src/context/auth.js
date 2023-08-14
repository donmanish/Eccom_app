import axios from "axios";
import {  createContext, useContext, useEffect, useState } from "react";



const AuthContext = createContext();



const Authprovider = ({children}) => {
    const [auth, setAuth] = useState({
        user:null,
        token:'',
    });

    // default axios
   axios.defaults.headers.common['Authorization'] = auth?.token;

   
    useEffect(() => {
      const data = localStorage.getItem('auth');
      if(data){
         const parseData = JSON.parse(data);
         setAuth((prevAuth) => ({
            ...prevAuth,
            user:parseData.user,
            token:parseData.token
         }));
      }
    }, [])

    return(
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
}

// custom hook
const useAuth = () => useContext(AuthContext)

export {useAuth, Authprovider};