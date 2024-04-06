import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'react-native-image-picker'; // Import image picker library


const UserAccountScreen = ({ navigation }) => {
  const [profilePicture, setProfilePicture] = useState(null);

  // Function to handle selecting an image from gallery
  const handleSelectImage = () => {
    const options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setProfilePicture(source);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <TouchableOpacity onPress={handleSelectImage}>
          {profilePicture ? (
            <Image source={profilePicture} style={styles.profilePicture} />
          ) : (
            <View style={styles.emptyProfilePicture} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        {/* Display username and bookmarks count */}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Go to Bookmarks" onPress={() => navigation.navigate('Bookmarks')} />
        <Button title="Log out" onPress={() => navigation.navigate('LoginSignup')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  banner: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  emptyProfilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  userInfo: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default UserAccountScreen;
