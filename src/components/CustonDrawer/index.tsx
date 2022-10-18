import { View, Text, Image } from 'react-native'
import React,{useContext} from 'react'
import { AuthContext} from '../../context/auth'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'

export default function Index(props) {
  const {user, signOut} = useContext(AuthContext) 
  return (
    <DrawerContentScrollView {...props}>
      <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 25,}}>
        <Image
         source={require('../../assets/Logo/Logo.png')}
         style={{width: 85, height: 85}}
         resizeMode="contain"
        />
        <Text style={{color: '#fff', fontSize: 18, marginTop: 5}}>
          Bem-vindo
        </Text>
        <Text 
        style={{color: '#fff', fontSize: 16, fontWeight: 'bold', paddingBottom: 25,}}>
          {user && user.nome}
        </Text>
      </View>


      < DrawerItemList {...props} />

      <DrawerItem 
      {...props}
      label="Sair do app"
      inactiveBackgroundColor="#c62c32"
      inactiveTintColor='#DDD'
      onPress={signOut}
      
      />
    </DrawerContentScrollView>
  )
}