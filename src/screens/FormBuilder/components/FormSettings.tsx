// src/screens/FormBuilder/components/FormSettings.tsx

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';

interface FormSettingsProps {
  title: string;
  description: string;
  headerImage: string | null;
  onUpdateTitle: (title: string) => void;
  onUpdateDescription: (description: string) => void;
  onHeaderImagePick: () => void;
}

export const FormSettings: React.FC<FormSettingsProps> = ({
  title,
  description,
  headerImage,
  onUpdateTitle,
  onUpdateDescription,
  onHeaderImagePick,
}) => {
  return (
    <View style={styles.container}>
      <Input
        placeholder="Form Title"
        value={title}
        onChangeText={onUpdateTitle}
        label="Title"
        labelStyle={styles.label}
      />

      <Input
        placeholder="Form Description"
        value={description}
        onChangeText={onUpdateDescription}
        label="Description"
        multiline
        numberOfLines={3}
        labelStyle={styles.label}
      />

      {headerImage && (
        <Image source={{ uri: headerImage }} style={styles.headerImage} />
      )}

      <Button
        title={headerImage ? "Change Header Image" : "Add Header Image"}
        icon={<Ionicons name="image-outline" size={24} color="white" />}
        onPress={onHeaderImagePick}
        type="outline"
        containerStyle={styles.imageButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    color: '#666',
    fontSize: 14,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  imageButton: {
    marginTop: 8,
  },
});