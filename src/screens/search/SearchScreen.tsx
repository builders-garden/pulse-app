import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MySearchField from '../../components/inputs/MySearchField';
import MyTabs from '../../components/tabs/MyTabs';
import {RootStackScreenProps} from '../../routing/types';

function SearchScreen({navigation}: RootStackScreenProps<'Search'>) {
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View>
          <MySearchField width={200} />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <MyTabs
        tabs={['Users', 'Channels']}
        selectedTab={selectedTab}
        onPress={setSelectedTab}
      />
    </View>
  );
}

export default SearchScreen;
