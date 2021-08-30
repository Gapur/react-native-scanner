<p align="center">
  <img src="https://github.com/Gapur/react-native-scanner/blob/main/assets/intro-react-native-camera.jpg" />
</p>

# React Native Scanner

Working with the camera, QR scanning, and text recognition is a complex issue for React Native apps. It’s a ton of work that requires the manipulation of a camera in native development. If you have trouble with cross-platform mobile development in React Native when you work with the camera, React Native Camera is exactly what you need.

Today I am back to talk about how we can easily handle utilizing a phone camera with React Native. Let me introduce you to React Native Camera.

In this article, I will demonstrate React Native Camera by developing a QR code scanner app. The app will enable us to scan a QR code in real time and display its contents on the screen through the app.

## What is React Native Camera?

[React Native Camera](https://github.com/react-native-camera/react-native-camera) is a comprehensive camera component in React Native. It gives you control of the camera and communicates with the native OS and device hardware.

React Native Camera supports the following:

- Photographs
- Videos
- Face detection
- Barcode scanning
- Text recognition

It’s a completely open-source project, and pull requests are always welcome. It also comes with great [documentation](https://react-native-camera.github.io/react-native-camera/).

You can install expo-camera by running the following command:
```sh
expo install expo-camera
```

It also works with face detection, barcode scanning, and taking pictures. You just need to import Camera from [expo-camera](https://docs.expo.dev/versions/v41.0.0/sdk/camera/):
```sh
import { Camera } from 'expo-camera';
```

## Building a QR scanner with React Native Camera

Now, to understand React Native Camera properly, let’s create a simple React Native project with a QR scanner. I’m going to use an iOS device to build and test.

### Setting up the project

Before we get started, I need to create a new React Native project with the following lines of code:
```sh
react-native init react_native_scanner
cd react_native_scanner
npm run ios
```

Awesome, we’ve successfully created our React Native app.

Next, we should install the React Native Camera package for our project. Let’s install with the following commands:

```sh
npm install react-native-camera --save
cd ios && pod install && cd ..
```

Next, we need to add iOS permissions to our app Info.plist:

```sh
<key>NSCameraUsageDescription</key>
<string>Your message to user when the camera is accessed for the first time</string>

<key>NSPhotoLibraryAddUsageDescription</key>
<string>Your message to user when the photo library is accessed for the first time</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>Your message to user when the photo library is accessed for the first time</string>

<key>NSMicrophoneUsageDescription</key>
<string>Your message to user when the microphone is accessed for the first time</string>
```

Now, we should insert the following lines of code inside our android/app/src/main/AndroidManifest.xml file:
```xml
<uses-permission android:name="android.permission.CAMERA" />

<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

<uses-permission android:name="android.permission.RECORD_AUDIO"/>
```

Last but not least, we should change android/app/build.gradle file:
```gradle
android {
  ...
  defaultConfig {
    ...
    missingDimensionStrategy 'react-native-camera', 'general' // <--- insert this line
  }
}
```

After that, if we run the app and everything is fine, then we are ready to code!

### Styling the app

Let’s change our App.js file by adding the following imports:
```js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { RNCamera } from 'react-native-camera'
```

We will import and use the RNCamera component to communicate with the camera. If you are interested, you can read more [about RNCamera here](https://react-native-camera.github.io/react-native-camera/docs/rncamera).

Next, we will modify our main screen. Let’s remove the previously generated code in order to add a topBar with SafeAreaView and a title with View and Text.

Then, I will add RNCamera as mentioned above to communicate with the camera, and a TouchableOpacity button to allow the user to scan a QR code:
```js
<View style={styles.screen}>
  <SafeAreaView style={styles.saveArea}>
    <View style={styles.topBar}>
      <Text style={styles.topBarTitleText}>React Native Scanner</Text>
    </View>
  </SafeAreaView>

  <View style={styles.caption}>
    <Text style={styles.captionTitleText}>Welcome To React-Native-Camera Tutorial</Text>
  </View>

  <RNCamera style={styles.rnCamera} />

  <View style={styles.cameraControl}>
    <TouchableOpacity style={styles.btn}>
      <Text style={styles.btnText}>New QR Scan</Text>
    </TouchableOpacity>
  </View>
</View>
```

Let’s update the styling of our topBar to make it green, and title text to make it black:
```js
const styles = StyleSheet.create({
  topBar: {
    height: 50,
    backgroundColor: '#62d1bc', // green
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitleText: {
    color: '#ffffff', // white
    fontSize: 20,
  },
  caption: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionTitleText: {
    color: '#121B0D', // black
    fontSize: 16,
    fontWeight: '600'
  },
});
```

I am going to use useState to store the QR code from React Native Camera. Let’s add the following line to our App.js with initial state null:
```js
function App() {
  const [barcode, setBarcode] = useState(null);
  ...
}
```

We will store the QR code simply by calling setBarcode and display it with barcode.

Also, I added RNCamera with styling like so. This is so it will not take up too much space on the screen and we are able to see the rest of the app:
```js
const styles = StyleSheet.create({
  ...
  rnCamera: {
    flex: 1,
    width: '94%',
    alignSelf: 'center',
  }
})
```

If you want to check out all styling options, you can check out the stylesheet on [GitHub here](https://github.com/Gapur/react-native-scanner/blob/e05e215c6d9ad1295b0117fe52af134840df214b/App.js#L41).

Now, if you run the app, our UI will look like the photo below:

<p>
  <img width="800"src="https://github.com/Gapur/react-native-scanner/blob/main/assets/react-native-scanner-UI.png">
</p>


### Scanning a QR code

If you try to scan a QR code, you will not be able to read it yet. Therefore I will use the [onBarCodeRead](https://react-native-camera.github.io/react-native-camera/docs/rncamera#onbarcoderead) method to retrieve barcode information when the camera detects a QR code.

This function returns several properties, including:
- data, a text presentation of QR code
- rawData, the encoded data in the QR code
- uri, the path to the saved image in your app’s cache (iOS only)
- type, the type of QR code (qr, aztec, code93, etc.)
- bounds, the image size and origin data (x and y)

<p>
  <img width="800"src="https://github.com/Gapur/react-native-scanner/blob/main/assets/react-native-scanner-barcode.png">
</p>

Let’s update our App.js file to display information read from the QR code:
```js
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
```

Above, we have extracted information from the QR code using the onBarCodeRead function and saved it in React state by calling the setBarcode method.

Then, we have displayed the barcode data and type, if the barcode is not null. If you want to scan again, you can press the New QR Scan button, and the state data will be set to null.

And that’s it! This is the final app:

<p>
  <img width="800"src="https://github.com/Gapur/react-native-scanner/blob/main/assets/react-native-scanner-final.png">
</p>

## Conclusion

React Native Camera is an incredible package to help developers use the device camera for iOS and Android apps built with React Native. Besides our example QR code scanner, you can also do text recognition, face detection, and capture video and images.

Thanks for reading. I hope you found this piece useful. Happy coding!

## Article on LogRocket

[Intro to React Native Camera](https://blog.logrocket.com/intro-to-react-native-camera/)

## How to contribute?

1. Fork this repo
2. Clone your fork
3. Code 🤓
4. Test your changes
5. Submit a PR!