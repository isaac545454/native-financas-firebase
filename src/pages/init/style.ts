import styled from 'styled-components/native';


export const Background = styled.View`
  background-color: #131313;
  flex: 1;
`;
export const Container = styled.View`
   margin-left: 20px;
   margin-bottom: 25px;
   margin-top: 30px;
`;
export const Nome = styled.Text`
  font-size: 22px;
  color: #fff;
  font-style: italic;
`;
export const Saldo = styled.Text`
  margin-top: 5px;
  font-size: 30px;
  color: #fff;
  font-weight: bold;
`;
export const Title = styled.Text`
margin-left: 5px;
color: #00b94a;
margin-bottom: 10px;
`;

export const Area = styled.View`
  flex-direction: row;
  margin-left: 16px;
`;

export const List = styled.FlatList.attrs({
  marginHorizontal: 15
})`
  padding-top: 15px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-left: 8px;
  margin-right: 8px;
  
`;