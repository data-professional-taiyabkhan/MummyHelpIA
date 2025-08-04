import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { storage } from './src/services/api';

// Import screens
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import ChildDashboard from './src/screens/ChildDashboard';
import MotherDashboard from './src/screens/MotherDashboard';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { token, userData } = await storage.getAuthData();
      if (token && userData) {
        setIsAuthenticated(true);
        setUserRole(userData.role);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // You can add a splash screen here
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2c3e50',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          {!isAuthenticated ? (
            // Auth screens
            <>
              <Stack.Screen
                name="Signin"
                component={SigninScreen}
                options={{
                  title: 'Sign In',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{
                  title: 'Create Account',
                  headerShown: false,
                }}
              />
            </>
          ) : (
            // Dashboard screens based on user role
            <>
              {userRole === 'child' ? (
                <Stack.Screen
                  name="ChildDashboard"
                  component={ChildDashboard}
                  options={{
                    title: 'MummyHelp - Child',
                    headerShown: false,
                  }}
                />
              ) : (
                <Stack.Screen
                  name="MotherDashboard"
                  component={MotherDashboard}
                  options={{
                    title: 'MummyHelp - Parent',
                    headerShown: false,
                  }}
                />
              )}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App; 