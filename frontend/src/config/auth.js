import React, {useEffect, useState, createContext } from 'react'
import { auth } from './firebase'

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    auth.onAuthStateChanged((user)=>{
      setCurrentUser(user);
      setLoading(false);
    })
  },[])

  if (loading){    
    return <h1> NEW Loading ...</h1>
  } else {
    return (
      <AuthContext.Provider value={{currentUser}}>
        { children }
      </AuthContext.Provider>
    )
  }

  
}