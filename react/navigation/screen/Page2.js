import React from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';

export default function Page2Screen() {
  return (
    <View>
      <Text>Page2222</Text>
      <Button onPress={()=>{
        console.log('返回上一页');
      }} title="返回上一页" />
    </View>
  );
}