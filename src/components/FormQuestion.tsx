// src/components/FormQuestion/index.tsx

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Button, CheckBox } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Question } from '../type/form';

interface FormQuestionProps {
    question: Question;
    onUpdate: (id: string, updates: Partial<Question>) => void;
    onDelete: (id: string) => void;
    onDragStart?: () => void;
    isActive?: boolean;
    isPreview?: boolean;
}

const FormQuestion: React.FC<FormQuestionProps> = ({
    question,
    onUpdate,
    onDelete,
    onDragStart,
    isActive = false,
    isPreview = false,
}) => {
    const [showOptions, setShowOptions] = useState(false);

    const handleImagePick = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                onUpdate(question._id, { imageUrl: result.assets[0].uri });
            }
        } catch (error) {
            console.error('Failed to pick image:', error);
        }
    };

    const renderQuestionInput = () => {
        switch (question.type) {
            case 'text':
                return (
                    <View>
                        <TextInput
                            style={styles.textInput}
                            value={question.title}
                            onChangeText={(text) => onUpdate(question._id, { title: text })}
                            placeholder="Enter your question"
                            multiline
                            editable={!isPreview}
                        />
                        {!isPreview && (
                            <View style={styles.validationContainer}>
                                <TextInput
                                    style={styles.validationInput}
                                    placeholder="Min length"
                                    keyboardType="numeric"
                                    value={question.validation?.minLength?.toString()}
                                    onChangeText={(text) =>
                                        onUpdate(question._id, {
                                            validation: {
                                                ...question.validation,
                                                minLength: parseInt(text) || 0,
                                            },
                                        })
                                    }
                                />
                                <TextInput
                                    style={styles.validationInput}
                                    placeholder="Max length"
                                    keyboardType="numeric"
                                    value={question.validation?.maxLength?.toString()}
                                    onChangeText={(text) =>
                                        onUpdate(question._id, {
                                            validation: {
                                                ...question.validation,
                                                maxLength: parseInt(text) || undefined,
                                            },
                                        })
                                    }
                                />
                            </View>
                        )}
                    </View>
                );

            case 'checkbox':
                return (
                    <View style={styles.checkboxContainer}>
                        {question.options?.map((option, index) => (
                            <View key={index} style={styles.optionRow}>
                                <CheckBox
                                    checked={question.value?.includes(option)}
                                    onPress={() => {
                                        if (!isPreview) return;
                                        const currentValues = question.value || [];
                                        const newValues = currentValues.includes(option)
                                            ? currentValues.filter((v:any) => v !== option)
                                            : [...currentValues, option];
                                        onUpdate(question._id, { value: newValues });
                                    }}
                                    title={option}
                                    containerStyle={styles.checkbox}
                                />
                                {!isPreview && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            const newOptions = question.options!.filter((_, i) => i !== index);
                                            onUpdate(question._id, { options: newOptions });
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
                                    onUpdate(question._id, { options: newOptions });
                                }}
                                containerStyle={styles.addOptionButton}
                            />
                        )}
                    </View>
                );

            case 'grid':
                return (
                    <View style={styles.gridContainer}>
                        {question.gridOptions?.rows.map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.gridRow}>
                                <Text style={styles.gridLabel}>{row}</Text>
                                <View style={styles.gridOptions}>
                                    {question.gridOptions?.columns.map((col, colIndex) => (
                                        <TouchableOpacity
                                            key={colIndex}
                                            style={[
                                                styles.gridOption,
                                                question.value?.[row] === col && styles.gridOptionSelected,
                                            ]}
                                            onPress={() => {
                                                if (!isPreview) return;
                                                const newValue = { ...question.value };
                                                newValue[row] = col;
                                                onUpdate(question._id, { value: newValue });
                                            }}
                                            disabled={!isPreview}
                                        >
                                            <Text style={styles.gridOptionText}>{col}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <View style={[styles.container, isActive && styles.activeContainer]}>
            <View style={styles.header}>
                {!isPreview && (
                    <TouchableOpacity onPress={onDragStart}>
                        <Ionicons name="menu" size={24} color="#666" />
                    </TouchableOpacity>
                )}
                <Text style={styles.questionType}>{question.type.toUpperCase()}</Text>
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
                            onPress={() => onDelete(question._id)}
                        >
                            <Ionicons name="trash-outline" size={24} color="#ff4444" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {question.imageUrl && (
                <Image source={{ uri: question.imageUrl }} style={styles.questionImage} />
            )}

            {showOptions && !isPreview && (
                <View style={styles.optionsPanel}>
                    <CheckBox
                        title="Required"
                        checked={question.required}
                        onPress={() => onUpdate(question._id, { required: !question.required })}
                        containerStyle={styles.requiredCheckbox}
                    />
                    <Button
                        title={question.imageUrl ? "Change Image" : "Add Image"}
                        type="outline"
                        icon={<Ionicons name="image-outline" size={24} color="#2196F3" />}
                        onPress={handleImagePick}
                        containerStyle={styles.imageButton}
                    />
                </View>
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
    activeContainer: {
        transform: [{ scale: 0.98 }],
        opacity: 0.8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    questionType: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerButton: {
        padding: 8,
        marginLeft: 8,
    },
    questionImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
    optionsPanel: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    requiredCheckbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        margin: 0,
    },
    imageButton: {
        marginTop: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        minHeight: 100,
        textAlignVertical: 'top',
    },
    validationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        gap: 8,
    },
    validationInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
    },
    checkboxContainer: {
        marginTop: 8,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        margin: 0,
        padding: 0,
    },
    addOptionButton: {
        marginTop: 8,
    },
    gridContainer: {
        marginTop: 8,
    },
    gridRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    gridLabel: {
        width: 100,
        fontSize: 14,
        color: '#666',
    },
    gridOptions: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    gridOption: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: '#f0f0f0',
    },
    gridOptionSelected: {
        backgroundColor: '#2196F3',
    },
    gridOptionText: {
        fontSize: 12,
        color: '#666',
    },
});

export default FormQuestion;