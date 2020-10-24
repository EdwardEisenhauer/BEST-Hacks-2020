import QuestList from "./QuestList"

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
