import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';


const Center = ({children}) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }} >
            {children}
        </View>)
}

export default function() {
    const [state, setState] = useState(false);
    

    return (
        <Center>
            <Text style={{paddingBottom: 30}}>
                Welcome to the app.
            </Text>
            
            {state ? <Text>Not here</Text> : <Text>Here!</Text>}

            <Button onPress={() => setState(s => !s)} title="Press me!" />
        </Center>
    )
}