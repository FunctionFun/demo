import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NavigationBar from '../components/NavigationBar';

import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import ArticleDetail from '../screens/ArticleDetail';

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={({ route }: { route: any }) => {
          const routeName = route.state?.routes[route.state?.index]?.name;
          let title = '首页';
          if (routeName === 'Home') {
            title = '首页';
          } else if (routeName === 'Look') {
            title = '关注';
          } else if (routeName === 'Hot') {
            title = '热门';
          } else if (routeName === 'Mine') {
            title = '我的';
          } else if (routeName === 'Chat') {
            title = '消息';
          }
          return NavigationBar({ title: title });
        }}
      />
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetail}
        options={(props: any) => {
          return NavigationBar({ title: '文章详情', showBack: true, ...props });
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={(props: any) => {
          return NavigationBar({ title: '404', showBack: true, ...props });
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
