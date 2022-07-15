import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Icon from '../components/iconfont';

export default function PinBox() {
  const [curCategory, setCategory] = useState(0);
  const [curPin, setCurPin] = useState(0);
  const [curPinDots, setCurPinDots] = useState<Array<any>>([]);
  const pinList: any = [
    {
      id: 1,
      category: '打卡',
      list: [
        {
          id: 1,
          name: '时间',
        },
        {
          id: 2,
          name: '地点',
        },
        {
          id: 2,
          name: '时间+地点',
        },
      ],
    },
    {
      id: 2,
      category: '滤镜',
      list: [
        {
          id: 1,
          name: '阿宝色',
        },
      ],
    },
  ];

  useLayoutEffect(() => {
    // 打开后默认选择第1个
    // TODO...
  });

  const CategoryItem = (props: any) => {
    const { item }: { item: any } = props;
    const tapCategoryItem = () => {
      if (item && item.id) {
        console.log('选择 -->', item.category);
        setCategory(item.id);
        setCurPinDots(item.list);
        setCurPin(0);
      }
    };
    const isSelected =
      curCategory === item.id
        ? styles.categoryItemSelected
        : styles.categoryItemDefault;
    return (
      <TouchableOpacity onPress={tapCategoryItem}>
        <Text style={{ ...styles.categoryItem, ...isSelected }}>
          {item.category}
        </Text>
      </TouchableOpacity>
    );
  };

  const PinItem = (props: any) => {
    const { item }: { item: any } = props;
    const tapPinItem = () => {
      if (item && item.id) {
        console.log('使用 -->', item.name);
        setCurPin(item.id);
      }
    };
    const isSelected =
      curPin === item.id ? styles.pinItemSelected : styles.pinItemDefault;
    return (
      <TouchableOpacity onPress={tapPinItem}>
        <View style={styles.pinItem}>
          <Text style={isSelected}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.box}>
      <View style={styles.boxHead}>
        {pinList.map((item: any, index: number) => {
          return <CategoryItem item={item} key={index} />;
        })}
      </View>
      <View style={styles.boxBody}>
        {curPinDots.map((item, index) => {
          return <PinItem item={item} key={index} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#eeeeee',
    height: 300,
  },
  boxHead: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#f9f9f9',
  },
  boxBody: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryItem: {
    marginRight: 20,
    fontSize: 18,
  },
  categoryItemSelected: {
    color: '#F13284',
  },
  categoryItemDefault: {
    color: '#666666',
  },
  pinItem: {
    flexShrink: 0,
    width: 80,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginRight: 10,
  },
  pinItemSelected: {
    color: '#F13284',
  },
  pinItemDefault: {
    color: '#666666',
  },
});
