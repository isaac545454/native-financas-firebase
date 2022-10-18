
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../pages/init/Index'
import Register from '../pages/Register'
import Perfil from '../pages/Perfil'
import CustomDrawer from '../components/CustonDrawer'

const AppDrawer = createDrawerNavigator()


function AppRoutes() {
  return(
    <AppDrawer.Navigator
     drawerContent={(props)=> <CustomDrawer {...props} />}
     screenOptions={{
      headerTintColor: '#fff',
      drawerStyle: {
        backgroundColor: '#131313',
        color: '#fff'
      },
      headerStyle:{
        backgroundColor: '#131313', 
      },
      drawerActiveTintColor: '#faf8f8',
      drawerActiveBackgroundColor: '#00b94a',
      drawerInactiveBackgroundColor: '#000000',
      drawerInactiveTintColor: '#DDD',
      drawerItemStyle: {
        marginVertical: 5,
      }
    }}
    >

      <AppDrawer.Screen 
      name="Home" 
      component={Home}
      options={{
        headerTitle: '',
      }}
      />

      <AppDrawer.Screen 
      name="Register" 
      component={Register}
      options={{
        headerTitle: '',
      }}
      />

       <AppDrawer.Screen 
      name="Perfil" 
      component={Perfil}
      options={{
        headerTitle: '',
      }}
      />

    </AppDrawer.Navigator>
  )
}

export default AppRoutes