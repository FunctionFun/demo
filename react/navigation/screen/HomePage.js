import React from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';

export default function HomeScreen(props) {
  const { navigation } = props;
  return (
    <View>
      <Text>首页</Text>
      <Button onPress={()=>{
        console.log('跳转到Page1');
        navigation.navigate('Page1');
      }} title="跳转到Page1" />
      <Button onPress={()=>{
        console.log('跳转到Page2');
        navigation.navigate('Page2');
      }} title="跳转到Page2" />
    </View>
  );
}