import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomePage from '../screen/HomePage';
import Page1 from '../screen/Page1';
import Page2 from '../screen/Page2';

const RouterStack = createStackNavigator({
  HomeStack: {
    screen: HomePage,
    navigationOptions: {
      title: `首页`
    }
  },
  Page1: {
    screen: Page1,
    navigationOptions: {
      title: `page1`
    }
  },
  Page2: {
    screen: Page2,
    navigationOptions: {
      title: `page2`
    }
  }
})

export default createAppContainer(RouterStack);