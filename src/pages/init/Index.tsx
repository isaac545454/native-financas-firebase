import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../../context/auth'
import {
  Background,
  Container,
  Nome,
  Saldo,
  Title, 
  List,
  Area
} from './style'
import ListItem from '../../components/ListItem'
import firebase from '../../services/fireConect'
import {format, isPast } from 'date-fns'
import Icons from '@expo/vector-icons/MaterialIcons'
import DatePicker from '../../components/DatePicker'

interface stateHistorico{
  key: string;
  tipo: string;
  valor: string;
  date: Date;
}


export default function Index() {
  const {user } = useContext(AuthContext)
  const [historico, setHistorico] = useState<stateHistorico[]>([])
  const [saldo, setSaldo] = useState<number>(null)
  const [newDate,setNewDate] = useState(new Date())
  const uid = user && user.uid 
  const [show, setShow] = useState(false)

  useEffect(()=>{
   loadList()
  }, [newDate])
  
  const loadList = async()=>{
     await firebase.database().ref('users').child(uid).on('value', 
     (snapshot)=>{
      setSaldo(snapshot.val().saldo)
     })
     await firebase.database().ref('historico').child(uid)
     .orderByChild('data').equalTo(format(newDate, 'dd/MM/yy'))
     .limitToLast(10).on('value', (snapshot)=>{
      setHistorico([])

      snapshot.forEach((childItem)=>{
         let list = {
          key: childItem.key,
          tipo: childItem.val().tipo,
          valor: childItem.val().valor,
          data: childItem.val().data
         }
         setHistorico(oldArray => [...oldArray, list].reverse())
      })
     })
  }
  

  const handleDelete = (dados)=>{
   if(isPast(new Date(dados.data))){
     alert('voce não pode excluir registros antigos')
     return
   }
   Alert.alert(
    'cuidado Atenção',
    `Você deseja excluir: ${dados.tipo} - Valor ${dados.valor}`,
    [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Continuar', onPress: ()=>handleDeleteSuccess(dados)}
    ]
   )
  }

  const handleDeleteSuccess = async(dados)=>{
    await firebase.database().ref('historico')
    .child(uid).child(dados.keyItem).remove()
    .then(async()=>{
      let saldoAtual =  saldo
      dados.tipo === 'despesa' ? saldoAtual += parseFloat(dados.valor) : saldoAtual -= parseFloat(dados.valor);

      await firebase.database().ref('users').child(uid)
      .child('saldo').set(saldoAtual)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleShowPicker = ()=>{
   setShow(true)  
  }

  const handleClose = ()=>{
     setShow(false)
  }

  const onChange = (date)=>{
    setShow(Platform.OS === 'ios')
   setNewDate(date)
   console.log(date);
   
  }


  return (
    <Background>

      <Container>
        <Nome>{user.nome}</Nome>
        <Saldo>
          R$ {saldo && saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
        </Saldo>
      </Container>
       
      <Area>
      <TouchableOpacity onPress={handleShowPicker}>
        <Icons name='event' size={25} color="#fff" />
      </TouchableOpacity>
      <Title>Ultimas Movimentações </Title>
      </Area>

      <List 
       showsVerticalScrollIndicator={false}
       data={historico}
       KeyExtractor={item => item.key}
       renderItem={({item})=> (
       <ListItem 
       valor={item.valor} 
       tipo={item.tipo}
       keyItem={item.key}
       date={item.data}
       deleteItem={handleDelete}
       />)}
      />

      {show && (
        <DatePicker
        onClose={handleClose}
        data={newDate}
        onChange={onChange}
        />
      ) }
    </Background>
  )
}