import React, {Component} from 'react';
import { TouchableHighlight, StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo';
const myIcon = (<Icon name="trending up" size={30} color="#900" />)
import moment from 'moment';
import TimerMixin from 'react-timer-mixin';

export default class ChallengeListItem extends React.Component {
  mixins: [TimerMixin]

  constructor (props) {
    super(props)

    this.state = {
      timer: '',
    }
  }

  componentDidMount() {
    this._mounted = true
    this.updateClock(this)
  }
  componentWillUnmount() {
    this._mounted = false;
  }

  updateClock(that) {
    TimerMixin.setTimeout(() => {
      if(that._mounted) {
        let clockDate = moment(that.props.clock)
        let endTimer = clockDate.add(24, 'hours')
        var timeLeft = moment.duration((endTimer.unix() - moment().unix()) * 1000, 'milliseconds')  
        let timer = moment.utc(moment.duration(timeLeft).asMilliseconds()).format("HH:mm:ss")

        that.setState({
          timer: timer,
        })
      }

      that.updateClock(that)
    }, 1000);
  }

  pressArrowHandler() {
    const {
      navigation,
      state,
      challenge
    } = this.props
    if (state === 'incoming') {
      navigation.navigate('CompleteChallenge', {challenge})
    } else {
      navigation.navigate('CameraScreen')
    }
  }

  render() {
    const {
      navigation,
      avatar,
      title,
      clock,
      state,
    } = this.props

    let stateIcon
    if (state === 'incoming'){
      stateIcon = <Icon name="chevron-right" size={40} color="grey"/>
    }
    else if (state === 'pending'){
      stateIcon = <Icon name="dots-three-horizontal" size={40} color="grey"/>
    }
    else{
      stateIcon = <Icon name="check" size={25} color="grey"/>
    }

    let timer = this.state.timer

    if (timer == '') {
      let clockDate = moment(this.props.clock)
      let endTimer = clockDate.add(24, 'hours')
      var timeLeft = moment.duration((endTimer.unix() - moment().unix()) * 1000, 'milliseconds')  
      timer = moment.utc(moment.duration(timeLeft).asMilliseconds()).format("HH:mm:ss")
    }

    return (
      <View style={styles.parentContainer}>
        <View style={styles.avatarContainer}>
          <Avatar containerStyle={styles.avatar}
            /* small */
            medium
            rounded
            source={{uri: avatar}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        </View>
        <View style={styles.container2}>
          <Text style={styles.texttitle}>{title}</Text>
          <Text style={styles.clock}>{timer}</Text>
        </View>

        <TouchableHighlight style={styles.container3} onPress={this.pressArrowHandler.bind(this)}>
          {stateIcon}
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  parentContainer: {
    flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    paddingVertical: 10,
    //justifyContent: 'space-around'
    // justifyContent: 'center',
  },

  avatarContainer: {
    //flex: 1,
    //flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    //justifyContent: 'space-around'
    justifyContent: 'center',
  },

  container2: {
    flex: 1,
    //flexDirection: 'row',
    //alignItems: 'flex-start',
    paddingVertical: 20,
    marginLeft: 20,
    //justifyContent: 'space-around'
    // justifyContent: 'center',
  },

  container3: {
    //flex: 1,
    //flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 20,
    marginRight: 10,
    //justifyContent: 'space-around'
    justifyContent: 'center',
  },


  avatar: {
    marginLeft: 10,
  },

  texttitle: {
    flex: 1,
    //marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },

  clock: {
    //marginHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
    //alignSelf: 'center'
  },

  scorePositive:{
    color: 'green',
  },

  scoreNegative:{
    color: 'red',
  },
});

