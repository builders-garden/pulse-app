import React, {useContext} from 'react';
import {Button, Text, View} from 'react-native';
import {AuthContext} from '../../../contexts/auth/Auth.context';

function SignInScreen() {
  const authContext = useContext(AuthContext);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Sign in Screen</Text>
      <Button
        title="Go to Feed"
        onPress={() =>
          authContext.signIn({
            token: 'example',
          })
        }
      />
    </View>
  );
}

export default SignInScreen;
