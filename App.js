import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import SushiScreen from './screens/SushiScreen';
import BebidasScreen from './screens/BebidasScreen';
import HistorialScreen from './screens/HistorialScreen';
import AlitasScreen from './screens/AlitasScreen';
import RegistroScreen from './screens/RegistroScreen';
import SplashScreen from './screens/SplashScreen';
import ClientSelectionModal from './screens/ClientSelectionModal';
import SavedDaysModal from './screens/SavedDaysModal';
import PostresScreen from './screens/PostresScreen';
import InventarioScreen from './screens/InventarioScreen';
import ExpenseScreen from './ExpenseScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { 
  TouchableOpacity, 
  Image, 
  View, 
  Modal, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Alert, 
  Platform,
  TextInput 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator({ 
  isDarkMode, 
  toggleTheme,
  is3x2Active,
  toggle3x2, 
  history, 
  setHistory, 
  currentOrder, 
  addToCurrentOrder, 
  navigation, 
  registroInfo,
  setConfirmationModalVisible,
  expenses,
  handleResetExpenses,
  handleAddExpense,
  handleUpdateExpenses
}) {
  const showRegistroInfo = () => {
    if (registroInfo) {
      Alert.alert(
        "Información del Registro",
        `Cambio en caja: $${registroInfo.cashInBox}\nFecha: ${registroInfo.date}\nTrabajador: ${registroInfo.workerName}`,
        [{ text: "OK" }]
      );
    } else {
      Alert.alert(
        "Sin información",
        "No hay información de registro disponible",
        [{ text: "OK" }]
      );
    }
  };

  const appStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#fff',
    },
    text: {
      color: isDarkMode ? '#fff' : '#000',
    },
    tabBarStyle: {
      backgroundColor: 'red',
    },
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
    tabBarLabelStyle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#fff',
      paddingBottom: 2,
      textAlign: 'center',
    },
    tabBarActiveTintColor: '#fff',
    tabBarInactiveTintColor: '#000',
    tabBarItemStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 10,
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: appStyles.headerStyle,
          headerTintColor: appStyles.headerTintColor,
          tabBarStyle: appStyles.tabBarStyle,
          tabBarLabelStyle: appStyles.tabBarLabelStyle,
          tabBarActiveTintColor: appStyles.tabBarActiveTintColor,
          tabBarInactiveTintColor: appStyles.tabBarInactiveTintColor,
          tabBarItemStyle: appStyles.tabBarItemStyle,
          tabBarIcon: ({ focused }) => {
            let iconSource;

            if (route.name === 'Sushi') {
              iconSource = require('./screens/Sushi.png');
            } else if (route.name === 'Alitas') {
              iconSource = require('./screens/Alitasicon.png');
            } else if (route.name === 'Bebidas') {
              iconSource = require('./screens/Bebidas.png');
            } else if (route.name === 'Postres') {
              iconSource = require('./screens/Postre.png');
            } else if (route.name === 'Historial') {
              iconSource = require('./screens/Ventas.png');
            }

            return (
              <Image
                source={iconSource}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#fff' : '#000'
                }}
              />
            );
          },
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('Registro', { currentInfo: registroInfo })}
              style={{ marginLeft: 15 }}
            >
              <Image 
                source={require('./screens/LOGO.jpg')} 
                style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 20 }} 
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={toggle3x2} style={{ marginRight: 15 }}>
                <View style={[styles.promoButton, is3x2Active && styles.promoButtonActive]}>
                  <Text style={styles.promoButtonText}>3x2</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => navigation.navigate('ExpenseScreen')} 
                style={{ marginRight: 15 }}
              >
                <View style={styles.expenseButton}>
                  <Text style={styles.promoButtonText}>Egresos</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={showRegistroInfo} style={{ marginRight: 15 }}>
                <Icon name="information-circle" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
                <Icon name={isDarkMode ? 'moon' : 'sunny'} size={30} color="black" />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: () => null,
        })}
      >
        <Tab.Screen
          name="Sushi"
          children={() => (
            <SushiScreen 
              isDarkMode={isDarkMode} 
              setHistory={setHistory} 
              addToCurrentOrder={addToCurrentOrder}
              is3x2Active={is3x2Active}
            />
          )}
        />
        <Tab.Screen
          name="Alitas"
          children={() => (
            <AlitasScreen 
              isDarkMode={isDarkMode} 
              setHistory={setHistory} 
              addToCurrentOrder={addToCurrentOrder}
            />
          )}
        />
        <Tab.Screen
          name="Bebidas"
          children={() => (
            <BebidasScreen 
              isDarkMode={isDarkMode} 
              setHistory={setHistory} 
              addToCurrentOrder={addToCurrentOrder}
            />
          )}
        />
        <Tab.Screen
          name="Postres"
          children={() => (
            <PostresScreen 
              isDarkMode={isDarkMode} 
              setHistory={setHistory} 
              addToCurrentOrder={addToCurrentOrder}
            />
          )}
        />
        <Tab.Screen
          name="Historial"
          children={() => (
            <HistorialScreen 
              isDarkMode={isDarkMode} 
              history={history} 
              onUpdateHistory={setHistory}
              registro={registroInfo}
              expenses={expenses}
              navigation={navigation}
              handleResetExpenses={handleResetExpenses}
            />
          )}
        />
      </Tab.Navigator>

      {currentOrder.length > 0 && (
        <TouchableOpacity
          style={[styles.orderButton, isDarkMode && styles.darkFloatingButton]}
          onPress={() => setConfirmationModalVisible(true)}
        >
          <Text style={styles.floatingButtonText}>
            Confirmar Pedido ({currentOrder.length})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function MainApp() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [is3x2Active, setIs3x2Active] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentOrder, setCurrentOrder] = useState([]);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [clientSelectionVisible, setClientSelectionVisible] = useState(false);
  const [registroInfo, setRegistroInfo] = useState(null);
  const [clients, setClients] = useState([]);
  const [savedDays, setSavedDays] = useState([]);
  const [savedDaysModalVisible, setSavedDaysModalVisible] = useState(false);
  const [expenses, setExpenses] = useState([]);
  
  const navigation = useNavigation();

  useEffect(() => {
    loadDarkModePreference();
    loadSavedDays();
    loadExpenses();
    loadHistory();
  }, []);

  const loadDarkModePreference = async () => {
    try {
      const savedDarkMode = await AsyncStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        setIsDarkMode(JSON.parse(savedDarkMode));
      }
    } catch (error) {
      console.error('Error loading dark mode preference:', error);
    }
  };

  const loadExpenses = async () => {
    try {
      const savedExpenses = await AsyncStorage.getItem('expenses');
      if (savedExpenses !== null) {
        setExpenses(JSON.parse(savedExpenses));
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  };

  const loadHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('history');
      if (savedHistory !== null) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const loadSavedDays = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedDays');
      if (saved) {
        setSavedDays(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved days:', error);
    }
  };

  const saveExpenses = async (newExpenses) => {
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(newExpenses));
    } catch (error) {
      console.error('Error saving expenses:', error);
    }
  };

  const saveHistory = async (newHistory) => {
    try {
      await AsyncStorage.setItem('history', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  const handleResetExpenses = async () => {
    setExpenses([]);
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify([]));
    } catch (error) {
      console.error('Error resetting expenses:', error);
    }
  };

  const handleAddExpense = (newExpense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  const handleUpdateExpenses = (updatedExpenses) => {
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  const handleExportDayReport = async (day) => {
    try {
      const dayOrders = history.filter(order => {
        const orderDate = new Date(order.time).toLocaleDateString();
        const selectedDate = new Date(day.date).toLocaleDateString();
        return orderDate === selectedDate;
      });

      const totalSales = dayOrders.reduce((sum, order) => sum + order.price, 0);
      const dayExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date).toLocaleDateString();
        const selectedDate = new Date(day.date).toLocaleDateString();
        return expenseDate === selectedDate;
      });
      const totalExpenses = dayExpenses.reduce((sum, expense) => sum + expense.amount, 0);

      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #333; text-align: center; }
              .summary { margin: 20px 0; padding: 10px; background: #f5f5f5; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h1>Reporte Diario - ${new Date(day.date).toLocaleDateString()}</h1>
            
            <div class="summary">
              <h2>Resumen</h2>
              <p>Ventas Totales: $${totalSales.toFixed(2)}</p>
              <p>Gastos Totales: $${totalExpenses.toFixed(2)}</p>
              <p>Balance Neto: $${(totalSales - totalExpenses).toFixed(2)}</p>
            </div>

            <h2>Órdenes</h2>
            <table>
              <tr>
                <th>Hora</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Precio</th>
              </tr>
              ${dayOrders.map(order => `
                <tr>
                  <td>${new Date(order.time).toLocaleTimeString()}</td>
                  <td>${order.clientName || 'N/A'}</td>
                  <td>${order.type} - ${order.name}</td>
                  <td>$${order.price.toFixed(2)}</td>
                </tr>
              `).join('')}
            </table>

            <h2>Gastos</h2>
            <table>
              <tr>
                <th>Hora</th>
                <th>Descripción</th>
                <th>Monto</th>
              </tr>
              ${dayExpenses.map(expense => `
                <tr>
                  <td>${new Date(expense.date).toLocaleTimeString()}</td>
                  <td>${expense.description}</td>
                  <td>$${expense.amount.toFixed(2)}</td>
                </tr>
              `).join('')}
            </table>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false
      });

      if (Platform.OS === 'ios') {
        await Sharing.shareAsync(uri);
      } else {
        const fileName = `reporte_${new Date(day.date).toLocaleDateString().replace(/\//g, '-')}.pdf`;
        const shareableUri = FileSystem.documentDirectory + fileName;
        await FileSystem.copyAsync({
          from: uri,
          to: shareableUri
        });
        await Sharing.shareAsync(shareableUri);
      }

    } catch (error) {
      console.error('Error generating report:', error);
      Alert.alert(
        'Error',
        'Hubo un error al generar el reporte. Por favor intenta de nuevo.'
      );
    }
  };

  const toggleTheme = async () => {
    try {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);
      await AsyncStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };

  const toggle3x2 = () => setIs3x2Active(!is3x2Active);

  const addToCurrentOrder = (item) => {
    setCurrentOrder(prevOrder => {
      const newOrder = [...prevOrder, {
        ...item,
        time: new Date().toLocaleString(),
        isPromotional: false
      }];

      if (is3x2Active && item.type === 'Sushi') {
        const sushiItems = newOrder.filter(i => i.type === 'Sushi');
        if (sushiItems.length % 3 === 0) {
          const lastSushiIndex = newOrder.length - 1;
          newOrder[lastSushiIndex] = {
            ...newOrder[lastSushiIndex],
            originalPrice: newOrder[lastSushiIndex].price,
            price: 0,
            isPromotional: true
          };
        }
      }

      return newOrder;
    });
  };

  const handleCreateNewClient = (name) => {
    const newClient = {
      id: Date.now(),
      name,
      orders: []
    };
    setClients(prevClients => [...prevClients, newClient]);
    finalizeOrder(newClient);
  };

  const handleSelectClient = (client) => {
    finalizeOrder(client);
  };

  const finalizeOrder = (client) => {
    const orderWithClientInfo = currentOrder.map(item => ({
      ...item,
      clientId: client.id,
      clientName: client.name,
      time: new Date().toLocaleString()
    }));

    const updatedHistory = [...history, ...orderWithClientInfo];
    setHistory(updatedHistory);
    saveHistory(updatedHistory);
    setCurrentOrder([]);
    setClientSelectionVisible(false);
    setConfirmationModalVisible(false);
  };

  const confirmOrder = () => {
    if (currentOrder.length > 0) {
      setConfirmationModalVisible(false);
      setTimeout(() => {
        setClientSelectionVisible(true);
      }, 300);
    }
  };

  const cancelOrder = () => {
    setCurrentOrder([]);
    setConfirmationModalVisible(false);
  };

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="MainTabs">
          {props => (
            <TabNavigator
              {...props}
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              is3x2Active={is3x2Active}
              toggle3x2={toggle3x2}
              history={history}
              setHistory={setHistory}
              currentOrder={currentOrder}
              addToCurrentOrder={addToCurrentOrder}
              registroInfo={registroInfo}
              setConfirmationModalVisible={setConfirmationModalVisible}
              expenses={expenses}
              handleResetExpenses={handleResetExpenses}
              handleAddExpense={handleAddExpense}
              handleUpdateExpenses={handleUpdateExpenses}
              navigation={navigation}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Registro">
          {props => (
            <RegistroScreen 
              {...props} 
              setRegistroInfo={setRegistroInfo} 
              isDarkMode={isDarkMode}
            />
          )}
        </Stack.Screen>
        <Stack.Screen 
          name="Inventario" 
          options={{ 
            title: 'Inventario',
            headerShown: true,
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
          }}
        >
          {props => (
            <InventarioScreen 
              {...props}
              isDarkMode={isDarkMode} 
              storageKey="inventoryItems1"
            />
          )}
        </Stack.Screen>
        <Stack.Screen 
          name="ExpenseScreen" 
          options={{ 
            title: 'Gestión de Egresos',
            headerShown: true,
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
          }}
        >
          {props => (
            <ExpenseScreen 
              isDarkMode={isDarkMode} 
              expenses={expenses} 
              onUpdateExpenses={setExpenses} 
              navigation={navigation}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>

      <Modal
        visible={confirmationModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setConfirmationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isDarkMode && styles.darkModalContent]}>
            <Text style={[styles.modalTitle, isDarkMode && styles.darkModalTitle]}>
              Confirmar Pedido
            </Text>
            <ScrollView style={styles.orderList}>
              {currentOrder.map((item, index) => (
                <Text key={index} style={[styles.modalDescription, isDarkMode && styles.darkModalDescription]}>
                  {item.type} - {item.name} - {item.isPromotional ? 'Promoción 3x2' : `$${item.price}`}
                </Text>
              ))}
            </ScrollView>
            <Text style={[styles.totalText, isDarkMode && styles.darkModalTitle]}>
              Total: ${currentOrder.reduce((sum, item) => sum + item.price, 0)}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmOrder}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={cancelOrder}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ClientSelectionModal
        visible={clientSelectionVisible}
        onClose={() => {
          setClientSelectionVisible(false);
          setConfirmationModalVisible(false);
        }}
        onSelectClient={handleSelectClient}
        onCreateNewClient={handleCreateNewClient}
        isDarkMode={isDarkMode}
        existingClients={clients}
      />

      <SavedDaysModal
        visible={savedDaysModalVisible}
        onClose={() => setSavedDaysModalVisible(false)}
        savedDays={savedDays}
        isDarkMode={isDarkMode}
        onExportDay={handleExportDayReport}
      />
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainApp />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  promoButton: {
    backgroundColor: '#ddd',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#666',
  },
  promoButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#2E7D32',
  },
  promoButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  expenseButton: {
    backgroundColor: '#ddd',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#666',
  },
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
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  darkModalDescription: {
    color: '#ddd',
  },
  orderList: {
    maxHeight: 300,
    width: '100%',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15,
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orderButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkFloatingButton: {
    backgroundColor: '#333',
  },
  floatingButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});