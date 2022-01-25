
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Todo from './components/Todo';
import About from './components/About';
import { NativeBaseProvider } from 'native-base'
import MainLayout from './components/layout/MainLayout';
import Sidebar from './components/common/SideBar';
import { AntDesign } from '@expo/vector-icons'
import { LogBox} from 'react-native';

const Drawer = createDrawerNavigator()
export default function App() {

  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ]);
  
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />} screenOptions={{
          headerShown: false,
          drawerLabelStyle: {
            fontSize: 16,
            marginLeft: -10
          },
          drawerActiveBackgroundColor: '#40514E',
          drawerActiveTintColor: '#F5F5F5',
          drawerType: 'back'
        }} initialRouteName='Todo'>
          <Drawer.Screen name='Todo' options={{
            drawerIcon: ({ size, color }) => {
              return <AntDesign name="edit" size={size} color={color} />
            }
          }} children={({ route, navigation }) => {
            return (
              <MainLayout route={route} navigation={navigation}>
                <Todo />
              </MainLayout>
            )
          }} />
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => {
              return <AntDesign name="ellipsis1" size={size} color={color} />
            }
          }} name='About' children={({ route, navigation }) => {
            return (
              <MainLayout route={route} navigation={navigation}>
                <About />
              </MainLayout>
            )
          }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

