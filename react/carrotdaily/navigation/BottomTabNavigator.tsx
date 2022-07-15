import * as React from 'react';
import Icon from '../components/iconfont';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabHome from '../screens/TabHome';
import TabLook from '../screens/TabLook';
import TabHot from '../screens/TabHot';
import TabMine from '../screens/TabMine';
import TabChat from '../screens/TabChat';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={TabHome}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Look"
        component={TabLook}
        options={{
          tabBarLabel: '关注',
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="heart" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={TabChat}
        options={{
          tabBarLabel: '消息',
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="message" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Hot"
        component={TabHot}
        options={{
          tabBarLabel: '热门',
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="fire" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Mine"
        component={TabMine}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="user" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// 图标
function TabBarIcon({ name, color}: { name: any, color: string }) {
  return <Icon name={name} color={color} size={26} style={{ marginBottom: -3 }} />;
}
