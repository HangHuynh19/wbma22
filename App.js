import React from 'react';
import {StatusBar} from 'react-native';
import Navigator from './navigators/Navigator';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={'#61dafb'} />
      <Navigator />
    </>
  );
};

export default App;
