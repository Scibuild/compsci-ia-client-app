import { enableMapSet } from "immer";
import * as Notifications from 'expo-notifications';

// before the main component, should be for config sort of things
export function preinit(): void {
    // enables use of map data structure with immer
    enableMapSet();

    // setup notifications
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      })
    })

}
