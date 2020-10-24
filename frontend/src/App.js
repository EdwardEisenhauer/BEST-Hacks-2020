import {useState} from "react";

import './App.css';

import QuestList from "./QuestList.js"


function App() {
    const [route, setRoute] = useState({view: QuestList}); // TODO: change this into an enum
    return (
        <route.view route={route} setRoute={setRoute}/>
    );
}

export default App;
