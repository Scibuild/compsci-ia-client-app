import React from 'react';
import { AuthContext, AuthProvider } from './AuthProvider';
import { View } from 'react-native';
import Routes from '../navigation/Routes';

export const Providers = ({}) => {
    return (
        <AuthProvider>
            <View>
                <Routes />
            </View>
        </AuthProvider>
    );
}
