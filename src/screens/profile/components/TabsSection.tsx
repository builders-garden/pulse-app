import React, {useState} from 'react';
import {View} from 'react-native';
import MyTabs from '../../../components/tabs/MyTabs';

// const FirstRoute = () => (
//   <View style={{backgroundColor: '#ff4081', width: '100%', height: 200}} />
// );

// const SecondRoute = () => (
//   <View style={{backgroundColor: '#673ab7', width: '100%', height: 100}} />
// );
// const ThirdRoute = () => (
//   <View style={{backgroundColor: '#00ff00', width: '100%', height: 100}} />
// );

function TabsSection() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <View style={{marginTop: 30}}>
      <MyTabs
        tabs={['Threads', 'Comments', 'About']}
        selectedTab={selectedTab}
        onPress={setSelectedTab}
      />
    </View>
  );
}

// const styles = StyleSheet.create({

// });

export default TabsSection;
