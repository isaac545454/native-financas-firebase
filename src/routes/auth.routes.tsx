import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../pages/Signin'
import SignUp from '../pages/SignUp'

const AuthStack = createNativeStackNavigator()


function AuthRoutes() {
  return(
    <AuthStack.Navigator>

      <AuthStack.Screen
       name="SignIn" 
       component={SignIn} 
       options={{headerShown: false}}
       />

      <AuthStack.Screen
       name="SignUp"
       component={SignUp} 
       options={{
        headerStyle:{
          backgroundColor: '#0c0b0b',
         
          
        },
        headerTintColor:'#fdfbfb',
        
        headerTitle: 'Voltar',
        
       }}
       />

    </AuthStack.Navigator>
  )
}

export default AuthRoutes