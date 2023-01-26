import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const onHandlerChange = (text) => {
    setTask(text)
  }

  const onHandlerSubmit = () => {
    setTasks([
      ...tasks,
      {
        id: Math.random().toString(),
        value: task
      }
    ]);
    setTask('');
  }

  const onHandlerModal = (item) => {
    setIsModalVisible(!isModalVisible);
    setSelectedTask(item);

  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onHandlerModal(item)}>
      <Text style={styles.itemList} >{item.value}</Text>
    </TouchableOpacity>

  )
  const keyExtractor = (item) => item.id;

  const onHandlerCancel = () => {
    setIsModalVisible(!isModalVisible);
    setSelectedTask(null);
  }

  const onHandlerDelete = () => {
   setTasks((prevTaskList) => prevTaskList.filter((task)=> task.id !== selectedTask.id));
   setIsModalVisible(!isModalVisible);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Añade nueva tarea'
          textAlign='center'
          value={task}
          onChangeText={onHandlerChange}
          autoCapitalize='none'
        />
        <Button disabled={!task} title='Añadir' color='#071A60' onPress={onHandlerSubmit} />
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.listContainer}
      />
      <Modal visible={isModalVisible} animationType='slide'>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}> Detalle de la tarea </Text>
          <View style={styles.modalDetailContainer}>
            <Text style={styles.modalDetailMessage}>Quieres eliminar esta tarea?</Text>
            <Text style={styles.selectedTask}> {selectedTask?.value} </Text>
          </View>
          <View style={styles.modalButtonContainer}>
            <Button
              title='Volver'
              color='#309929'
              onPress={onHandlerCancel}
            />
            <Button
              title='Eliminar'
              color='#992929'
              onPress={onHandlerDelete}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    marginHorizontal: 20,
  },
  input: {
    width: '80%',
    borderBottomColor: '#895B06',
    borderBottomWidth: 3,
    height: 40,
    color: '#212121',
  },
  listContainer: {
    marginHorizontal: 20,
    marginTop: 30
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: "#318CE7",
    marginBottom: 10,
    borderRadius: 25
  },
  itemList: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingVertical: 20

  },
  modalTitle:{
     fontSize: 20,
     fontWeight: 'bold',
     marginBottom: 10,
  },
  modalDetailContainer:{
paddingVertical: 20,
  },
  modalDetailMessage:{
  fontSize: 18,
  color: '#212121'
  },
  selectedTask:{
    fontSize: 14,
    color: '#212121',
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center'
  },
  modalButtonContainer:{
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 30,
    borderRadius: 30,
  }
});
