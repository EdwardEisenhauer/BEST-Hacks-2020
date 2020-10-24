import { useState, useEffect } from "react"

import * as Ons from "react-onsenui";

function getQuest(id) {
    return fetch(`/api/v1/quests/${id}.json`).then(data => data.json())
}

function QuestView({ route, setRoute }) {   {/* TODO: delete this. Duplicate of Quest() */}
    const quest = route.quest;
    const [questDetails, setQuestDetails] = useState(null);

    useEffect(() => {
        getQuest(quest.id).then(response => {
            setQuestDetails(response.quest)
        });
    }, [quest.id])

    return <div>
        <h1>{quest.title}</h1>
        {questDetails === null ? <h3>Loading...</h3> : (
            <p>{questDetails.instruction}</p>
        )}
        <a onClick={() => { setRoute({ view: QuestList, title: "Today's Quests" }) }}>Back</a>
    </div>
}

function getQuests() {
    return fetch('/api/v1/quests.json').then(data => data.json())
}

function QuestList({ setRoute }) {
    const [quests, setQuests] = useState([]);

    useEffect(() => {
        getQuests().then((response) => {
            setQuests(response.quests);
        })
    }, [])

    return (<div>
        {quests.map(quest => (
            <Ons.Card
                key={quest.id}
                onClick={() => {
                    setRoute({ view: QuestView, title: "Quest", quest });
                }}>
                <div class="title">{quest.title}<div style={{"float": "right"}}><Ons.Icon icon={quest.icon}/></div></div>
                {quest.img && <div><img src={quest.img} style={{ width: "100%" }} /></div>}
            </Ons.Card>
        ))}
    </div>);
}
export default QuestList;
