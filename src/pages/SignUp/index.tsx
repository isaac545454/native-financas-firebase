import {useState, useContext} from 'react'
import {
  Container, 
  Background, 
  Logo, 
  AreaInput, 
  Input,
  SubmitButton, 
  SubmitText,
 
} from '../Signin/styles'
import {Platform, ActivityIndicator} from 'react-native'
import { AuthContext } from '../../context/auth'
export default function Index() {
  const {signUp, loadingAuth} = useContext(AuthContext)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [name, setName] = useState<string>("")

  const handleSignUp = ()=>{
    signUp(email, password, name)
  }

  return (
    <Background>
      <Container
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled
      >

        <AreaInput>
          <Input
           placeholder="Nome"
           autoCorrect={false}
           autoCapitalize="none"
           onChangeText={(text)=>setName(text)}
           value={name}
          />
        </AreaInput>

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
        
      <SubmitButton onPress={handleSignUp}>
        {loadingAuth?(
            <ActivityIndicator size={25} color="#fff" />
        ):(
          <SubmitText>Cadastrar</SubmitText>
        )}
      </SubmitButton>

     

      </Container>
    </Background>
  )
}