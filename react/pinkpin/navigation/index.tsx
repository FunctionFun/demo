import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import Camera from '../screen/Camera';
import Pin from '../screen/Pin';
import Set from '../screen/Set';

const Stack = createStackNavigator()

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{title: '相机', headerShown: false}}
      />
      <Stack.Screen
        name="Pin"
        component={Pin}
        options={{title: '图钉'}}
      />
      <Stack.Screen
        name="Set"
        component={Set}
        options={{title: '设置'}}
      />
    </Stack.Navigator>
  )
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}
