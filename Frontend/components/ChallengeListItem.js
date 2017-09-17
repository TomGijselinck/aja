import React, {Component} from 'react';
import { TouchableHighlight, StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const myIcon = (<Icon name="trending up" size={30} color="#900" />)
import moment from 'moment';
import TimerMixin from 'react-timer-mixin';
import commonstyle from '../styles.js'
import colors from '../colors.js'

export default class ChallengeListItem extends React.Component {

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
    if (state === 'incoming' || state === 'completed') {
      navigation.navigate('CompleteChallenge', {challenge})
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

    let timer = this.state.timer

    if (timer == '') {
      let clockDate = moment(this.props.clock)
      let endTimer = clockDate.add(24, 'hours')
      var timeLeft = moment.duration((endTimer.unix() - moment().unix()) * 1000, 'milliseconds')  
      timer = moment.utc(moment.duration(timeLeft).asMilliseconds()).format("HH:mm:ss")
    }

    let stateIcon
    let clockView = (
        <View style={styles.containerIconClock}>
          <MaterialCommunityIcons name="alarm" size={25} color={colors.background} style={{marginRight: 5, marginLeft: 5}}/>
          <Text style={[commonstyle.fontRegular, styles.clock]}>{timer}</Text>
        </View>)
    if (state === 'incoming'){
      stateIcon = <Icon name="chevron-right" size={40} color={colors.text}/>
    }
    else if (state === 'pending'){
      stateIcon = <Icon name="dots-three-horizontal" size={40} color={colors.text}/>
    }
    else{
      if (state === 'completed') {
        clockView = <Text style={[commonstyle.fontRegular, {color: colors.main, fontSize: 20}]}>{'Completed!'}</Text>
      }
      else{
        clockView = <Text style={[commonstyle.fontRegular, {color: colors.darkRed, fontSize: 20}]}>{'Failed!'}</Text>
      }
    }

    return (
      <TouchableHighlight onPress={this.pressArrowHandler.bind(this)}>
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
            <Text style={[commonstyle.fontRegular, styles.texttitle]}>{title}</Text>
            <View style={styles.clockContainer}>
              {clockView}
            </View>
          </View>

          {stateIcon &&
          <TouchableHighlight style={styles.container3} onPress={this.pressArrowHandler.bind(this)}>
            {stateIcon}
          </TouchableHighlight>
          }
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({

  parentContainer: {
    flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 10,
    //justifyContent: 'space-around'
    // justifyContent: 'center',
  },

  avatarContainer: {
    //flex: 1,
    //flexDirection: 'row',
    alignItems: 'center',
    //paddingVertical: 20,
    //justifyContent: 'space-around'
    justifyContent: 'center',
  },

  container2: {
    flex: 1,
    //flexDirection: 'row',
    //alignItems: 'flex-start',
    //paddingVertical: 20,
    marginLeft: 20,
    //justifyContent: 'space-around'
    // justifyContent: 'center',
  },

  container3: {
    //flex: 1,
    //flexDirection: 'row',
    alignItems: 'flex-start',
    //paddingVertical: 20,
    marginRight: 10,
    //justifyContent: 'space-around'
    justifyContent: 'center',
  },

  containerIconClock: {
    flexDirection: 'row',
    // backgroundColor: '#DE9796',
    backgroundColor: colors.clockBackground,
    borderRadius: 8,
    padding: 2,
    paddingLeft: 4,
    paddingRight: 4,
    //alignSelf: 'center',
    alignItems: 'center',

    // color: colors.background,

  },

  avatar: {
    marginLeft: 10,
  },

  texttitle: {
    //marginLeft: 20,
    fontSize: 20,
    color: colors.text,
    // fontWeight: 'bold',
  },

  clockContainer: {
    //flex: 0,
    //alignItems: 'flex-start',
    width: 125,
    justifyContent: 'center',
    marginTop: 4,
  },

  clock: {
    //marginHorizontal: 10,
    //flex: 0,
    fontSize: 20,
    color: colors.background,
    // backgroundColor: '#DE9796',
    borderWidth: 0,
    borderColor: '#591E1D',
    borderRadius: 8,
    padding: 2,
    paddingLeft: 4,
    paddingRight: 4,
    //alignSelf: 'center',
    textAlign: 'center',
    // padding: 4,
    // fontWeight: 'bold',
    //alignSelf: 'center'
  },

  scorePositive:{
    color: 'green',
  },

  scoreNegative:{
    color: 'red',
  },
});

