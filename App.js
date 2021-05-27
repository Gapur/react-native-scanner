import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { RNCamera } from 'react-native-camera';

function App() {
  const camera = useRef();
  const [barcode, setBarcode] = useState();

  const renderBarcode = ({ bounds, data }) => {
    console.log(data)
    console.log('------====', bounds)
    return (
    <View style={{ width: 300, height: 300 }}>
      <View
        style={{
          borderWidth: 2,
          borderRadius: 10,
          position: 'absolute',
          borderColor: '#F00',
          justifyContent: 'center',
          backgroundColor: '#FF0000',
          padding: 10,
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        }}
      >
        <Text style={{
          color: '#F00',
          flex: 1,
          position: 'absolute',
          textAlign: 'center',
          backgroundColor: '#FF0000',
        }}>{data}</Text>
      </View>
    </View>
  )
      };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.saveArea}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitleText}>React Native Scanner</Text>
        </View>
      </SafeAreaView>
      <View style={styles.caption}>
        <Text style={styles.captionTitleText}>Welcome To React-Native-Camera Tutorial</Text>
      </View>
      <RNCamera
        ref={camera}
        style={styles.rnCamera}
        onBarCodeRead={setBarcode}
      >
        {barcode && renderBarcode(barcode)}
      </RNCamera>
      <View style={styles.cameraControl}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>QR Scanning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Text Recognition</Text>
        </TouchableOpacity> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  saveArea: {
    backgroundColor: '#62d1bc',
  },
  topBar: {
    height: 50,
    backgroundColor: '#62d1bc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitleText: {
    color: 'white',
    fontSize: 20,
  },
  caption: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionTitleText: {
    fontSize: 16,
    fontWeight: '700'
  },
  btn: {
    width: 240,
    borderRadius: 4,
    backgroundColor: '#62d1bc',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginVertical: 8,
  },
  btnText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  rnCamera: {
    flex: 1,
    width: '100%',
  },
  cameraControl: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default App;
