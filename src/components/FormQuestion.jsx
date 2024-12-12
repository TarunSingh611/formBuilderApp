// src/components/FormQuestion/index.jsx

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import { CheckBox, Button } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const FormQuestion = ({
    question,
    onUpdate,
    onDelete,
    isPreview = false,
    onImagePick,
}) => {
    const [showOptions, setShowOptions] = useState(false);

    const handleImagePick = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets[0].uri) {
                onImagePick(question.id, result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to pick image');
        }
    };

    const renderQuestionInput = () => {
        switch (question.type.toLowerCase()) {
            case 'text':
                return (
                    <TextInput
                        style={styles.textInput}
                        value={question.value}
                        onChangeText={(text) => onUpdate(question.id, { value: text })}
                        placeholder="Enter your answer"
                        multiline
                        editable={isPreview}
                    />
                );

            case 'checkbox':
                return (
                    <View style={styles.optionsContainer}>
                        {question.options?.map((option, index) => (
                            <View key={index} style={styles.optionRow}>
                                <CheckBox
                                    checked={question.value?.includes(option)}
                                    onPress={() => {
                                        if (!isPreview) return;
                                        const currentValues = question.value || [];
                                        const newValues = currentValues.includes(option)
                                            ? currentValues.filter(v => v !== option)
                                            : [...currentValues, option];
                                        onUpdate(question.id, { value: newValues });
                                    }}
                                    title={option}
                                    containerStyle={styles.checkboxContainer}
                                />
                                {!isPreview && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            const newOptions = question.options.filter((_, i) => i !== index);
                                            onUpdate(question.id, { options: newOptions });
                                        }}
                                    >
                                        <Ionicons name="close-circle" size={24} color="#ff4444" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                        {!isPreview && (
                            <Button
                                title="Add Option"
                                type="outline"
                                icon={<Ionicons name="add" size={24} color="#2196F3" />}
                                onPress={() => {
                                    const newOptions = [...(question.options || []), `Option ${(question.options?.length || 0) + 1}`];
                                    onUpdate(question.id, { options: newOptions });
                                }}
                                containerStyle={styles.addOptionButton}
                            />
                        )}
                    </View>
                );

            case 'grid':
                return (
                    <View style={styles.gridContainer}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <TouchableOpacity
                                key={value}
                                style={[
                                    styles.gridItem,
                                    question.value === value && styles.gridItemSelected,
                                ]}
                                onPress={() => {
                                    if (!isPreview) return;
                                    onUpdate(question.id, { value });
                                }}
                                disabled={!isPreview}
                            >
                                <Text style={[
                                    styles.gridItemText,
                                    question.value === value && styles.gridItemTextSelected
                                ]}>
                                    {value}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput
                    style={styles.questionTitle}
                    value={question.question}
                    onChangeText={(text) => onUpdate(question.id, { question: text })}
                    placeholder="Enter question"
                    multiline
                    editable={!isPreview}
                />
                {!isPreview && (
                    <View style={styles.headerActions}>
                        <TouchableOpacity
                            style={styles.headerButton}
                            onPress={() => setShowOptions(!showOptions)}
                        >
                            <Ionicons name="settings-outline" size={24} color="#666" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.headerButton}
                            onPress={() => onDelete(question.id)}
                        >
                            <Ionicons name="trash-outline" size={24} color="#ff4444" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {showOptions && !isPreview && (
                <View style={styles.optionsPanel}>
                    <CheckBox
                        title="Required"
                        checked={question.required}
                        onPress={() => onUpdate(question.id, { required: !question.required })}
                        containerStyle={styles.checkboxOption}
                    />
                    <Button
                        title={question.image ? "Change Image" : "Add Image"}
                        type="outline"
                        icon={<Ionicons name="image-outline" size={24} color="#2196F3" />}
                        onPress={handleImagePick}
                        containerStyle={styles.imageButton}
                    />
                </View>
            )}

            {question.image && (
                <Image source={{ uri: question.image }} style={styles.questionImage} />
            )}

            {renderQuestionInput()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    questionTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        marginRight: 16,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerButton: {
        padding: 8,
        marginLeft: 8,
    },
    optionsPanel: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    checkboxOption: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        margin: 0,
        marginBottom: 8,
    },
    imageButton: {
        marginTop: 8,
    },
    questionImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        minHeight: 100,
        textAlignVertical: 'top',
    },
    optionsContainer: {
        marginTop: 8,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkboxContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        borderWidth: 0,
        margin: 0,
        padding: 0,
    },
    addOptionButton: {
        marginTop: 8,
    },
    gridContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    gridItem: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    gridItemSelected: {
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
    },
    gridItemText: {
        fontSize: 16,
        color: '#666',
    },
    gridItemTextSelected: {
        color: 'white',
    },
});

export default FormQuestion;