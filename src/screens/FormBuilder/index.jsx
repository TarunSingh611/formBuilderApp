// mobile/src/screens/FormBuilder/index.js  
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const FormBuilder = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [headerImage, setHeaderImage] = useState(null);
    const scrollViewRef = useRef(null);

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
        setQuestions(questions.filter((q) => q.id !== id));
    };

    const pickImage = async (questionId = null) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            if (questionId) {
                updateQuestion(questionId, { image: result.uri });
            } else {
                setHeaderImage(result.uri);
            }
        }
    };

    const renderQuestion = ({ item, drag, isActive }) => {
        return (
            <Animated.View
                style={[
                    styles.questionContainer,
                    {
                        opacity: isActive ? 0.5 : 1,
                        transform: [{
                            scale: isActive ? 0.95 : 1,
                        }],
                    },
                ]}
            >
                <TouchableOpacity onLongPress={drag} style={styles.dragHandle}>
                    <Ionicons name="menu" size={24} color="#666" />
                </TouchableOpacity>

                <View style={styles.questionContent}>
                    <TextInput
                        style={styles.questionInput}
                        value={item.question}
                        onChangeText={(text) => updateQuestion(item.id, { question: text })}
                        placeholder="Enter your question"
                    />

                    {item.image && (
                        <Image source={{ uri: item.image }} style={styles.questionImage} />
                    )}

                    <TouchableOpacity
                        style={styles.imageButton}
                        onPress={() => pickImage(item.id)}
                    >
                        <Ionicons name="image" size={24} color="#007AFF" />
                        <Text style={styles.imageButtonText}>
                            {item.image ? 'Change Image' : 'Add Image'}
                        </Text>
                    </TouchableOpacity>

                    {item.type === 'checkbox' && (
                        <View style={styles.optionsContainer}>
                            {item.options.map((option, index) => (
                                <View key={index} style={styles.optionRow}>
                                    <TextInput
                                        style={styles.optionInput}
                                        value={option}
                                        onChangeText={(text) => {
                                            const newOptions = [...item.options];
                                            newOptions[index] = text;
                                            updateQuestion(item.id, { options: newOptions });
                                        }}
                                        placeholder={`Option ${index + 1}`}
                                    />
                                    <TouchableOpacity
                                        onPress={() => {
                                            const newOptions = item.options.filter((_, i) => i !== index);
                                            updateQuestion(item.id, { options: newOptions });
                                        }}
                                    >
                                        <Ionicons name="close-circle" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <TouchableOpacity
                                style={styles.addOptionButton}
                                onPress={() => {
                                    const newOptions = [...item.options, `Option ${item.options.length + 1}`];
                                    updateQuestion(item.id, { options: newOptions });
                                }}
                            >
                                <Text style={styles.addOptionText}>Add Option</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => removeQuestion(item.id)}
                    >
                        <Ionicons name="trash" size={24} color="red" />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView ref={scrollViewRef}>
                <View style={styles.header}>
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Form Title"
                        value={formik.values.title}
                        onChangeText={formik.handleChange('title')}
                    />

                    {headerImage && (
                        <Image source={{ uri: headerImage }} style={styles.headerImage} />
                    )}

                    <TouchableOpacity
                        style={styles.headerImageButton}
                        onPress={() => pickImage()}
                    >
                        <Ionicons name="image" size={24} color="#007AFF" />
                        <Text style={styles.headerImageButtonText}>
                            {headerImage ? 'Change Header Image' : 'Add Header Image'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <DraggableFlatList
                    data={questions}
                    renderItem={renderQuestion}
                    keyExtractor={(item) => item.id}
                    onDragEnd={({ data }) => setQuestions(data)}
                />

                <View style={styles.addQuestionContainer}>
                    <TouchableOpacity
                        style={styles.addQuestionButton}
                        onPress={() => addQuestion('text')}
                    >
                        <Ionicons name="text" size={24} color="#fff" />
                        <Text style={styles.addQuestionButtonText}>Add Text Question</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.addQuestionButton}
                        onPress={() => addQuestion('grid')}
                    >
                        <Ionicons name="grid" size={24} color="#fff" />
                        <Text style={styles.addQuestionButtonText}>Add Grid Question</Text>
                    </TouchableOpacity>

          // mobile/src/screens/FormBuilder/index.js (continued)
                    <TouchableOpacity
                        style={styles.addQuestionButton}
                        onPress={() => addQuestion('checkbox')}
                    >
                        <Ionicons name="checkbox" size={24} color="#fff" />
                        <Text style={styles.addQuestionButtonText}>Add Checkbox Question</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={formik.handleSubmit}
                >
                    <Text style={styles.submitButtonText}>Create Form</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    headerImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    headerImageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    questionContainer: {
        backgroundColor: '#fff',
        margin: 10,
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dragHandle: {
        padding: 10,
        alignItems: 'center',
    },
    questionContent: {
        flex: 1,
    },
    questionInput: {
        fontSize: 16,
        marginBottom: 10,
    },
    questionImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
    },
    optionsContainer: {
        marginTop: 10,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    optionInput: {
        flex: 1,
        marginRight: 10,
        padding: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
    },
    addOptionButton: {
        padding: 10,
        backgroundColor: '#e3e3e3',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FormBuilder;  