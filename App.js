import React from 'react';
import {StatusBar} from 'react-native';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigator';

const App = () => {
  return (
    <>
      <MainProvider>
        <Navigator />
      </MainProvider>
      <StatusBar barStyle="light-content" backgroundColor={'#61dafb'} />
    </>
  );
};

export default App;
