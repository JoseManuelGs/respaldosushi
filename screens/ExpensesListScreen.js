import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import ExpensesListScreen from './ExpensesListScreen';

const ExpenseModal = ({ visible, onClose, onSave, isDarkMode, onReset, expenses }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [showExpensesList, setShowExpensesList] = useState(false);

  const handleSave = () => {
    if (!amount || !description) {
      Alert.alert('Error', 'Por favor ingresa el monto y la descripción');
      return;
    }

    const newExpense = {
      id: Date.now(), // ID único
      amount: parseFloat(amount),
      description,
      date: new Date().toLocaleString()
    };

    onSave(newExpense);
    setAmount('');
    setDescription('');
    onClose();
  };

  const handleReset = () => {
    Alert.alert(
      'Confirmar Reinicio',
      '¿Estás seguro de que quieres eliminar todos los egresos? Esta acción no se puede deshacer.',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sí, Reiniciar',
          style: 'destructive',
          onPress: () => {
            onReset();
            Alert.alert('Éxito', 'Los egresos han sido reiniciados');
          }
        }
      ]
    );
  };

  const handleDeleteExpense = (id) => {
    Alert.alert(
      'Eliminar Egreso',
      '¿Estás seguro de que quieres eliminar este egreso?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const updatedExpenses = expenses.filter(expense => expense.id !== id);
            onReset(updatedExpenses);
          }
        }
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        {showExpensesList ? (
          <View style={[styles.listContainer, isDarkMode && styles.darkListContainer]}>
            <ExpensesListScreen
              expenses={expenses}
              onDeleteExpense={handleDeleteExpense}
              isDarkMode={isDarkMode}
            />
            <TouchableOpacity
              style={[styles.backButton, isDarkMode && styles.darkBackButton]}
              onPress={() => setShowExpensesList(false)}
            >
              <Text style={styles.backButtonText}>Volver</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.modalContent, isDarkMode && styles.darkModalContent]}>
            <Text style={[styles.modalTitle, isDarkMode && styles.darkModalTitle]}>
              Registrar Egreso
            </Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              placeholder="Monto"
              placeholderTextColor={isDarkMode ? '#999' : '#666'}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              placeholder="Descripción"
              placeholderTextColor={isDarkMode ? '#999' : '#666'}
              value={description}
              onChangeText={setDescription}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: 'green' }]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: 'red' }]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.listButton]}
              onPress={() => setShowExpensesList(true)}
            >
              <Text style={styles.listButtonText}>Ver Lista de Egresos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.resetButton]}
              onPress={handleReset}
            >
              <Text style={styles.resetButtonText}>Reiniciar Egresos</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#f7f7f7',
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  darkModalContent: {
    backgroundColor: '#333',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  darkListContainer: {
    backgroundColor: '#222',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
  },
  darkModalTitle: {
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  darkInput: {
    backgroundColor: '#444',
    borderColor: '#666',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  listButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resetButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#ff6b6b',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    margin: 20,
    padding: 12,
    backgroundColor: '#3498db',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  darkBackButton: {
    backgroundColor: '#2980b9',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ExpenseModal;