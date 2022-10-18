import { 
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert 
} from 'react-native'
import {
  Background,
  Input,
  SubmitButton,
  TextButton
} from './style'
import {
  useState,
  useContext
} from 'react'
import Picker from '../../components/Pickerd'
import firebase from '../../services/fireConect'
import {format} from 'date-fns'
import {useNavigation} from '@react-navigation/native'
import {AuthContext} from '../../context/auth'

export default function Index() {
  const [valor, setValor] = useState<number>(null)
  const [type, setType] = useState<string>('')
  const navigation = useNavigation()
  const {user: usuario} = useContext(AuthContext)

  const handleSubmit = ()=>{
    Keyboard.dismiss()
    if(isNaN(parseFloat(valor)) || type === null){
      alert("preencha todos os campos")
      return
    }
    Alert.alert(
      'Confirmando dados',
      `tipo: ${type} - valor: ${parseFloat(valor)}`,
      [
        {
        text: "Cancelar",
        style: 'cancel'
        },
        {
         text: 'Continuar',
         onPress: ()=> handleAdd() 
        }
      ]
    )
  }

  const handleAdd = async ()=>{
    let uid = await usuario.uid
    let key = await firebase.database().ref('historico').child(uid).push().key
    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo: type,
      valor: valor,
      data: format(new Date(), 'dd/MM/yy')
    })
    let user = firebase.database().ref('users').child(uid)
    await user.once('value').then((snapshot)=>{
      let saldo = parseFloat(snapshot.val().saldo)
      type === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor)
      user.child('saldo').set(saldo)
    })
    Keyboard.dismiss()
    setValor(null)
    setType('')
    navigation.navigate('Home')
  }

  return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
    <Background>
      <SafeAreaView style={{alignItems: 'center',}}>
        <Input 
         placeholder="Valor desejado"
         keyboardType='numeric'
         returnKeyType="next"
         onSubmitEditing={()=> Keyboard.dismiss()}
         onChangeText={(text)=> setValor(text)}
         value={valor}
        />
        <Picker onChange={setType} />
        <SubmitButton onPress={handleSubmit}>
          <TextButton>Registrar</TextButton>
        </SubmitButton>
      </SafeAreaView>
    </Background>
    </TouchableWithoutFeedback>
  )
}