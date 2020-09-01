import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

export default class Onboarding extends React.Component {
    
    static navigationOptions = {
    header: null,
    };
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <ImageBackground
            source={{ uri:'https://images.unsplash.com/photo-1505995433366-e12047f3f144?fit=crop&w=840&q=80' }}
            style={{ height: height, width: width, marginTop: '-55%', zIndex: 1 }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block>
              <Block>
                <Text color="white" size={60}>Aladinoo</Text>
              </Block>
              <Block row>
                <Text color="white" size={60}>Group</Text>
              </Block>
              <Text size={16} color='rgba(255,255,255,0.6)'>
                Official Aladinoo Group Mobile App.
              </Text>
            </Block>
            <Block center>
              <Button
                shadowless
                style={styles.button}
                onPress={() => this.props.navigation.navigate('Login')}>
                GET STARTED
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    backgroundColor: '#9C26B0',
  },
});