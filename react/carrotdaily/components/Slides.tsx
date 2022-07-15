import * as React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Carousel } from 'teaset';
import Colors from '../constants/Colors';

export interface SlidesData {
  images: string;
}

export default function Slides({
  list,
  height = 138,
  control = true,
}: {
  list: Array<SlidesData>;
  height?: number;
  control?: boolean
}) {
  return (
    <View style={styles.slideWrap}>
      <Carousel style={{ height: height }} control={control}>
        {list.map((item: SlidesData, index: number) => {
          return (
            <View style={{ ...styles.slideItem, height: height }} key={index}>
              <Image
                style={{ ...styles.slideImage, height: height }}
                source={{ uri: item.images }}
              />
            </View>
          );
        })}
      </Carousel>
    </View>
  );
}

const styles = StyleSheet.create({
  slideWrap: {
    width: '100%',
    backgroundColor: Colors.background.default,
  },
  slideItem: {
    height: '100%',
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
});
