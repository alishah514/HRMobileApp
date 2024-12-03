import React, {useState} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';
import CommonStyles from '../../components/common/CommonStyles';

export default function GoogleCalendar({
  calendarId,
  timezone,
  calendarLoading,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const calendarUri = `https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=${timezone}`;

  return (
    <View style={CommonStyles.container}>
      {(isLoading || calendarLoading) && <LogoLoaderComponent />}
      <WebView
        source={{uri: calendarUri}}
        style={CommonStyles.container}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
}
