import * as React from 'react';
import { View } from "react-native";

export default Center = ({children}) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center'
        }}>
            {children}
        </View>
        
    )
}