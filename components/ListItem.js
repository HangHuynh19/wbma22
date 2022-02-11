import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {uploadUrl} from '../utils/variables';
import {Card, Title, Paragraph} from 'react-native-paper';
import {withTheme} from 'react-native-paper';
import {ButtonGroup} from 'react-native-elements';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';

const ListItem = ({navigation, singleMedia, myFilesOnly}) => {
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const doDelete = async () => {
    Alert.alert('Delete', 'This file will be deleted permanently.', [
      {text: 'Cancel'},
      {
        text: 'OK',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(singleMedia.file_id, token);
            response && setUpdate(update + 1);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  return (
    <Card
      style={styles.row}
      onPress={() => {
        navigation.navigate('Single', {file: singleMedia});
      }}
    >
      <Card.Cover source={{uri: uploadUrl + singleMedia.thumbnails.w160}} />
      <Card.Content>
        <Title>{singleMedia.title}</Title>
        <Paragraph>{singleMedia.description}</Paragraph>
        {myFilesOnly && (
          <ButtonGroup
            onPress={(index) => {
              if (index === 0) {
                navigation.navigate('Modify', {file: singleMedia});
              } else {
                doDelete();
              }
            }}
            buttons={['Modify', 'Delete']}
            rounded
          />
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF9FB',
    borderRadius: 6,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  /* imagebox: {
    flex: 2,
  },
  image: {
    flex: 1,
    borderRadius: 6,
    borderBottomLeftRadius: 40,
  },
  textbox: {
    flex: 3,
    padding: 10,
  },
  listTitle: {
    fontWeight: '900',
    fontSize: 20,
    paddingBottom: 15,
    color: 'lightgrey',
    fontFamily: 'Courier New',
  },
  content: {
    color: 'lightgrey',
    fontSize: 16,
    fontFamily: 'Courier New',
    fontWeight: '700',
  }, */
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  myFilesOnly: PropTypes.bool,
};

export default withTheme(ListItem);
