import React, {useContext} from 'react';
import {Button, Text, View} from 'react-native';
import {AuthContext} from '../../contexts/auth/Auth.context';

function ProfileScreen() {
  const authContext = useContext(AuthContext);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile Screen</Text>
      <Button title="Sign out" onPress={() => authContext.signOut()} />
    </View>
  );
}

export default ProfileScreen;
