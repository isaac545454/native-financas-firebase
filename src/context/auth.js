import {createContext, useState, useEffect} from 'react'
import firebase from '../services/fireConect'
import AsyncStorage from "@react-native-async-storage/async-storage"
export const AuthContext = createContext({ })



function AuthProvider({children}) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingAuth, setLoadingAuth] = useState(false)

  useEffect(()=>{
    getStorage()
  }, [])
  
  const getStorage = async ()=>{
    const storage = await AsyncStorage.getItem('auth_user')
    if(storage){
      setUser(JSON.parse(storage))
      setLoading(false)
    }
    setLoading(false)
  }
  
  const signUp = async(email, password, nome)=>{
    setLoadingAuth(true)
   await firebase.auth().createUserWithEmailAndPassword(email, password)
   .then(async(value)=>{
     let uid = value.user.uid
     await firebase.database().ref('users').child(uid).set({
      saldo: 0,
      nome: nome
     })
     .then(()=>{
       let data = {
        uid: uid,
        nome: nome,
        email: value.user.email
       }
       setUser(data)
       storageUser(data)
       setLoadingAuth(false)
     })
   })
   .catch((err)=>{
    alert(err.code)
    setLoadingAuth(false)
  })
  }

  const signIn = async(email, password)=>{
    setLoadingAuth(true)
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async(value)=>{
      let uid = value.user.uid;
      await firebase.database().ref('users').child(uid).once('value')
      .then((snapshot)=>{
        let data = {
        uid: uid,
        nome: snapshot.val().nome,
        email: value.user.email
        }
        
        setUser(data)
        storageUser(data)
        setLoadingAuth(false)
      })
    })
    .catch((err)=>{
      alert(err.code)
      setLoadingAuth(false)
    })
  }

  const storageUser = async(data)=>{
   await AsyncStorage.setItem('auth_user', JSON.stringify(data))
  }

  const signOut = async()=>{
    await firebase.auth().signOut()
    await AsyncStorage.clear()
    .then(()=>{
      setUser(null)
    })
  }

  return(
   <AuthContext.Provider value={{
    signed: !!user, 
    user, 
    signUp, 
    signIn, 
    loading, 
    signOut,
    loadingAuth
    }}
    >
    {children}
   </AuthContext.Provider>
  )
}
export default AuthProvider


