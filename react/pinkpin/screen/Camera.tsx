import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as MediaLibrary from 'expo-media-library';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Camera } from 'expo-camera';
import Icon from '../components/iconfont';
import { Toast, Drawer } from 'teaset';
import PinBox from '../components/PinBox';
import Canvas from 'react-native-canvas';
import moment from 'moment';

const window = Dimensions.get('window');

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [photoUri, setPhotoUri] = useState('');

  const cameraRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // 相机初始化
  const onCameraReady = async () => {
    setIsCameraReady(true);
    onReadyCanvas();
  };

  // 拍照
  const onPress = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: false };
      const data: any = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        setPhotoUri(source);
        await cameraRef.current.pausePreview();
        setIsPreview(true);
      }
    }
  };

  // 取消预览，重新拍照
  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  // 切换前后摄像头
  const toggleBackFront = () => {
    if (isPreview) {
      return;
    }
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  // 保存图片
  const savePhoto = async () => {
    const { status } = await MediaLibrary.getPermissionsAsync();
    if (status !== 'granted') {
      await MediaLibrary.requestPermissionsAsync();
    }
    if (status && photoUri) {
      // TODO:保存包含水印的图片
      const asset = await MediaLibrary.createAssetAsync(photoUri);
      if (asset.id) {
        Toast.show({
          text: '保存图片成功',
          position: 'top',
          duration: 3000,
        });
        cancelPreview();
      }
    }
  };

  // 打开贴纸
  const openPinBox = () => {
    console.log('打开贴纸');
    Drawer.open(<PinBox />, 'bottom');
  };

  // 按钮-重新拍照
  const CancelPreviewBtn = () => {
    return (
      <TouchableOpacity disabled={!isPreview} onPress={cancelPreview}>
        <View style={styles.calcelPlayBtn}>
          <Icon name="guanbijiantou" size={26} color="#F13284" />
        </View>
      </TouchableOpacity>
    );
  };

  // 按钮-保存照片
  const SavePhotoBtn = () => {
    return (
      <TouchableOpacity disabled={!isPreview} onPress={savePhoto}>
        <View style={styles.savePhontoBtn}>
          <Icon name="baocun" size={26} color="#ffffff" />
        </View>
      </TouchableOpacity>
    );
  };

  // 按钮-切换前后摄像头
  const ToggleBackFrontBtn = () => {
    return (
      <TouchableOpacity disabled={!isCameraReady} onPress={toggleBackFront}>
        <View style={styles.backFrontBtn}>
          <Icon name="fanzhuanjingtou" size={26} color="#F13284" />
        </View>
      </TouchableOpacity>
    );
  };

  // 按钮-拍照
  const PlayBtn = () => {
    return (
      <TouchableOpacity style={styles.playBtn} onPress={onPress}>
        <View style={styles.playBtnCircle}>
          <Text style={styles.playBtnText}>
            <Icon name="paizhao" size={26} color="#ffffff" />
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // 按钮-打开贴纸
  const PinBtn = () => {
    return (
      <TouchableOpacity onPress={openPinBox}>
        <View style={styles.pinBtn}>
          <Icon name="lvjing" size={26} color="#F13284" />
        </View>
      </TouchableOpacity>
    );
  };

  // 绘图
  const onReadyCanvas = async () => {
    const ctx = canvasRef.current.getContext('2d');
    // 重设宽高
    ctx.canvas.width = window.width;
    ctx.canvas.height = window.width / (3 / 4);
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Kittithada';
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 4;
    const curTime = moment().format('YYYY/MM/DD HH:mm');
    ctx.fillText(curTime, 20, ctx.canvas.height - 20);
  };

  return (
    <SafeAreaProvider>
      <StatusBar />
      <View style={styles.container}>
        <Camera
          ref={cameraRef}
          style={styles.cameraWrap}
          type={type}
          autoFocus={Camera.Constants.AutoFocus.on}
          onCameraReady={onCameraReady}
          onMountError={(error) => {
            console.log('cammera error', error);
          }}
        />
        <Canvas style={styles.canvasWrap} ref={canvasRef} />
        <View style={styles.bottomBtnGroup}>
          {isPreview ? <CancelPreviewBtn /> : <ToggleBackFrontBtn />}
          {isPreview ? null : <PlayBtn />}
          {isPreview ? <SavePhotoBtn /> : <PinBtn />}
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'relative',
    paddingTop: 48,
  },
  cameraWrap: {
    width: window.width,
    height: window.width / (3 / 4),
  },
  canvasWrap: {
    position: 'absolute',
    top: 48,
    left: 0,
    width: window.width,
    height: window.width / (3 / 4),
  },
  backFrontToggle: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  bottomBtnGroup: {
    position: 'absolute',
    bottom: 120,
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  playBtnCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F13284',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtnText: {
    color: '#ffffff',
  },
  backFrontBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calcelPlayBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  savePhontoBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F13284',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
