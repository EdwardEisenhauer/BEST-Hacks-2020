import QuestList from "./QuestList"
import Feed from "./Feed"
import User from "./User"

import * as Ons from "react-onsenui"

function QuestsTab() {
    return <Ons.Navigator
        renderPage={
            (route, navigator) => {
                console.log("rendering", route.view)
                return <route.view
                    route={route}
                    navigator={navigator}
                />
            }
        }
        initialRoute={{
            view: QuestList
        }} />
}

export default QuestsTab;
