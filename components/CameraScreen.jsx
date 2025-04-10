import React, { useRef, useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Camera from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';

export default function CameraScreen({ setCameraOpen }) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [type, setType] = useState('back');
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);

  if (!permission) {
    requestPermission();
    return (
      <View style={styles.center}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!mediaPermission) {
    requestMediaPermission();
    return (
      <View style={styles.center}>
        <Text>Requesting media library permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };

  const savePhoto = async () => {
    if (photoUri) {
      try {
        await MediaLibrary.saveToLibraryAsync(photoUri);
        Alert.alert('Saved', 'Photo has been saved to your gallery');
        setPhotoUri(null);
      } catch (err) {
        Alert.alert('Error', 'Failed to save photo');
        console.log(err);
      }
    }
  };

  return (
    <View className='flex-1 mt-[2.8rem]'>
      {/* Top Bar */}
      <View  className="flex h-[8vh] w-full flex-row justify-between overflow-hidden bg-[---b1]">
        <Pressable onPress={() => setCameraOpen(false)} className="h-[8vh]">
          <IconMaterialIcon name="arrow-back" size={30} color="white" className="m-4 shadow-lg" />
        </Pressable>
       <View className="items-center">
                   <Text className="absolute right-[9rem] top-[10px] text-[2rem] font-black text-white">
                     Camera
                   </Text>
        
      </View>
      </View>

      {/* Camera or Preview */}
      <View style={styles.cameraContainer}>
        {photoUri ? (
          <>
            <Image source={{ uri: photoUri }} style={styles.preview} />
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionButton} onPress={savePhoto}>
                <IconFeather name="save" size={28} color="#fff" />
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => setPhotoUri(null)}>
                <IconFeather name="x" size={28} color="#fff" />
                <Text style={styles.buttonText}>Retake</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Camera.CameraView ref={cameraRef} facing={type} style={styles.camera} />
            {/* Flip & Shutter */}
            <View style={styles.controls}>
              <TouchableOpacity
                onPress={() => setType((prev) => (prev === 'back' ? 'front' : 'back'))}>
                <IconMaterialIcon name="flip-camera-android" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={takePhoto} style={styles.shutterButton} />
              <View style={{ width: 30 }} /> 
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  shutterButton: {
    width: 70,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#999',
  },
  preview: {
    flex: 1,
    resizeMode: 'cover',
  },
  actionRow: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#000000aa',
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    marginTop: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
