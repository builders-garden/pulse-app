import React, {PropsWithChildren} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Drawer} from 'react-native-drawer-layout';
import ChatImg from '../assets/images/icons/chat.svg';
import {MyTheme} from '../theme';
interface MyDrawerProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const MyDrawer = ({
  isOpen,
  onOpen,
  onClose,
  children,
}: PropsWithChildren<MyDrawerProps>) => {
  const renderNavigationView = () => (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.followingBox}>
          <ChatImg width={24} height={24} color={MyTheme.primaryLight} />
          <Text style={styles.followingText}>FOLLOWING</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.headingText}>Favorites</Text>
          <View style={styles.sectionItemsCtn}>
            {/* Replace with your actual images */}
            {[1, 2, 3, 4].map(item => (
              <View style={styles.sectionItem} key={item}>
                <Image
                  source={{uri: 'https://picsum.photos/200/300'}}
                  style={styles.sectionItemImg}
                />
                <Text style={styles.sectionItemText}>Text</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.headingText}>Recent</Text>
          <View style={styles.sectionItemsCtn}>
            {/* Replace with your actual images */}
            {[1, 2, 3, 4].map(item => (
              <View style={styles.sectionItem} key={item}>
                <Image
                  source={{uri: 'https://picsum.photos/200/300'}}
                  style={styles.sectionItemImg}
                />
                <Text style={styles.sectionItemText}>Text</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.headingText}>All</Text>
          {[1, 2, 3, 4].map((item, index) => (
            <View
              style={[
                styles.sectionItemHorizontal,
                index < 3 && {marginBottom: 10},
              ]}
              key={item}>
              <Image
                source={{uri: 'https://picsum.photos/200/300'}}
                style={styles.sectionItemImg}
              />
              <Text style={styles.sectionItemHorizontalText}>Text</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );

  return (
    <Drawer
      renderDrawerContent={renderNavigationView}
      open={isOpen}
      swipeEnabled={false}
      onOpen={() => {
        onOpen && onOpen();
      }}
      onClose={() => {
        onClose && onClose();
      }}>
      {children}
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
  },
  followingBox: {
    backgroundColor: MyTheme.primaryLightOpacity,
    borderRadius: 4,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  followingText: {
    color: MyTheme.primaryLight,
    fontSize: 16,
    fontFamily: 'BeVietnamPro-Regular',
    marginLeft: 6,
  },
  section: {
    marginTop: 20,
  },
  headingText: {
    color: MyTheme.grey300,
    fontWeight: '600',
    fontFamily: 'BeVietnamPro-Regular',
    marginBottom: 10,
  },
  sectionItemsCtn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  sectionItem: {
    alignItems: 'center',
  },
  sectionItemImg: {width: 40, height: 40, borderRadius: 10},
  sectionItemText: {
    fontFamily: 'BeVietnamPro-Regular',
    fontSize: 14,
    marginTop: 5,
  },
  sectionItemHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionItemHorizontalText: {
    fontFamily: 'BeVietnamPro-Regular',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default MyDrawer;
