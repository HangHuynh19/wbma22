import React from 'react';
import {StatusBar} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigator';

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4b88a2',
    accent: '#252627',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <MainProvider>
        <Navigator />
      </MainProvider>
      <StatusBar barStyle="light-content" backgroundColor={'#61dafb'} />
    </PaperProvider>
  );
};

export default App;
