import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
} from 'react-native';
import List from './components/List';
import {Settings} from 'react-native-feather';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#61dafb" barStyle="light-content" />
      <View style={styles.header}>
        <ImageBackground
          source={require('./assets/cute_cat.jpeg')}
          style={styles.bgImage}
          imageStyle={{borderBottomRightRadius: 65}}
        />
        <Settings
          stroke="lightgrey"
          width={32}
          height={32}
          style={styles.settingsIcon}
        />
        <Text style={styles.hello}>Hi there, have a nice day!</Text>
      </View>
      <List style={styles.infoArea} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'darkgrey',
    height: '100%',
    paddingTop: 0,
  },
  header: {
    height: 270,
    backgroundColor: 'darkgrey',
    marginBottom: 20,
  },
  bgImage: {
    width: Dimensions.get('window').width,
    height: 270,
  },
  settingsIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  hello: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: 20,
    left: 0,
    padding: 10,
    color: 'snow',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Courier New',
  },
  infoArea: {
    flex: 1,
  },
});

export default App;
