import {useState, useContext} from 'react'
import {
  Container, 
  Background, 
  Logo, 
  AreaInput, 
  Input,
  SubmitButton, 
  SubmitText,
  Link,
  LinkText,
} from './styles'
import {Platform, ActivityIndicator} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { AuthContext } from '../../context/auth'

export default function Index() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigation = useNavigation()
  const {signIn, loadingAuth} = useContext(AuthContext)

  const handleLogin = ()=>{
    signIn(email, password)
  }

  return (
    <Background>
      <Container
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled
      >
        <Logo source={require('../../assets/Logo/Logo.png')} />

        <AreaInput>
          <Input
           placeholder="Email"
           autoCorrect={false}
           autoCapitalize="none"
           onChangeText={(text)=>setEmail(text)}
           value={email}
          />
        </AreaInput>

        <AreaInput>
          <Input
           placeholder="Senha"
           autoCorrect={false}
           autoCapitalize="none"
           onChangeText={(text)=>setPassword(text)}
           value={password}
           secureTextEntry={true}
          />
        </AreaInput>
        
      <SubmitButton onPress={handleLogin}>
        {loadingAuth ? (
          <ActivityIndicator size={25} color="#fff" />
        ):(

        <SubmitText>Acessar</SubmitText>
        )}
      </SubmitButton>

      <Link onPress={()=> navigation.navigate('SignUp')}>
       <LinkText>Criar uma conta</LinkText>
      </Link>

      </Container>
    </Background>
  )
}