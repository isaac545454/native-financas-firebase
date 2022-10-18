import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Icon from '@expo/vector-icons/Feather'
import {
  Container,
  Tipo,
  IconView,
  TipoText,
  ValorText
} from './styles'

interface PropsItem{
  key: string;
  tipo: string;
  valor: number;
  date: Date;
  deleteItem: ()=>Void;
}

interface Dados{
  key: string;
  tipo: string;
  valor: number;
  date: Date;
}

export default function Index({valor, tipo, keyItem, date, deleteItem}: PropsItem) {
  const dados: Dados={
    keyItem,
    date,
    tipo,
    valor,
  }
  return (
    <TouchableWithoutFeedback onLongPress={()=>deleteItem(dados)}>
    <Container>
      <Tipo>
        <IconView tipo={tipo}>
          <Icon 
          name={tipo === 'despesa'? 'arrow-down' : 'arrow-up'}
          color="#fdfcfc" 
          size={20} />
          <TipoText>{tipo}</TipoText>
        </IconView>
      </Tipo>
      <ValorText>
         R$ {valor}
      </ValorText>
    </Container>
    </TouchableWithoutFeedback>
  )
}