import {useState} from "react";
import * as Ons from "react-onsenui"

import './App.css';

import QuestsTab from "./QuestsTab"


function App() {
    const [tabbarIndex, setTabbarIndex] = useState(0);


    return (
        <Ons.Tabbar
            onPreChange={(hmm) => console.log(hmm) || setTabbarIndex(hmm.index)}
            index={tabbarIndex}
            position='bottom'
            renderTabs={(activeIndex, tabbar) => [
                {
                    content: <QuestsTab />,
                    tab: <Ons.Tab label="Quests" icon="md-check-all" />
                },

                {
                    content: <Ons.Page><h1>kek</h1></Ons.Page>,
                    tab: <Ons.Tab label="Settings" icon="md-settings" />
                }
            ]} />
    );
}

export default App;
