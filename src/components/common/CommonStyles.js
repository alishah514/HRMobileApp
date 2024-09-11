import {StyleSheet} from 'react-native';

import {wp} from './Dimensions';
import {Colors} from './Colors';

const CommonStyles = StyleSheet.create({
  // alignment
  alignSelf: {alignSelf: 'center'},
  alignItemsCenter: {alignItems: 'center'},
  justifyCenter: {justifyContent: 'center'},
  spaceEven: {justifyContent: 'space-evenly'},
  flexRow: {flexDirection: 'row'},
  rowBetween: {flexDirection: 'row', justifyContent: 'space-between'},
  centerView: {justifyContent: 'center', alignItems: 'center'},

  //text
  boldTitle: {fontWeight: '600', fontSize: wp('8')},
  bold3: {fontWeight: '600', fontSize: wp('3')},
  bold4: {fontWeight: '600', fontSize: wp('4')},
  bold6: {fontWeight: '600', fontSize: wp('6')},
  lessBold3: {fontWeight: '500', fontSize: wp('3')},
  lessBold4: {fontWeight: '500', fontSize: wp('4')},
  lessBold5: {fontWeight: '500', fontSize: wp('5')},
  font5: {fontSize: wp('5')},
  lessBold3P: {fontWeight: '500', fontSize: wp('3.5')},
  lessBold4P: {fontWeight: '500', fontSize: wp('4.5')},

  //colors
  textWhite: {color: Colors.whiteColor},
  textLightGrey: {color: Colors.lightGrey},
  textGrey: {color: Colors.greyColor},
  textBlack: {color: Colors.greyBlack},
  textBlue: {color: Colors.blueColor},
  backgroundBlue: {backgroundColor: Colors.blueColor},
  yellowBorder: {borderColor: Colors.yellowColor},
  blueBorder: {borderColor: Colors.blueColor},

  //others
  underlineText: {textDecorationLine: 'underline'},
  loginField: {
    height: wp('12'),
    backgroundColor: Colors.lightGrey,
    borderRadius: wp('1'),
    marginTop: wp('2'),
    paddingHorizontal: wp('3'),
  },

  // overall
  margin5: {margin: wp('5')},
  mainPadding: {padding: wp('5')},
  padding3: {padding: wp('3')},

  //vertical
  paddingVertical1: {paddingVertical: wp('1')},
  paddingVertical2: {paddingVertical: wp('2')},
  paddingVertical3: {paddingVertical: wp('3')},
  marginVertical2: {marginVertical: wp('2')},
  marginVertical5: {marginVertical: wp('5')},
  paddingVertical5: {paddingVertical: wp('5')},

  //horizontal
  paddingHor5: {paddingHorizontal: wp('5')},
  paddingHor3: {paddingHorizontal: wp('3')},

  //bottom
  paddingBottom3: {paddingBottom: wp('3')},
  paddingBottom7: {paddingBottom: wp('7')},
  paddingBottom10: {paddingBottom: wp('15')},
  paddingBottom15: {paddingBottom: wp('15')},
  marginBottom3: {marginBottom: wp('3')},
  marginBottom7: {marginBottom: wp('7')},
  marginBottom20: {marginBottom: wp('20')},

  // top
  marginTop2: {marginTop: wp('2')},
  marginTop3: {marginTop: wp('3')},
  marginTop5: {marginTop: wp('5')},
  paddingTopP5: {paddingTop: wp('0.5')},
  paddingTop1: {paddingTop: wp('1')},
  paddingTop2: {paddingTop: wp('2')},
  paddingTop3: {paddingTop: wp('3')},
  paddingTop5: {paddingTop: wp('5')},
  paddingTop10: {paddingTop: wp('10')},
  paddingTop16: {paddingTop: wp('16')},
  paddingTop20: {paddingTop: wp('20')},

  // left
  paddingLeft1: {paddingLeft: wp('1')},
  paddingLeft2: {paddingLeft: wp('2')},
  paddingLeft3: {paddingLeft: wp('3')},
  paddingLeft5: {paddingLeft: wp('5')},

  // right
  paddingRight3: {paddingRight: wp('3')},
  paddingRight3p5: {paddingRight: wp('3.5')},

  CenterText: {textAlign: 'center'},

  // width
  width35: {width: wp('35')},
  width40: {width: wp('40')},
  width80: {width: wp('80')},
  width90: {width: wp('90')},
  width35: {width: wp('35')},
  width70: {width: wp('70')},
  width30: {width: wp('30')},
  width50: {width: wp('50')},

  // height
  height30: {height: wp('30')},
  height50: {height: wp('50')},

  // colors
  blackBorder: {borderColor: Colors.blackColor},
  redColor: {color: Colors.redColor},
  transparentColor: {
    backgroundColor: 'transparent',
  },
  whiteColor: {
    backgroundColor: Colors.whiteColor,
  },

  // others
  container: {
    flex: 1,
  },
  containerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
  },

  shadow: {
    shadowColor: Colors.blackColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  // tab bar styles

  tabBarStyle: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: Colors.whiteColor,
    borderRadius: 15,
    height: 90,
  },
  shadowTabBar: {
    shadowColor: Colors.blackColor,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },

  tabBarItemView: {alignItems: 'center', justifyContent: 'center', top: 10},
  tabBarItemText: {fontSize: wp(3.5), fontWeight: '500', paddingTop: wp(1)},
});

export default CommonStyles;
