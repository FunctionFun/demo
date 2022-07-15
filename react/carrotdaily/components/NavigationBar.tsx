import * as React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Icon from '../components/iconfont';

const BackButton = (props: any) => {
  console.log('back', props);
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('返回上一页');
        props.navigation?.goBack();
      }}
    >
      <View style={styles.backButton}>
        <Icon
          name="left"
          color="#ffffff"
          size={26}
          style={{ marginBottom: -3 }}
        />
      </View>
    </TouchableOpacity>
  );
};

const LeftButton = (props: any) => {
  return (
    <View>
      { props.leftButton }
    </View>
  );
};

const RightButton = (props: any) => {
  return (
    <View>
      { props.rightButton }
    </View>
  );
};

const NavigationBar = (props: any) => {
  console.log(props);
  return (
    <View style={styles.barWrap}>
      <Text style={styles.titleStyle}>{props.title}</Text>
    </View>
  );
};

const NavigationOption = ({
  title,
  showBack = false,
  leftButton,
  rightButton,
  navigation,
}: {
  title: string;
  showBack?: boolean;
  leftButton?: any;
  rightButton?: any;
  navigation?: any;
}) => {
  return {
    title: title,
    headerStyle: {
      backgroundColor: Colors.primaryColor,
    },
    headerLeft: (props: any) => {
      return showBack ? (
        <BackButton {...props} navigation={navigation} />
      ) : leftButton ? (
        <LeftButton {...props} />
      ) : null;
    },
    headerTitle: (props: any) => {
      return <NavigationBar {...props} title={title} />;
    },
    headerRight: (props: any) => {
      return rightButton ? <RightButton {...props} /> : showBack ? <View></View> : null;
    },
  };
};

export default NavigationOption;

const styles = StyleSheet.create({
  barWrap: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  titleStyle: {
    color: '#ffffff',
    fontSize: Layout.fontL,
  },
  backButton: {
    paddingLeft: 10,
  },
});
