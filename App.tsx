import React, { useState } from "react";
import { Text, Button } from "react-native";
import { Center } from "./src/assets/formatted";

export default function App() {
  const [state, setState] = useState(false);

  return (
    <Center>
      <Text style={{ paddingBottom: 30 }}>Welcome to the app.</Text>

      {state ? <Text>Not here</Text> : <Text>Here!</Text>}

      <Button onPress={() => setState((s) => !s)} title="Press me!" />
    </Center>
  );
}
