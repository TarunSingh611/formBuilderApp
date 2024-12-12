// src/screens/FormBuilder/index.jsx

import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
    Animated,
    Alert,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card } from '@rneui/themed';
import { createForm } from '../redux/reducers/formSlice';

const FormBuilderSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
});

const FormBuilder = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [headerImage, setHeaderImage] = useState(null);
    const scrollViewRef = useRef(null);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: FormBuilderSchema,
        onSubmit: async (values) => {
            try {
                const formData = {
                    ...values,
                    headerImage,
                    questions,
                };
                await dispatch(createForm(formData)).unwrap();
                Alert.alert('Success', 'Form created successfully');
                navigation.goBack();
            } catch (error) {
                Alert.alert('Error', error.message || 'Failed to create form');
            }
        },
    });

    const pickImage = async (questionId = null) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            if (questionId) {
                updateQuestion(questionId, { image: result.assets[0].uri });
            } else {
                setHeaderImage(result.assets[0].uri);
            }
        }
    };

    const addQuestion = (type) => {
        const newQuestion = {
            id: Date.now().toString(),
            type,
            question: '',
            image: null,
            options: type === 'checkbox' ? ['Option 1'] : [],
            required: false,
        };

        setQuestions([...questions, newQuestion]);
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    const updateQuestion = (id, updates) => {
        setQuestions(
            questions.map((q) => (q.id === id ? { ...q, ...updates } : q))
        );
    };

    const removeQuestion = (id) => {
        Alert.alert(
            'Delete Question',
            'Are you sure you want to delete this question?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => setQuestions(questions.filter((q) => q.id !== id)),
                },
            ]
        );
    };

    const renderQuestionCard = ({ item, drag, isActive }) => (
        <Animated.View
            style={[
                styles.questionCard,
                {
                    opacity: isActive ? 0.7 : 1,
                    transform: [{
                        scale: isActive ? 0.95 : 1,
                    }],
                    elevation: isActive ? 8 : 4,
                },
            ]}
        >
            <Card>
                <TouchableOpacity onLongPress={drag} disabled={isActive}>
                    <View style={styles.questionHeader}>
                        <Ionicons name="menu" size={24} color="#666" />
                        <Text style={styles.questionType}>{item.type}</Text>
                        <TouchableOpacity onPress={() => removeQuestion(item.id)}>
                            <Ionicons name="trash-outline" size={24} color="#ff4444" />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={styles.questionInput}
                        value={item.question}
                        onChangeText={(text) => updateQuestion(item.id, { question: text })}
                        placeholder="Enter your question"
                        multiline
                    />

                    {item.image && (
                        <Image source={{ uri: item.image }} style={styles.questionImage} />
                    )}

                    <TouchableOpacity
                        style={styles.imageButton}
                        onPress={() => pickImage(item.id)}
                    >
                        <Ionicons name="image-outline" size={24} color="#2196F3" />
                        <Text style={styles.imageButtonText}>
                            {item.image ? 'Change Image' : 'Add Image'}
                        </Text>
                    </TouchableOpacity>

                    {renderQuestionOptions(item)}
                </TouchableOpacity>
            </Card>
        </Animated.View>
    );

    const renderQuestionOptions = (question) => {
        switch (question.type) {
            case 'checkbox':
                return (
                    <View style={styles.optionsContainer}>
                        {question.options.map((option, index) => (
                            <View key={index} style={styles.optionRow}>
                                <TextInput
                                    style={styles.optionInput}
                                    value={option}
                                    onChangeText={(text) => {
                                        const newOptions = [...question.options];
                                        newOptions[index] = text;
                                        updateQuestion(question.id, { options: newOptions });
                                    }}
                                    placeholder={`Option ${index + 1}`}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        const newOptions = question.options.filter((_, i) => i !== index);
                                        updateQuestion(question.id, { options: newOptions });
                                    }}
                                >
                                    <Ionicons name="close-circle" size={24} color="#ff4444" />
                                </TouchableOpacity>
                            </View>
                        ))}
                        <Button
                            title="Add Option"
                            type="outline"
                            onPress={() => {
                                const newOptions = [...question.options, `Option ${question.options.length + 1}`];
                                updateQuestion(question.id, { options: newOptions });
                            }}
                            icon={<Ionicons name="add" size={24} color="#2196F3" />}
                        />
                    </View>
                );
            case 'grid':
                return (
                    <View style={styles.gridContainer}>
                        <Text style={styles.gridLabel}>Grid Options</Text>
                        {/* Implement grid options UI */}
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView ref={scrollViewRef}>
                <Card containerStyle={styles.headerCard}>
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Form Title"
                        value={formik.values.title}
                        onChangeText={formik.handleChange('title')}
                        onBlur={formik.handleBlur('title')}
                    />
                    {formik.touched.title && formik.errors.title && (
                        <Text style={styles.errorText}>{formik.errors.title}</Text>
                    )}

                    <TextInput
                        style={styles.descriptionInput}
                        placeholder="Form Description (optional)"
                        value={formik.values.description}
                        onChangeText={formik.handleChange('description')}
                        multiline
                    />

                    {headerImage && (
                        <Image source={{ uri: headerImage }} style={styles.headerImage} />
                    )}

                    <Button
                        title={headerImage ? "Change Header Image" : "Add Header Image"}
                        icon={<Ionicons name="image-outline" size={24} color="white" />}
                        onPress={() => pickImage()}
                        type="outline"
                        containerStyle={styles.imageButton}
                    />
                </Card>

                <DraggableFlatList
                    data={questions}
                    renderItem={renderQuestionCard}
                    keyExtractor={(item) => item.id}
                    onDragEnd={({ data }) => setQuestions(data)}
                />

                <View style={styles.addQuestionSection}>
                    <Text style={styles.addQuestionTitle}>Add Question</Text>
                    <View style={styles.questionTypeButtons}>
                        {['Text', 'Checkbox', 'Grid'].map((type) => (
                            <Button
                                key={type}
                                title={type}
                                icon={<Ionicons name={getQuestionTypeIcon(type)} size={24} color="white" />}
                                onPress={() => addQuestion(type.toLowerCase())}
                                containerStyle={styles.questionTypeButton}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Preview"
                    icon={<Ionicons name="eye-outline" size={24} color="white" />}
                    onPress={() => navigation.navigate('FormPreview', { questions })}
                    containerStyle={styles.footerButton}
                />
                <Button
                    title="Save"
                    icon={<Ionicons name="save-outline" size={24} color="white" />}
                    onPress={formik.handleSubmit}
                    containerStyle={styles.footerButton}
                    loading={formik.isSubmitting}
                />
            </View>
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
    questionCard: {
        margin: 8,
        borderRadius: 12,
    },
    questionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    questionInput: {
        fontSize: 16,
        padding: 8,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        marginBottom: 16,
    },
    optionsContainer: {
        marginTop: 8,
        gap: 8,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    optionInput: {
        flex: 1,
        marginRight: 8,
        padding: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    addQuestionSection: {
        padding: 16,
        marginTop: 16,
    },
    questionTypeButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: 8,
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
    errorText: {
        color: '#ff4444',
        fontSize: 12,
        marginBottom: 8,
    },
});

export default FormBuilder;