import Leaderboard from "./Leaderboard"

import * as Ons from "react-onsenui"

function LeaderboardTab() {
    return <Ons.Navigator
        renderPage={
            (route, navigator) => {
                console.log("rendering in LeaderboardTab", route)
                return <route.view
                    route={route}
                    navigator={navigator}
                />
            }
        }
        initialRoute={{
            view: Leaderboard
        }} />
}

export default LeaderboardTab;
