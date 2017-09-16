import React from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';

export default class CameraScreen extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <TouchableHighlight style={styles.capture} onPress={this.takePicture.bind(this)}>
            <View style={styles.innerCapture}/>
          </TouchableHighlight>
        </Camera>
      </View>
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    backgroundColor: 'transparent',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 7,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCapture: {
    width: '95%',
    height: '95%',
    backgroundColor: '#fff',
    borderRadius: 40,
  }
})