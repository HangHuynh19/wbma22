import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = (props) => {
  const {navigation} = props;

  return (
    <SafeAreaView style={styles.container}>
      <List navigation={navigation} style={styles.infoArea} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'darkgrey',
    height: '100%',
    paddingTop: 0,
  },
  infoArea: {
    flex: 1,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
