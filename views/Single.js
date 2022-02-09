import React, {useRef} from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {uploadUrl} from '../utils/variables';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  List,
} from 'react-native-paper';
import {Video} from 'expo-av';
import {useFavorite, useTag, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {useEffect} from 'react';

const Single = ({route}) => {
  const {file} = route.params;
  const videoRef = useRef(null);
  const {getUserById} = useUser();
  const {postFavorite, getFavoriteByFileId, deleteFavorite} = useFavorite();
  const [owner, setOwner] = useState({username: 'fetching...'});
  const [avatar, setAvatar] = useState('http://placekitten.com/200/300');
  const {getFilesByTag} = useTag();
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);

  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(file.user_id, token);
      setOwner(userData);
    } catch (error) {
      console.error('fetch owner error', error.message);
      setOwner({username: '[not available]'});
    }
  };

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + file.user_id);
      if (avatarArray.length === 0) {
        return;
      }
      const avatar = avatarArray.pop();
      setAvatar(uploadUrl + avatar.filename);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchLikes = async () => {
    try {
      const likesData = await getFavoriteByFileId(file.user_id);
      setLikes(likesData);
    } catch (error) {
      console.error('fetchLikes error', error.message);
    }
  };

  const createFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await postFavorite(file.user_id, token);
    } catch (error) {
      console.error('createFavorite error', error);
      setOwner({username: '[not available]'});
    }
  };

  const removeFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await postFavorite(file.user_id, token);
    } catch (error) {
      console.error('removeFavorite error', error);
      setOwner({username: '[not available]'});
    }
  };

  useEffect(() => {
    fetchOwner();
    fetchAvatar();
    fetchLikes();
  }, []);

  return (
    <SafeAreaView style={{marginTop: 100}}>
      <Card>
        <Divider />
        {file.media_type === 'image' ? (
          <Card.Cover source={{uri: uploadUrl + file.filename}} />
        ) : (
          <Video
            ref={videoRef}
            style={styles.image}
            source={{
              uri: uploadUrl + file.filename,
            }}
            posterSource={{
              uri: uploadUrl + file.screenshot,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onError={(error) => {
              console.error('Video error', error);
            }}
          ></Video>
        )}
        <Card.Content>
          <Title>{file.title}</Title>
          <Paragraph>{file.description}</Paragraph>
          <List.Item
            title={owner.username}
            titleStyle={{fontSize: 14, fontWeight: '500'}}
            left={() => <Avatar.Image size={32} source={{uri: avatar}} />}
          />
          <Text>Likes count: {likes.length}</Text>
          <Button
            disabled={!userLike}
            onPress={() => {
              createFavorite();
              fetchLikes();
            }}
          >
            Like
          </Button>
          <Button
            disabled={userLike}
            onPress={() => {
              removeFavorite();
            }}
          >
            Dislike
          </Button>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    /* flex: 1, */
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: 40,
  },
  image: {
    width: '90%',
    height: '70%',
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
