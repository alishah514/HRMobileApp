import React from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import CommonStyles from '../../common/CommonStyles';
import LogoLoaderComponent from '../LogoLoaderComponent';

export default function CommonSafeAreaScrollViewComponent({children, styling}) {
  return (
    <SafeAreaView style={[CommonStyles.container, styling && styling]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={CommonStyles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
