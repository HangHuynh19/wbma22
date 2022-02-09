import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Card, ToggleButton} from 'react-native-paper';
import Logo from '../assets/logo.svg';

const Login = ({navigation}) => {
  const [formToggle, setFormToggle] = useState(true);
  const [value, setValue] = useState('Register');
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token value in async storage', userToken);

    if (!userToken) {
      return;
    }

    try {
      const userData = await getUserByToken(userToken);
      console.log('checkToken', userData);
      console.log('token', userToken);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      style={{flex: 1}}
      activeOpacity={1}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <Card>
          <Logo height="100" width="100" style={{alignSelf: 'center'}} />
        </Card>
        <ToggleButton.Row
          onValueChange={(value) => {
            setValue(value);
            value === 'Register'
              ? setFormToggle(true)
              : value === null
              ? setFormToggle(formToggle)
              : setFormToggle(false);
          }}
          value={value}
        >
          <ToggleButton
            icon="account-plus"
            value="Register"
            style={{width: '50%'}}
          />
          <ToggleButton icon="login" value="Login" style={{width: '50%'}} />
        </ToggleButton.Row>

        {formToggle ? (
          <Card>
            <Card.Content style={{alignItems: 'center'}}>
              <Card.Title title="Register" />
              <RegisterForm setFormToggle={setFormToggle} />
            </Card.Content>
          </Card>
        ) : (
          <Card>
            <Card.Content style={{alignItems: 'center'}}>
              <Card.Title title="Login" />
              <LoginForm />
            </Card.Content>
          </Card>
        )}
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
