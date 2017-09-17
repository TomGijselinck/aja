import React from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Camera from 'react-native-camera';
import { connect } from 'react-redux'
import RNFS from 'react-native-fs'

import { POST_CHALLENGE, IMG_TAKEN } from '../actions'

class CameraScreen extends React.PureComponent {
  constructor (props) {
    super(props)

    let routeTo = undefined

    if (props.navigation.state.params) {
      routeTo = props.navigation.state.params.routeTo
    }

    this.state = {
      routeTo
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.navigation.state.params) {
      this.setState({
        routeTo: nextProps.navigation.state.params.routeTo,
      })
    } else {
      this.setState({
        routeTo: null,
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureQuality='low'>
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
      .then((data) => {
        RNFS.readFile(data.path, 'base64').then(
          result => {
            this.props.takePicture(result, this.state.routeTo)
            this.props.navigation.setParams({
              routeTo: undefined
            })
          }
        );
      })
      .catch(err => console.error(err));
  }
}

function mapDispatchToProps(dispatch) {
  return {
    takePicture (photoData, routeTo) {
      dispatch({ type: IMG_TAKEN, payload: {
        image: photoData,
        routeTo,
      }})
    }
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(CameraScreen)

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