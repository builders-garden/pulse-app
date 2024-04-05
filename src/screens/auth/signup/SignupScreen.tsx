import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Button, Text, View} from 'react-native';

interface SignupScreenProps {
  navigation: NavigationProp<any>;
}

function SignupScreen({navigation}: SignupScreenProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Login Screen</Text>
      <Button title="Go to Feed" onPress={() => navigation.navigate('Feed')} />
    </View>
  );
}

export default SignupScreen;
