import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadUrl} from '../utils/variables';

const ListItem = ({navigation, singleMedia}) => {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        navigation.navigate('Single', {file: singleMedia});
      }}
    >
      <View style={styles.imagebox}>
        <Image
          source={{uri: uploadUrl + singleMedia.thumbnails.w160}}
          style={styles.image}
        />
      </View>
      <View style={styles.textbox}>
        <Text style={styles.listTitle}>{singleMedia.title}</Text>
        <Text style={styles.content}>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'dimgray',
    borderRadius: 6,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  imagebox: {
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
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default ListItem;
