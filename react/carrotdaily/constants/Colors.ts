const tintColorLight = 'hsl(179, 66%, 46%)';
const tintColorDark = '#fff';

export default {
  primaryColor: tintColorLight,
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  background: {
    default: '#e9e9e9',
  },
  border: '#f2f2f2',
  text: {
    dark: '#333333',
    gray: '#999999',
    light: '#e7e7e7'
  }
};
