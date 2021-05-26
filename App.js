/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';

const App = () => {
  const camera = useRef();
  const [barcodes, setBarcodes] = useState([]);

  const renderBarcodes = () => (
    <View>
      {barcodes.map(renderBarcode)}
    </View>
  );

  const renderBarcode = ({ bounds, data }) => {
    console.log(data)
    return (
    <View>
      <View
        style={{
          borderWidth: 2,
          borderRadius: 10,
          position: 'absolute',
          borderColor: '#F00',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
          backgroundColor: 'transparent',
        }}>{data}</Text>
      </View>
    </View>
  )
      };

  return (
      <View style={styles.container}>
        <RNCamera
          ref={camera}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onBarCodeRead={renderBarcode}
        >
          {renderBarcodes()}
        </RNCamera>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    width: '100%',
  },
});

export default App;
