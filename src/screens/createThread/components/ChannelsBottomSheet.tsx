import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import React, {createRef, useCallback} from 'react';
import {StyleSheet, Text} from 'react-native';

type ChannelsBottomSheet = {};

function ChannelsBottomSheet({}: ChannelsBottomSheet) {
  // ref
  const bottomSheetRef = createRef<BottomSheet>();

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheet
      snapPoints={['60%']}
      index={-1}
      enablePanDownToClose
      ref={bottomSheetRef}
      onChange={handleSheetChanges}>
      <BottomSheetView style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ChannelsBottomSheet;
