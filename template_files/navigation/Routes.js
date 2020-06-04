import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, ActivityIndicator, AsyncStorage, Text} from 'react-native';

import useCachedResources from '../hooks/useCachedResources';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import Center from '../components/Center';
import LoginScreen from '../screens/LoginScreen';
import { AuthContext } from '../providers/AuthProvider';

const Stack = createStackNavigator();

export default function Routes(props) {
  const {user} = React.useContext(AuthContext);
  const hasCachedReources = useCachedResources();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    AsyncStorage.getItem('user').then(userString => {
      if (userString) {
        console.log(userString);
      }
      setLoading(false)
    }).catch(err => {
      console.error(err);
    });
  }, [])

  if (!hasCachedReources || true) {
    return (
      <Center>
        <ActivityIndicator size="large" />
        <Text>Loading</Text>
      </Center>
    )
  } 
  return (

    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <NavigationContainer linking={LinkingConfiguration}>
        { user ? <Text>You exist</Text> : 
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        </Stack.Navigator> }
      </NavigationContainer>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
