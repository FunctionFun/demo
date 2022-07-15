import * as React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export interface ITEM {
  id: number;
  cover: string;
  title: string;
  content: string;
}

export default function ArticleCard(props: any) {
  const item: ITEM = props.item;
  const onPress = () => {
    props.tapItem();
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.articleCard}>
        <View style={styles.articleCardLeft}>
          <Text
            style={styles.articleCardTitle}
            numberOfLines={1}
            ellipsizeMode={'tail'}
          >
            {item.title}
          </Text>
          <Text
            style={styles.articleCardContent}
            numberOfLines={2}
            ellipsizeMode={'tail'}
          >
            {item.content}
          </Text>
        </View>
        <View style={styles.articleCardRight}>
          <Image
            style={styles.articleCardCover}
            source={require('../assets/images/cover.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  articleCard: {
    borderColor: '#efefef',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: Layout.padBox,
    height: 94,
    marginBottom: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  articleCardLeft: {
    flex: 1,
  },
  articleCardTitle: {
    fontSize: Layout.fontM,
  },
  articleCardContent: {
    fontSize: Layout.fontXS,
    color: Colors.text.gray,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  articleCardRight: {
    width: 70,
    height: 70,
    backgroundColor: 'powderblue',
    marginLeft: Layout.padBox,
    borderRadius: 8,
    overflow: 'hidden',
  },
  articleCardCover: {
    width: '100%',
    height: '100%',
  },
});
