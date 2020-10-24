import {useState, useEffect} from "react"

import * as Ons from "react-onsenui";

function getQuest(id) {
    return fetch(`/api/v1/quests/${id}.json`).then(data => data.json())
}

function QuestView({route, navigator}) {
    const quest = route.quest;
    const [questDetails, setQuestDetails] = useState(null);
    console.log("QV", route)

    useEffect(() => {
        getQuest(quest.id).then(response => {
            setQuestDetails(response.quest)
        });
    }, [quest.id])

    return <Ons.Page>
        <h1>{quest.title}</h1>
        {questDetails === null ? <h3>Loading...</h3> : (
            <p>{questDetails.instruction}</p>
        )}
        <a onClick={() => {navigator.popPage()}}>Back</a>
    </Ons.Page>
}

function getQuests() {
    return fetch('/api/v1/quests.json').then(data => data.json())
}

function QuestList({navigator}) {
    const [quests, setQuests] = useState([]);
    console.log(navigator)
    useEffect(() => {
        getQuests().then((response) => {
            setQuests(response.quests);
        })
    }, [])

    return (<Ons.Page>
        {quests.map(quest => (
            <Ons.Card
                key={quest.id}
                onClick={() => {
                    navigator.pushPage({view: QuestView, title: "Quest", quest});
                }}>
                <div className="title">{quest.title}</div>
                {quest.img && <div><img src={quest.img} style={{width: "100%"}} /></div>}
            </Ons.Card>
        ))}
    </Ons.Page>);
}
export default QuestList;
