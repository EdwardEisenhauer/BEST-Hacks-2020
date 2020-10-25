import { useState, useEffect } from "react";
import * as Ons from "react-onsenui"

import './App.css';

import QuestsTab from "./QuestsTab"
import FeedTab from "./FeedTab"
import LeaderboardTab from "./LeaderboardTab"
import Auth, { UserContext } from "./Auth"


function App() {
    const [tabbarIndex, setTabbarIndex] = useState(0);
    const [user, setUser] = useState(null);
    const [checkingLogin, setCheckingLogin] = useState(true)


    useEffect(() => {
        if (user == null) fetch("/api/user/me").then((response) => {

            if (response.status == 200) {
                response.json().then(({ user }) => {
                    setUser(user)
                    setCheckingLogin(false)
                })
            } else {
                setCheckingLogin(false)
            }
        })
    }, [user])


    return (
        user != null
            ? <UserContext.Provider value={user}><Ons.Tabbar
                onPreChange={(hmm) => console.log(hmm) || setTabbarIndex(hmm.index)}
                index={tabbarIndex}
                position='bottom'
                renderTabs={(activeIndex, tabbar) => [
                    {
                        content: <QuestsTab />,
                        tab: <Ons.Tab label="Zadania" icon="md-check-all" />
                    },

                    {
                        content: <FeedTab />,
                        tab: <Ons.Tab label="Aktywność" icon="md-accounts-alt" />
                    }, {
                        content: <LeaderboardTab />,
                        tab: <Ons.Tab label="Ranking" icon="md-globe" />
                    },

                    {
                        content: <Ons.Page><h1 onClick={() => { fetch('/api/access/logout').then(() => setUser(null)) }}>kek</h1></Ons.Page>,
                        tab: <Ons.Tab label="Ustawienia" icon="md-settings" />
                    }
                ]} /></UserContext.Provider>
            : (checkingLogin ? null : <Auth setUser={setUser} />)
    );
}

export default App;
