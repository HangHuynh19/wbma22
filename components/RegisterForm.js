import React from 'react';
import {StyleSheet, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useUser} from '../hooks/ApiHooks';
import {TextInput, Button, Card} from 'react-native-paper';
import PropTypes from 'prop-types';

const RegisterForm = ({setFormToggle}) => {
  const {postUser, checkUsername} = useUser();

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      delete data.confirmPassword;
      const userData = await postUser(data);
      console.log('register onSubmit', userData);
      if (userData) {
        Alert.alert('Sucess', 'User created successfully.');
        setFormToggle(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required'},
          minLength: {
            value: 3,
            message: 'Usename has to be at least 3 characters.',
          },
          validate: async (value) => {
            try {
              const available = await checkUsername(value);
              return available ? true : 'This username is taken.';
            } catch (error) {
              throw new Error(error.message);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="username"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required'},
          pattern: {
            value: '/(?=.*[\\p{Lu}])(?=.*[0-9]).{8,}/u',
            message: '',
          },
          minLength: {
            value: 5,
            message: 'Password has to be at least 5 characters.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="password"
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required'},
          validate: async (value) => {
            const {password} = getValues();
            return value === password ? true : 'Password does not match';
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="confirm password"
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="confirmPassword"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required'},
          pattern: {
            value:
              '/^[a-z0-9_-]+(.[a-z0-9_-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*.[a-z]{2,}$/i',
            message: 'Has to be valid email',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="email"
            errorMessage={errors.email && errors.email.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          minLength: {
            value: 5,
            message: 'Usename has to be at least 5 characters.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
            placeholder="full name"
            errorMessage={errors.full_name && errors.full_name.message}
          />
        )}
        name="full_name"
      />

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'center', marginHorizontal: 10, width: '80%'},
  input: {marginVertical: 5, height: 30},
});

RegisterForm.propTypes = {
  setFormToggle: PropTypes.func,
};

export default RegisterForm;
