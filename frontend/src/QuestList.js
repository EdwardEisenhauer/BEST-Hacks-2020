import { useState, useEffect } from "react"

function getQuest(id) {
    return fetch(`/api/v1/quests/${id}.json`).then(data=>data.json())
}

function QuestView({route}) {
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
    </div>
}

function getQuests() {
    return fetch('/api/v1/quests.json').then(data=>data.json())
}

function QuestList({setRoute}) {
    const [quests, setQuests] = useState([]);

    useEffect(() => {
        getQuests().then((response) => {
            setQuests(response.quests);
        })
    }, [])

    return (<ul>
        {quests.map(quest => (
            <li key={quest.id} onClick={()=>{setRoute({view: QuestView, quest});}}>{quest.title}</li>
        ))}
    </ul>);
}
export default QuestList;
