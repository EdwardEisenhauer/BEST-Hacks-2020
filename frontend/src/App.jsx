import { useState } from "react";
import * as Ons from "react-onsenui"

import './App.css';

import QuestList from "./QuestList"


function App() {
    const [route, setRoute] = useState({ view: QuestList, title: "Your Quests" }); // TODO: change this into an enum
    return (
        <Ons.Page renderToolbar={() =>
            <Ons.Toolbar>
                <div className="center">
                    {route.title}
                </div>
            </Ons.Toolbar>

        }>
            <route.view route={route} setRoute={setRoute} />
        </Ons.Page>
    );
}

export default App;
