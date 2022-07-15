import React from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';

export default function Page1Screen() {
  return (
    <View>
      <Text>Page1111</Text>
      <Button onPress={()=>{
        console.log('返回上一页');
      }} title="返回上一页" />
    </View>
  );
}