import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Container, Header } from './style'

interface Props {
  data: Date;
  onClose: ()=>Void;
  onChange: ()=>Void;
}

export default function Index({data, onClose, onChange}: Props) {
  const [dateNow, setDateNow] = useState(new Date(data))

  return (
    <Container>
      {Platform === 'ios' && (
        <Header>
          <TouchableOpacity onPress={onClose}>
             <Text>Fechar</Text>
          </TouchableOpacity>
        </Header>
      )}
      <DateTimePicker
      value={dateNow}
      mode="date"
      display="default"
     onChange={(e, d)=>{
       const currentDate = d || dateNow
      setDateNow(currentDate)
      onChange(currentDate)
     }}
     style={{backgroundColor: 'white',}}
      />
    </Container>
  )
}