import { Colors } from '@/constants/Colors';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import { ModalType } from '../types/enums';
import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';

export default function Index() {
  const { top } = useSafeAreaInsets();
  const { showActionSheetWithOptions } = useActionSheet();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const openLink = () => {
    WebBrowser.openBrowserAsync('https://github.com/eliasg52');
  };

  const showModal = async (type: ModalType) => {
    handlePresentModalPress();
  };

  const openActionSheet = async () => {
    const options = ['View support docs', 'Contact us', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: `Can't log in or sing up?`,
      },
      (selectedIndex: number | undefined) => {
        switch (selectedIndex) {
          case 1:
            // Save
            console.log('1');
            break;

          case cancelButtonIndex:
            console.log('2');
          // Canceled
        }
      }
    );
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheetModal>
      <View
        style={[
          styles.containter,
          {
            paddingTop: top + 30,
          },
        ]}
      >
        <Image
          style={styles.image}
          source={require('@/assets/images/trello.png')}
        ></Image>
        <Text style={styles.introText}>
          Move teamwork forward - even on the go
        </Text>
        <Pressable
          style={[styles.button, { backgroundColor: 'white', width: '80%' }]}
          onPress={() => {
            showModal(ModalType.Login);
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: Colors.primary,
              fontSize: 17,
              fontWeight: '500',
            }}
          >
            Log in
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: Colors.primary,
              width: '80%',
              borderColor: Colors.fontLight,
              borderWidth: 1,
            },
          ]}
          onPress={() => {
            showModal(ModalType.SignUp);
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: Colors.fontLight,
              fontSize: 17,
              fontWeight: '500',
            }}
          >
            Sign up
          </Text>
        </Pressable>
        <Text style={styles.policyText}>By signing up, you agree to the </Text>
        <Text style={[styles.policyText, { marginBottom: 10 }]}>
          <Text onPress={openLink} style={{ textDecorationLine: 'underline' }}>
            User Notice
          </Text>{' '}
          and {''}
          <Text onPress={openLink} style={{ textDecorationLine: 'underline' }}>
            Privacy Policy
          </Text>
          .
        </Text>
        <Text
          onPress={openActionSheet}
          style={[styles.policyText, { textDecorationLine: 'underline' }]}
        >
          Can't log in or sign up?
        </Text>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  image: {
    height: 450,
    paddingHorizontal: 40,
    resizeMode: 'contain',
  },
  introText: {
    fontWeight: '600',
    color: 'white',
    fontSize: 17,
    padding: 30,
  },
  button: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  policyText: {
    color: Colors.fontLight,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
