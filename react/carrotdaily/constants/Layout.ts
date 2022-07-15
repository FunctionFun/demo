import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  padBox: 12,
  fontXL: 20,
  fontL: 18,
  fontM: 16,
  fontS: 14,
  fontXS: 12,
  container: {
    padding: 10,
  }
};
