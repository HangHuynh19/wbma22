import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Single from '../views/Single';
import Login from '../views/Login';
import {MainContext} from '../contexts/MainContext';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider as PaperProvider} from 'react-native-paper';
import ModifyUser from '../views/ModifyUser';
import {Icon} from 'react-native-elements';
import Upload from '../views/Upload';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Upload':
              iconName = 'cloud-upload';
              break;
            case 'Profile':
              iconName = 'account-box';
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          headerShown: true,
          tabBarLabel: 'Upload',
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Main"
            component={TabScreen}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen name="Single" component={Single}></Stack.Screen>
          <Stack.Screen
            name="Modify user"
            component={ModifyUser}
          ></Stack.Screen>
        </>
      ) : (
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackScreen />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Navigator;
