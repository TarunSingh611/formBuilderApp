// src/screens/FormBuilder/FormEditor.tsx
import { launchImageLibrary } from 'react-native-image-picker';
import React, { useCallback, useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Alert,
    TextInput,
    Image,
} from 'react-native';
import { Button, Card, Text } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useFormBuilder } from '../../hooks/useFormBuilder';
import { FlatList, TouchableOpacity } from 'react-native';
import FormQuestion from '../../components/FormQuestion';
import { Question } from '../../type/form';

const FormEditor = ({ navigation }: any) => {
    const {
        form,
        updateForm,
        addQuestion,
        removeQuestion,
        updateQuestion,
        reorderQuestions,
        saveForm,
        loading,
    } = useFormBuilder();


const handlePickImage = async () => {
    try {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
        });

        if (result.didCancel) {
            console.log('User cancelled image picker');
            return;
        }

        if (result.assets && result.assets.length > 0) {
            const selectedImageUri = result.assets[0].uri;
            if (selectedImageUri) {
                updateForm({ headerImage: selectedImageUri });
            }
        } else {
            Alert.alert('Error', 'No image selected');
        }
    } catch (error) {
        console.error('Error picking image:', error);
        Alert.alert('Error', 'Something went wrong while picking the image');
    }
};

    
    const handleAddQuestion = useCallback((type: Question['type']) => {
        const newQuestion: Question = {
            _id: Date.now().toString(),
            type,
            title: '',
            required: false,
            options: type === 'checkbox' ? ['Option 1'] : [],
            gridOptions: type === 'grid' ? {
                rows: ['Row 1'],
                columns: ['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5']
            } : undefined,
            validation: {
                required: false,
            },
        };
        addQuestion(newQuestion);
    }, [addQuestion]);

    const handleQuestionDelete = useCallback((id: string) => {
        const index = form.questions.findIndex((q:any) => q._id === id);
        if (index !== -1) {
            removeQuestion(index);
        }
    }, [form.questions, removeQuestion]);

    const handleReorder = useCallback(({ data, from, to }: { data: Question[], from: number, to: number }) => {
        reorderQuestions(from, to);
    }, [reorderQuestions]);

    const renderQuestion = ({ item }: { item: Question }) => (
        <Card containerStyle={styles.questionCard}>
            <View style={styles.questionHeader}>
                <Text style={styles.questionTitle}>{item.title || 'Untitled Question'}</Text>
                <TouchableOpacity onPress={() => handleQuestionDelete(item._id)}>
                    <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
            </View>
            {/* <FormQuestion
                question={item}
                onUpdate={(id, updates) => updateQuestion(id, updates)}
                onDelete={(id) => handleQuestionDelete(id)}
                isPreview={false} // Change this to true if you want a preview mode
            /> */}
        </Card>
    );

    const handleSave = async () => {
        try {
            await saveForm();
            Alert.alert('Success', 'Form saved successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to save form');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Card containerStyle={styles.headerCard}>
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Form Title"
                        value={form.title}
                        onChangeText={(text) => updateForm({ title: text })}
                    />
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder="Form Description"
                        value={form.description}
                        onChangeText={(text) => updateForm({ description: text })}
                        multiline
                    />
                    {form.headerImage && (
                        <Image source={{ uri: form.headerImage }} style={styles.headerImage} />
                    )}
                    <Button
                        title={form.headerImage ? "Change Header Image" : "Add Header Image"}
                        icon={<Ionicons name="image-outline" size={24} color="white" />}
                        onPress={handlePickImage}
                        type="outline"
                        buttonStyle={styles.imageButtonStyle}
                        containerStyle={styles.imageButtonContainer}
                    />
                </Card>
                <FlatList
                    data={form.questions}
                    renderItem={renderQuestion}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.questionList}
                />
                <View style={styles.addQuestionSection}>
                    <Text style={styles.addQuestionTitle}>Add Question</Text>
                    <View style={styles.questionTypeButtons}>
                        {['Text', 'Checkbox', 'Grid'].map((type) => (
                            <Button
                                key={type}
                                title={type}
                                icon={<Ionicons name={getQuestionTypeIcon(type)} size={24} color="white" />}
                                onPress={() => handleAddQuestion(type.toLowerCase() as Question['type'])}
                                containerStyle={styles.questionTypeButtonContainer}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Preview"
                    icon={<Ionicons name="eye-outline" size={24} color="white" />}
                    onPress={() => navigation.navigate('FormPreview', { formId: form.id })}
                    containerStyle={styles.footerButton}
                />
                <Button
                    title="Save"
                    icon={<Ionicons name="save-outline" size={24} color="white" />}
                    onPress={handleSave}
                    containerStyle={styles.footerButton}
                    loading={loading}
                />
            </View>
            <Text>VIew</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerCard: {
        margin: 16,
        borderRadius: 12,
        elevation: 4,
    },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        padding: 8,
    },
    descriptionInput: {
        fontSize: 16,
        marginBottom: 16,
        padding: 8,
        minHeight: 60,
    },
    headerImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
    imageButtonStyle: {
        borderColor: '#2196F3',
    },
    imageButtonContainer: {
        marginTop: 8,
    },
    addQuestionSection: {
        padding: 16,
        marginTop: 16,
    },
    addQuestionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    questionTypeButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: 8,
    },
    questionTypeButtonContainer: {
        flex: 1,
        marginHorizontal: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    footerButton: {
        width: '45%',
    },
    questionList: {
        paddingHorizontal: 16,
    },
    questionCard: {
        marginBottom: 16,
        borderRadius: 8,
        elevation: 3,
    },
    questionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

const getQuestionTypeIcon = (type: string): keyof typeof Ionicons.glyphMap => {
    switch (type.toLowerCase()) {
        case 'text':
            return 'document-text-outline';
        case 'checkbox':
            return 'checkbox-outline';
        case 'grid':
            return 'grid-outline';
        default:
            return 'help-outline';
    }
};

export default FormEditor;