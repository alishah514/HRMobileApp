import React, {useState} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';
import CommonStyles from '../../components/common/CommonStyles';

<<<<<<< HEAD
export default function GoogleCalendar({
  calendarId,
  timezone,
  calendarLoading,
}) {
=======
export default function GoogleCalendar({calendarId, timezone}) {
>>>>>>> 302f3c41842252f18f7701df6aeb1d7ff45ccdad
  const [isLoading, setIsLoading] = useState(false);
  const calendarUri = `https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=${timezone}`;

  return (
    <View style={CommonStyles.container}>
<<<<<<< HEAD
      {(isLoading || calendarLoading) && <LogoLoaderComponent />}
=======
      {isLoading && <LogoLoaderComponent />}
>>>>>>> 302f3c41842252f18f7701df6aeb1d7ff45ccdad
      <WebView
        source={{uri: calendarUri}}
        style={CommonStyles.container}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
}
