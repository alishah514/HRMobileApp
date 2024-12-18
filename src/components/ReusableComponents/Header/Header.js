import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import styles from './styles';

const Header = props => {
  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength
      ? title.substring(0, maxLength - 3) + '...'
      : title;
  };

  const renderOnlyTitle = props => (
    <View style={styles.titleCenter}>
      <Text style={[styles.titleText]}>{truncateTitle(props?.title, 13)}</Text>
    </View>
  );
  const renderTitleWithLeftIcon = props => (
    <View style={styles.header80View}>
      <TouchableOpacity
        onPress={props?.onLeftIconPressed && props?.onLeftIconPressed}>
        {props?.leftIcon && props?.leftIcon}
      </TouchableOpacity>
      <View style={styles.titleCenter}>
        <Text style={[styles.titleText]}>
          {truncateTitle(props?.title, 20)}
        </Text>
      </View>
    </View>
  );

  const renderTitleWithRightIcon = props => (
    <View style={styles.headerFullView}>
      <View style={styles.titleCenter}>
        <Text style={[styles.titleText]}>
          {truncateTitle(props?.title, 13)}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 20,
        }}
        onPress={props?.onRightIconPressed && props?.onRightIconPressed}>
        {props?.rightIcon && props?.rightIcon}
      </TouchableOpacity>
    </View>
  );

  const renderTitleWithTwoIcons = props => (
    <View style={styles.header80View}>
      <TouchableOpacity
        onPress={props?.onLeftIconPressed && props?.onLeftIconPressed}>
        {props?.leftIcon && props?.leftIcon}
      </TouchableOpacity>
      <View style={styles.titleCenter}>
        <Text style={[styles.titleText]}>
          {truncateTitle(props?.title, 13)}
        </Text>
      </View>

      <TouchableOpacity
        onPress={props?.onRightIconPressed && props?.onRightIconPressed}>
        {props?.rightIcon && props?.rightIcon}
      </TouchableOpacity>
    </View>
  );

  const renderTitleWithAllIcons = props => (
    <View style={styles.headerFullView}>
      <TouchableOpacity
        onPress={props?.onLeftIconPressed && props?.onLeftIconPressed}>
        {props?.leftIcon && props?.leftIcon}
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText]}>
          {truncateTitle(props?.title, 13)}
        </Text>
      </View>

      <View style={styles.headerRight2Views}>
        <TouchableOpacity
          style={styles.paddingRight10}
          onPress={props?.onThirdIconPressed && props?.onThirdIconPressed}>
          {props?.thirdIcon && props?.thirdIcon}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props?.onRightIconPressed && props?.onRightIconPressed}>
          {props?.rightIcon && props?.rightIcon}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.blueScreenView}>
      <View style={styles.mainHeader}>
        {/* Render title && left icon */}
        {props?.leftIcon &&
        props?.title &&
        !props?.rightIcon &&
        !props?.thirdIcon
          ? renderTitleWithLeftIcon(props)
          : null}

        {/* Render title && right icon */}
        {props?.rightIcon &&
        props?.title &&
        !props?.leftIcon &&
        !props?.thirdIcon
          ? renderTitleWithRightIcon(props)
          : null}

        {/* Render only title if left icon is not passed */}
        {!props?.leftIcon &&
        !props?.rightIcon &&
        !props?.thirdIcon &&
        props?.title
          ? renderOnlyTitle(props)
          : null}

        {/* Render title, left icon and right icon */}
        {props?.leftIcon &&
        props?.title &&
        props?.rightIcon &&
        !props?.thirdIcon
          ? renderTitleWithTwoIcons(props)
          : null}

        {/* Render all data */}
        {props?.leftIcon && props?.title && props?.rightIcon && props?.thirdIcon
          ? renderTitleWithAllIcons(props)
          : null}
      </View>
    </SafeAreaView>
  );
};

export default Header;
