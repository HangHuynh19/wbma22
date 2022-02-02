import React, {useContext, useState} from 'react';
import {ScrollView, Text, StyleSheet, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import {TextInput, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Upload = ({navigation}) => {
  const [image, setImage] = useState('https://place-hold.it/300&text=Image');
  const [type, setType] = useState('');
  const [imageSelected, setImageSelected] = useState(false);
  const {postMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImageSelected(true);
      setType(result.type);
    }
  };

  const onSubmit = async (data) => {
    if (!imageSelected) {
      Alert.alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);

    const filename = image.split('/').pop();
    let fileExtension = filename.split('.').pop();

    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;

    formData.append('file', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtension,
    });

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postMedia(formData, token);
      console.log('upload response', response);
      Alert.alert('File', 'uploaded', [
        {
          text: 'OK',
          onPress: () => {
            setUpdate(update + 1);
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.log('onSubmit upload image problem');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Card>
          <Card.Image
            source={{uri: image}}
            style={styles.image}
            onPress={pickImage}
          ></Card.Image>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                placeholder="title"
              />
            )}
            name="title"
          />

          {errors.title && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                placeholder="description"
              />
            )}
            name="description"
          />
          {errors.description && <Text>This is required.</Text>}

          <Button mode="contained" onPress={pickImage}>
            Choose Image
          </Button>
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Upload
          </Button>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 5,
    resizeMode: 'contain',
  },
});

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
