import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { AddableListView } from '../../components/AddableListView';
import { BigText } from '../../components/formatted';
import { TouchableListItem } from '../../components/TouchableListItem';
import { RemindersParamList } from "../../navigation/RemindersStackRoute";

type ViewRemindersScreenProp = { navigation: StackNavigationProp<RemindersParamList, 'View'> }
export const ViewRemindersScreen: React.FC<ViewRemindersScreenProp> = ({ navigation }) => {
  let [l, setL] = React.useState<Array<[number, boolean]>>([[1, true], [2, false], [3, true]]);

  return (<AddableListView
    data={l}
    onAdd={() => setL([...l, [5, false]])}
    renderItem={
      ({ item, index }) => (
        <TouchableListItem
          onPress={() => setL([...l, item])}
        >
          <View style={styles.itemContainer}>
            <BigText>{item}</BigText>
            <Switch value={item[1]} />
          </View>
        </TouchableListItem>
      )
    } />);
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  }
})