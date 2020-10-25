import { useState, useEffect } from "react";
import * as Ons from "react-onsenui"

import './App.css';

import QuestsTab from "./QuestsTab"
import Feed from "./Feed"
import Auth from "./Auth"

function App() {
    const [tabbarIndex, setTabbarIndex] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (user == null) fetch("/api/user/me").then((response) => {
            if (response.status == 200) {
                response.json().then(({ user }) => console.log(user) || setUser(user))
            }
        })
    }, [user])


    return (
        user != null
            ? <Ons.Tabbar
                onPreChange={(hmm) => console.log(hmm) || setTabbarIndex(hmm.index)}
                index={tabbarIndex}
                position='bottom'
                renderTabs={(activeIndex, tabbar) => [
                    {
                        content: <QuestsTab />,
                        tab: <Ons.Tab label="Quests" icon="md-check-all" />
                    },

                    {
                        content: <Feed />,
                        tab: <Ons.Tab label="Feed" icon="md-accounts-alt" />
                    },

                    {
                        content: <Ons.Page><h1>kek</h1></Ons.Page>,
                        tab: <Ons.Tab label="Settings" icon="md-settings" />
                    }
                ]} />
            : <Auth setUser={setUser} />
    );
}

export default App;
