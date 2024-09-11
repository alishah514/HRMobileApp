import React from 'react';
import {SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';
import CommonStyles from './common/CommonStyles';

export default function CommonSafeAreaView({children, styling}) {
  return (
    <SafeAreaView style={[CommonStyles.container, styling && styling]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={CommonStyles.container}>
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
