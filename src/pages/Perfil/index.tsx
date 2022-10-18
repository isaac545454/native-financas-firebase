import React, {useContext} from 'react'
import {
  Container,
  Nome, 
  NewLink,
  NewText,
  Logaout,
  LogaoutText
} from './style'
import {AuthContext} from '../../context/auth'
import {useNavigation} from '@react-navigation/native'

export default function Index() {
  const {user, signOut} = useContext(AuthContext)
  const navigation = useNavigation()
  return (
    <Container>

      <Nome>{user && user.nome}</Nome>

      <NewLink onPress={()=> navigation.navigate("Register")}>
        <NewText>Registrar gastos</NewText>
      </NewLink>

      <Logaout onPress={signOut}>
        <LogaoutText>Sair</LogaoutText>
      </Logaout>

    </Container>
  )
}