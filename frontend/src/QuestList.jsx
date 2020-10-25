import { useState, useEffect } from "react"

import * as Ons from "react-onsenui"

import Quest from "./Quest"


function getQuests() {
    return fetch('/api/v1/quests.json').then(data => data.json()).then(data => ({
        "quests": [
            data.quests[0],
            data.quests[10],
            data.quests[20],
            data.quests[30],
            data.quests[40],
        ]
    }))
}

function QuestList({ navigator }) {
    const [quests, setQuests] = useState([]);
    console.log(navigator)
    useEffect(() => {
        getQuests().then((response) => {
            setQuests(response.quests);
        })
    }, [])

    return (<Ons.Page renderToolbar={() =>
        <Ons.Toolbar>
            <div className="center">Environmental Quest</div>
        </Ons.Toolbar>
    }>
        <div style={{ paddingLeft: "1em", paddingRight: "1em", paddingTop: "1em", textAlign: "center" }}>
            <h1>Cześć, Stefan!</h1>
            <h3 style={{ fontWeight: "bold" }}>Zadania na dziś:</h3>
        </div>


        {quests.map(quest => (
            <Ons.Card
                key={quest.id}
                onClick={() => {
                    navigator.pushPage({ view: Quest, quest });
                }}>
                <div className="title" style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.2em" }}>
                    <div>{quest.title}</div><div style={{ paddingLeft: "0.2em" }}><Ons.Icon icon={quest.icon} /></div></div>
                {quest.img && <div><img src={quest.img} style={{ width: "100%", borderRadius: 5 }} /></div>}
                <div style={{ paddingTop: "0.7em", paddingRight: "0.5em", display: "flex", justifyContent: "flex-end", textTransform: "uppercase", color: "#3377ff", fontWeight: 600 }}>
                    <a>Szczegóły</a>
                </div>
            </Ons.Card>
        ))}
    </ Ons.Page>);
}
export default QuestList;
