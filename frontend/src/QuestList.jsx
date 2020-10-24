import { useState, useEffect } from "react"

import * as Ons from "react-onsenui"

import Quest from "./Quest"


function getQuests() {
    return fetch('/api/v1/quests.json').then(data => data.json())
}

function QuestList({ navigator }) {
    const [quests, setQuests] = useState([]);
    console.log(navigator)
    useEffect(() => {
        getQuests().then((response) => {
            setQuests(response.quests);
        })
    }, [])

    return (<Ons.Page

        renderToolbar={() =>
            <Ons.Toolbar>
                <div className="center">Today's quests</div>
            </Ons.Toolbar>}
    >
        {quests.map(quest => (
            <Ons.Card
                key={quest.id}
                onClick={() => {
                    navigator.pushPage({ view: Quest, quest });
                }}>
                <div className="title">{quest.title}<div style={{ "float": "right" }}><Ons.Icon icon={quest.icon} /></div></div>
                {quest.img && <div><img src={quest.img} style={{ width: "100%" }} /></div>}
            </Ons.Card>
        ))}
    </Ons.Page>);
}
export default QuestList;
