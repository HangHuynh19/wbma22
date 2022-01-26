import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {uploadUrl} from '../utils/variables';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

const Single = ({route}) => {
  const {file} = route.params;
  return (
    <SafeAreaView style={{marginTop: 100}}>
      <Card>
        <Card.Cover source={{uri: uploadUrl + file.filename}} />
        <Card.Content>
          <Title>{file.title}</Title>
          <Paragraph>{file.description}</Paragraph>
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
