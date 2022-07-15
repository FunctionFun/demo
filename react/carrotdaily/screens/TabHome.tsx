import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import Layout from '../constants/Layout';
import ArticleCard, { ITEM } from '../components/ArticleCard';
import Slides, { SlidesData } from '../components/Slides';
import Colors from '../constants/Colors';

export default function TabHome({ navigation }: { navigation: any }) {
  // Banner
  const Banners: Array<SlidesData> = [
    {
      images: 'https://huanggaofang.com/images/carrot.jpg',
    },
    {
      images: 'https://huanggaofang.com/images/carrot.jpg',
    },
    {
      images: 'https://huanggaofang.com/images/carrot.jpg',
    },
  ];

  const [listRefresh, setListRefresh] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [list, setList]: [Array<any>, any] = useState([]);
  const limit = 10;

  // 初始化
  useEffect(() => {
    onFetch(1);
  }, []);

  const onRefresh = () => {
    console.log('刷新');
    setListRefresh(true);
    onFetch(1, true);
  };

  const endReached = () => {
    if (hasMore) {
      console.log('加载');
      onFetch(page + 1);
    } else {
      console.log('没有更多了');
    }
  };

  const onFetch = async (toPage = 1, refresh = false) => {
    try {
      let pageLimit = 30;
      const skip = (toPage - 1) * pageLimit;

      const dataTemp = Array.from(
        { length: pageLimit },
        (_, index) => `item -> ${index + skip}`
      );
      let rowData: any = [];
      dataTemp.forEach((item, index) => {
        rowData.push({
          id: Number(toPage + '' + index),
          title: '这是一个标题标题标题标题标题标题标题标题标题标题标题标题标题',
          cover: '',
          content:
            '这是一段内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
        });
      });
      // load
      if (rowData.length > 0) {
        setPage(page);
      }
      setList(refresh ? rowData : [...list, ...rowData]);
      setHasMore(rowData.length >= limit);
      setListRefresh(false);
    } catch (err) {
      // stop
    }
  };

  const goArticleDetail = (id: number) => {
    console.log('id', id);
    navigation.navigate('ArticleDetail', {
      id,
    });
  };

  return (
    <View>
      <FlatList
        ListHeaderComponent={() => {
          return <Slides list={Banners} />;
        }}
        data={list}
        onRefresh={onRefresh}
        refreshing={listRefresh}
        onEndReachedThreshold={0.1}
        onEndReached={endReached}
        renderItem={({ item, index }) => {
          return (
            <ArticleCard
              key={index}
              item={item}
              tapItem={() => goArticleDetail(item.id)}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: Layout.container,
});
