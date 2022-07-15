import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export default function ArticleDetail() {
  // console.log('文章详情', route.params?.id)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Article Detail Screen</Text>
    </View>
  );
}
