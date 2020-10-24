import {useState} from "react";
import * as Ons from "react-onsenui"

import './App.css';

import QuestList from "./QuestList"


function App() {
    const [route, setRoute] = useState({view: QuestList, title: "Your Quests"}); // TODO: change this into an enum
    const [tabbarIndex, setTabbarIndex] = useState(0);

    return (
        <Ons.Page renderToolbar={() =>
            <Ons.Toolbar>
                <div className="center">
                    {route.title}
                </div>
            </Ons.Toolbar>

        }>
            <Ons.Tabbar
                onPreChange={({index}) => setTabbarIndex(index)}
                index={tabbarIndex}
                position='bottom'
                renderTabs={(activeIndex, tabbar) => [
                    {
                        content: <Ons.Page><route.view setRoute={setRoute} route={route} /></Ons.Page >,
                        tab: <Ons.Tab label="Quests" icon="md-check-all" />
                    },

                    {
                        content: <Ons.Page><h1>kek</h1></Ons.Page>,
                        tab: <Ons.Tab label="Settings" icon="md-settings" />
                    }
                ]} />
        </Ons.Page>
    );
}

export default App;
