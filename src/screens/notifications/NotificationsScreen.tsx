import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import MyButton from '../../components/MyButton';
import {AuthContext} from '../../contexts/auth/Auth.context';

function NotificationsScreen() {
  const authContext = useContext(AuthContext);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Notifications Screen</Text>
      <MyButton title="Sign out" onPress={authContext.signOut} />
    </View>
  );
}

export default NotificationsScreen;
