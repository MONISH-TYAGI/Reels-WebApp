import React,{useState,useEffect} from 'react'
import { auth } from '../firebase';
export const AuthContext=React.createContext();
export function AuthProvider({children}){
const [user,setUser]=useState();
const [loading,setLoading]=useState(true)
function signup(email,password)
{
    return auth.createUserWithEmailAndPassword(email,password)
}
function login(email,password)
{
    return auth.signInWithEmailAndPassword(email,password);
}
function logout(){
    return auth.signOut()
}
const forgotPassword = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
useEffect(()=>{
    const unsub=auth.onAuthStateChanged((user)=>{
        setUser(user);
        setLoading(false);
    })
    return ()=>{
        unsub();
    }
},[])
const store={
    user,signup,login,logout,forgotPassword
}
return (
    <AuthContext.Provider value={store}>
        {!loading&&children}
    </AuthContext.Provider>
)
}