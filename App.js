import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { RNCamera } from 'react-native-camera';

function App() {
  const [barcode, setBarcode] = useState(null);

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

      {barcode ? (
        <View style={[styles.rnCamera, styles.rmCameraResult]}>
          <Text style={styles.rmCameraResultText}>{barcode.data}</Text>
          <Text style={styles.rmCameraResultText}>{barcode.type}</Text>
        </View>
      ) : (
        <RNCamera
          style={styles.rnCamera}
          onBarCodeRead={setBarcode}
        />
      )}

      <View style={styles.cameraControl}>
        <TouchableOpacity style={styles.btn} onPress={() => setBarcode(null)}>
          <Text style={styles.btnText}>New QR Scan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F2FC',
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
    color: '#ffffff',
    fontSize: 20,
  },
  caption: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionTitleText: {
    color: '#121B0D',
    fontSize: 16,
    fontWeight: '600'
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
    width: '94%',
    alignSelf: 'center',
  },
  rmCameraResult: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },
  rmCameraResultText: {
    fontSize: 20,
    color: '#62d1bc'
  },
  cameraControl: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default App;
