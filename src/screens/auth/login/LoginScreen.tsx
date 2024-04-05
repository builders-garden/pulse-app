import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Button, Text, View} from 'react-native';

interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

function LoginScreen({navigation}: LoginScreenProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Login Screen</Text>
      <Button title="Go to Feed" onPress={() => navigation.navigate('Feed')} />
    </View>
  );
}

export default LoginScreen;
