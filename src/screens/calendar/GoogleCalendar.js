import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';

export default function GoogleCalendar({calendarId, timezone}) {
  const [loading, setLoading] = useState(false);
  const calendarUri = `https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=${timezone}`;

  return (
    <View style={styles.container}>
      {loading && <LogoLoaderComponent />}
      <WebView
        source={{uri: calendarUri}}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
