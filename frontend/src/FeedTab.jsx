import Feed from "./Feed"

import * as Ons from "react-onsenui"

function FeedTab() {
    return <Ons.Navigator
        renderPage={
            (route, navigator) => {
                console.log("rendering in FeedTab", route)
                return <route.view
                    route={route}
                    navigator={navigator}
                />
            }
        }
        initialRoute={{
            view: Feed
        }} />
}

export default FeedTab;
