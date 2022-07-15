import * as Linking from 'expo-linking';

// 配置外部链接映射
export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {},
  },
};
