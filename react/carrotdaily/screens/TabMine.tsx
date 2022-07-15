import * as React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import Icon from '../components/iconfont';

export default function TabMine() {
  return (
    <View style={styles.container}>
      {/* 用户信息 */}
      <View style={styles.userModule}>
        <View style={styles.userBox}>
          <View style={styles.avatar}>
            <Image
              style={styles.avatarImage}
              source={{ uri: 'https://huanggaofang.com/images/carrot.jpg' }}
            />
          </View>
          <View style={styles.userInfo}>
            <View style={styles.userTitle}>
              <Text style={styles.userName}>UserName</Text>
              <Text style={styles.userLevel}>Lv 3</Text>
            </View>
            <Text style={styles.userDescription}>Description</Text>
          </View>
        </View>

        <View style={styles.userLinks}>
          <View style={styles.linkItem}>
            <Text style={styles.linkItemlabel}>关注</Text>
          </View>
          <View style={{ ...styles.linkItem, ...styles.linItemLeftBorder }}>
            <Text style={styles.linkItemlabel}>喜欢</Text>
          </View>
          <View style={{ ...styles.linkItem, ...styles.linItemLeftBorder }}>
            <Text style={styles.linkItemlabel}>收藏</Text>
          </View>
          <View style={{ ...styles.linkItem, ...styles.linItemLeftBorder }}>
            <Text style={styles.linkItemlabel}>足迹</Text>
          </View>
        </View>
      </View>

      {/* 跳转链接 */}
      <View style={styles.pageLinks}>
        <View style={styles.pageLinkItem}>
          <Text style={styles.pageLinklabel}>帮助与反馈</Text>
          <Icon
            name="right"
            color={Colors.text.light}
            size={22}
            style={{ marginBottom: -3 }}
          />
        </View>
        <View style={styles.pageLinkItem}>
          <Text style={styles.pageLinklabel}>关于</Text>
          <Icon
            name="right"
            color={Colors.text.light}
            size={22}
            style={{ marginBottom: -3 }}
          />
        </View>
        <View style={styles.pageLinkItem}>
          <Text style={styles.pageLinklabel}>设置</Text>
          <Icon
            name="right"
            color={Colors.text.light}
            size={22}
            style={{ marginBottom: -3 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  userModule: {
    backgroundColor: '#ffffff',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 8,
    flexDirection: 'column',
    padding: 10,
  },
  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#e7e7e7',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  userInfo: {
    paddingLeft: 10,
    flexDirection: 'column',
  },
  userTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: Layout.fontM,
    color: Colors.text.dark,
  },
  userLevel: {
    fontSize: Layout.fontXS,
    color: Colors.text.gray,
    marginLeft: 20,
  },
  userDescription: {
    fontSize: Layout.fontS,
    color: Colors.text.gray,
    marginTop: 3,
  },
  userLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  linkItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  linItemLeftBorder: {
    borderLeftColor: Colors.border,
    borderLeftWidth: 1,
  },
  linkItemlabel: {
    width: '100%',
    fontSize: Layout.fontS,
    color: Colors.text.gray,
    textAlign: 'center',
  },
  pageLinks: {
    flexDirection: 'column',
    marginTop: 20,
    backgroundColor: '#ffffff'
  },
  pageLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
  pageLinklabel: {
    fontSize: Layout.fontS,
    color: Colors.text.dark,
  }
});
