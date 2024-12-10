import {Platform, StyleSheet} from 'react-native';

import {hp, wp} from './Dimensions';
import {Colors} from './Colors';
import Constants from './Constants';

const CommonStyles = StyleSheet.create({
  // alignment
  alignSelf: {alignSelf: 'center'},
  alignItemsCenter: {alignItems: 'center'},
  justifyCenter: {justifyContent: 'center'},
  spaceEven: {justifyContent: 'space-evenly'},
  flexRow: {flexDirection: 'row'},
  rowBetween: {flexDirection: 'row', justifyContent: 'space-between'},
  centerView: {justifyContent: 'center', alignItems: 'center'},
  alignStart: {alignSelf: 'flex-start'},
  textCenter: {textAlign: 'center'},

  //text
  boldTitle: {fontWeight: '600', fontSize: wp('8')},
  bold3: {fontWeight: '600', fontSize: wp('3')},
  bold4: {fontWeight: '600', fontSize: wp('4')},
  bold6: {fontWeight: '600', fontSize: wp('6')},
  bold5: {fontWeight: '600', fontSize: wp('5')},
  lessBold3: {fontWeight: '500', fontSize: wp('3')},
  lessBold4: {fontWeight: '400', fontSize: wp('4')},
  lessBold5: {fontWeight: '400', fontSize: wp('5')},
  font3P: {fontSize: wp('3.5')},
  font4: {fontSize: wp('4')},
  font4P: {fontSize: wp('4.5')},
  font5: {fontSize: wp('5')},
  font5P: {fontSize: wp('5.5')},
  font6: {fontSize: wp('6')},
  font7: {fontSize: wp('7')},
  font8: {fontSize: wp('8')},
  lightFont: {fontWeight: '300'},
  lessBold300: {fontWeight: '300'},
  bold400: {fontWeight: '400'},
  bold500: {fontWeight: '500'},
  Bold600: {fontWeight: '600'},
  lessBold3P5: {fontWeight: '500', fontSize: wp('3.5')},
  lessBold4P: {fontWeight: '400', fontSize: wp('4.5')},
  bold4P: {fontWeight: '600', fontSize: wp('4.5')},
  bold3p5: {fontWeight: '600', fontSize: wp('3.5')},
  lessBold5P: {fontWeight: '400', fontSize: wp('5.5')},
  bold5P: {fontWeight: '600', fontSize: wp('5.5')},

  //colors
  textWhite: {color: Colors.whiteColor},
  textLightGrey: {color: Colors.lightGrey},
  textGrey: {color: Colors.greyColor},
  textBlack: {color: Colors.blackColor},
  textGreen: {color: Colors.greenColor},
  textBlue: {color: Colors.blueColor},
  textRed: {color: Colors.redColor},
  textYellow: {color: Colors.yellowColor},
  backgroundBlue: {backgroundColor: Colors.blueColor},
  backgroundYellow: {backgroundColor: Colors.yellowColor},
  backgroundDarkYellow: {backgroundColor: Colors.drawerColor},

  yellowBorder: {borderColor: Colors.yellowColor},
  blueBorder: {borderColor: Colors.blueColor},
  redBorder: {borderColor: Colors.redColor},
  greenBorder: {borderColor: Colors.greenColor},

  //others
  fullWidth: {width: '100%'},
  underlineText: {textDecorationLine: 'underline'},
  loginField: {
    height: wp('12'),
    backgroundColor: Colors.lightGrey,
    borderRadius: wp('1'),
    marginTop: wp('2'),
    paddingHorizontal: wp('3'),
  },

  columnWrapper: {
    justifyContent: 'space-around',
    paddingVertical: wp(2),
  },

  // overall
  margin5: {margin: wp('5')},
  mainPadding: {padding: wp('5')},
  padding3: {padding: wp('3')},
  padding5: {padding: wp('5')},

  //vertical
  paddingVertical1: {paddingVertical: wp('1')},
  paddingVertical2: {paddingVertical: wp('2')},
  paddingVertical3: {paddingVertical: wp('3')},
  marginVertical1: {marginVertical: wp('1')},
  marginVertical2: {marginVertical: wp('2')},
  marginVertical3: {marginVertical: wp('3')},
  marginVertical5: {marginVertical: wp('5')},
  paddingVertical5: {paddingVertical: wp('5')},

  //horizontal
  paddingHor5: {paddingHorizontal: wp('5')},
  paddingHor3: {paddingHorizontal: wp('3')},
  marginHor1: {marginHorizontal: wp('1')},
  marginHor2: {marginHorizontal: wp('2')},
  marginHor3: {marginHorizontal: wp('3')},
  marginHor3P: {marginHorizontal: wp('3.5')},
  marginHor4: {marginHorizontal: wp('4')},

  //bottom
  paddingBottom1: {paddingBottom: wp('1')},
  paddingBottom2: {paddingBottom: wp('2')},
  paddingBottom3: {paddingBottom: wp('3')},
  paddingBottom5: {paddingBottom: wp('5')},
  paddingBottom7: {paddingBottom: wp('7')},
  paddingBottom10: {paddingBottom: wp('15')},
  marginBottom1: {marginBottom: wp('1')},
  marginBottom2: {marginBottom: wp('2')},
  marginBottom3: {marginBottom: wp('3')},
  marginBottom5: {marginBottom: wp('5')},
  marginBottom7: {marginBottom: wp('7')},
  marginBottom20: {marginBottom: wp('20')},

  // top
  marginTop2: {marginTop: wp('2')},
  marginTop3: {marginTop: wp('3')},
  marginTop5: {marginTop: wp('5')},
  marginTop7: {marginTop: wp('7')},
  marginTop8: {marginTop: wp('8')},
  marginTop10: {marginTop: wp('10')},
  paddingTopP5: {paddingTop: wp('0.5')},
  paddingTop1: {paddingTop: wp('1')},
  paddingTop2: {paddingTop: wp('2')},
  paddingTop3: {paddingTop: wp('3')},
  paddingTop5: {paddingTop: wp('5')},
  paddingTop7: {paddingTop: wp('7')},
  paddingTop10: {paddingTop: wp('10')},
  paddingTop15: {paddingTop: wp('15')},
  paddingTop16: {paddingTop: wp('16')},
  paddingTop20: {paddingTop: wp('20')},
  paddingTop25: {paddingTop: wp('25')},
  paddingTop30: {paddingTop: wp('30')},

  // left
  paddingLeft1: {paddingLeft: wp('1')},
  paddingLeft2: {paddingLeft: wp('2')},
  paddingLeft3: {paddingLeft: wp('3')},
  paddingLeft5: {paddingLeft: wp('5')},

  // right
  paddingRight1: {paddingRight: wp('1')},
  paddingRight2: {paddingRight: wp('2')},
  paddingRight3: {paddingRight: wp('3')},
  paddingRight3p5: {paddingRight: wp('3.5')},
  marginRight1: {marginRight: wp('1')},
  marginRight2: {marginRight: wp('2')},
  marginRight3: {marginRight: wp('3')},
  marginRight4: {marginRight: wp('4')},
  marginRight5: {marginRight: wp('5')},
  marginRight6: {marginRight: wp('6')},

  CenterText: {textAlign: 'center'},

  // width
  width10: {width: wp('10')},
  width35: {width: wp('35')},
  width40: {width: wp('40')},
  width50: {width: wp('50')},
  width60: {width: wp('60')},
  width80: {width: wp('80')},
  width90: {width: wp('90')},
  width95: {width: wp('95')},
  width35: {width: wp('35')},
  width70: {width: wp('70')},
  width75: {width: wp('75')},
  width30: {width: wp('30')},
  width50: {width: wp('50')},

  // height
  height30: {height: wp('30')},
  height48: {height: wp('48')},
  height50: {height: wp('50')},
  height60: {height: wp('60')},
  height70: {height: wp('70')},
  height80: {height: wp('80')},
  height85: {height: wp('85')},
  height90: {height: wp('90')},
  height100: {height: wp('100')},

  // colors
  blackBorder: {borderColor: Colors.blackColor},
  redColor: {color: Colors.redColor},
  transparentColor: {
    backgroundColor: 'transparent',
  },
  whiteBackground: {
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
  curveView: {
    height: Platform.OS === 'ios' ? hp(28) : hp(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  topSmallCurveView: {
    height: Platform.OS === 'ios' ? hp(20) : hp(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  topVerySmallCurveView: {
    height: Platform.OS === 'ios' ? hp(10) : hp(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundCurve: {
    height: Platform.OS === 'ios' ? hp(72) : hp(68),
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
  },
  topSmallBackgroundCurve: {
    height: Platform.OS === 'ios' ? hp(80) : hp(76),
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
  },
  topVerySmallBackgroundCurve: {
    height: Platform.OS === 'ios' ? hp(90) : hp(86),
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
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
  borderLineWithoutMargin: {
    width: wp('85'),
    borderWidth: wp('0.2'),
    borderColor: Colors.lightGrey,
    alignSelf: 'center',
    marginTop: wp('4'),
  },

  // tab bar styles
  tabBarStyle: {
    backgroundColor: Colors.whiteColor,
    height: wp('17'),
  },
  shadowTabBar: {
    shadowColor: Colors.blackColor,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.5,
    elevation: 5,
  },

  tabBarItemView: {
    alignItems: 'center',
    justifyContent: 'center',
    top: Platform.OS === 'ios' && 10,
  },
  tabBarItemText: {fontSize: wp(3.5), fontWeight: '500', paddingTop: wp(1)},

  // half modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
  },
  modalView: {
    backgroundColor: Colors.whiteColor,
    borderRadius: wp('5%'),
    padding: wp('8%'),
    alignItems: 'center',
    shadowColor: Colors.blackColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: Platform.OS === 'ios' ? 5 : 0.5,
  },
  inputField: {
    borderBottomWidth: 1,
    width: wp('70%'),
    paddingBottom: wp('1%'),
    fontSize: wp('4%'),
  },
  multilineInputField: {
    borderWidth: 1,
    width: wp('70%'),
    height: wp('30%'),
    paddingBottom: wp('1%'),
    fontSize: wp('4%'),
  },

  //drawer
  dpView: {
    width: wp('15'),
    height: wp('15'),
    borderRadius: wp('7.5'),
    backgroundColor: Colors.greyColor,
    borderWidth: wp('0.5'),
    borderColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  nameTitle: {
    color: Colors.whiteColor,
    fontWeight: '600',
    fontSize: wp('3.5'),
    width: wp('48'),
  },

  // input field
  InputField: {
    color: Colors.blackColor,
    fontSize: wp('4'),
    fontWeight: '500',
    alignSelf: 'flex-start',
    width: '100%',
    //
  },
  // input field
  InputFieldDate: {
    fontSize: wp('4'),
    fontWeight: '500',
    width: '90%',
  },
  InputFieldDateHalf: {
    fontSize: wp('4'),
    fontWeight: '500',
  },
  inputContainer: {
    alignItems: 'center',
    borderBottomWidth: wp('0.15'),
    borderColor: Colors.greyColor,
    paddingBottom: Platform.OS === 'ios' ? wp('2') : null,
  },
  //multiline input box
  multilineInput: {
    alignSelf: 'flex-start',
    borderWidth: wp('0.15'),
    borderColor: Colors.greyColor,
    backgroundColor: Colors.whiteColor,
    borderRadius: wp('2'),
    padding: wp('2'),
    minHeight: wp('30'),
    maxHeight: wp('70'),
    textAlignVertical: 'top',
  },

  //date picker
  dateView: {
    borderBottomWidth: wp('0.15'),
    borderColor: Colors.greyColor,
    paddingBottom: wp('3'),
    paddingTop: wp('1.5'),
  },

  //input picker

  // Style for the text inside the picker
  InputFieldText: {
    fontSize: wp('4'),
    fontWeight: '500',
  },
  pickerMainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
  },
  pickerMainContainerBox: {
    backgroundColor: Colors.whiteColor,
    marginHorizontal: wp('5'),
    borderRadius: wp('5'),
    minHeight: wp('60'),
  },
  pickerContainer: {
    borderBottomWidth: wp('0.15'),
    borderColor: Colors.greyColor,
    width: '100%',
    paddingBottom: wp('1'),
  },
  pickerTopHeader: {
    height: wp('12'),
    backgroundColor: Colors.blueColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  pickerView: {
    marginTop: Platform.OS === 'android' && wp('15'),
    borderBottomWidth: wp('0.15'),
    borderColor: Colors.greyColor,
    marginHorizontal: wp('2'),
  },
  pickerBottomHeader: {
    height: wp('12'),
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: wp('5'),
    borderBottomRightRadius: wp('5'),
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },

  //tab change
  tabChange: {
    borderRadius: wp('10'),
    justifyContent: 'space-between',
    backgroundColor: Colors.whiteColor,
    alignSelf: 'center',
    position: 'absolute',
    top: Platform.OS === 'ios' ? -30 : -25,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp('7'),
    zIndex: 1,
  },
  activeTabIconCircle: {
    width: wp('14'),
    height: wp('14'),
    borderRadius: wp('7'),
    backgroundColor: Colors.yellowColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nonActiveTabIconCircle: {
    width: wp('14'),
    height: wp('14'),
    borderRadius: wp('7'),
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //profile header
  paddingBottom5Align: {
    paddingBottom: wp('5'),
    alignItems: 'center',
  },
  imageCircle: {
    width: wp('30'),
    height: wp('30'),
    borderRadius: wp('15'),
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    width: '100%',
    height: '100%',
    borderRadius: wp('15'),
  },
  editPenIconCircle: {
    width: wp('10'),
    height: wp('10'),
    borderRadius: wp('5'),
    backgroundColor: Colors.yellowColor,
    position: 'absolute',
    top: -5,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  maxHeight: {
    maxHeight: Platform.OS === 'ios' ? hp('67') : hp('73'),
    marginTop: wp('15'),
  },
  infoStarting: {
    width: wp('85'),
    alignSelf: 'center',
  },

  // image picker options modal
  imageModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(64, 147, 239, 0.5)',
    paddingHorizontal: wp('3'),
  },
  imageModalContainer: {
    height: wp('65'),
    width: '100%',
    backgroundColor: Colors.whiteColor,
    borderRadius: 2,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  imageModalHeading: {
    color: Colors.blackColor,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },

  imageModalBtnsContainer: {
    flexDirection: 'row',
    bottom: 0,
    marginBottom: 20,
  },
  imageModalBtnView: {
    width: '42%',
    margin: '4%',
    alignItems: 'center',
    borderColor: Colors.drawerColor,
    borderWidth: 2,
    borderRadius: 2,
    paddingVertical: wp('7'),
  },
  imageModalIcon: {
    height: wp('10'),
    marginBottom: wp('5'),
  },
  imageModalIconText: {
    color: Colors.drawerColor,
    fontWeight: 'bold',
    fontSize: wp('5'),
    alignSelf: 'center',
  },

  //No Record View
  noRecordMainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  NoRecordText: {
    fontSize: wp('5'),
    color: '#848482',
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: wp('3'),
  },

  //logo loader

  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.transparent,

    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    flex: 1,
  },

  logoContainer: {
    width: 80,
    height: 80,
  },

  loaderWrapper: {
    width: Platform.OS === 'ios' ? wp('28') : wp('30'),
    height: Platform.OS === 'ios' ? wp('28') : wp('30'),
    borderRadius: Platform.OS === 'ios' ? wp('14') : wp('15'),
    backgroundColor: Colors.blueColor,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loaderWrapperSmall: {
    width: Platform.OS === 'ios' ? wp('23') : wp('25.5'),
    height: Platform.OS === 'ios' ? wp('23') : wp('25.5'),
    borderRadius: Platform.OS === 'ios' ? wp('11.5') : wp('12.75'),
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CommonStyles;
