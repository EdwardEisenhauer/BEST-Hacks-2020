import { useState, useEffect, useContext } from "react"

import * as Ons from "react-onsenui"

import Quest from "./Quest"
import CardActions from "./CardActions"
import QuestMeta from "./QuestMeta"

import { useUser } from "./Auth"


function getQuests() {
    return fetch('/api/quests').then(data => data.json()).then(data => ({
        "quests": data.quests.sort(() => Math.random() - Math.random()).slice(0, 5)
    }))
}

function QuestList({ navigator }) {
    const user = useUser()
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
            <h1>Cześć, {user.name}!</h1>
            <h3 style={{ fontWeight: "bold" }}>Zadania na dziś:</h3>
        </div>


        {quests.map(quest => (
            <Ons.Card
                key={quest.id}
                onClick={() => {
                    navigator.pushPage({ view: Quest, quest });
                }}>
                <QuestMeta icon={quest.icon} category={quest.category} xp={15} />
                <div className="title">
                    {quest.title}
                </div>
                {quest.img && <div><img src={quest.img} style={{ width: "100%", borderRadius: 5 }} /></div>}
                <CardActions>
                    <a>Szczegóły</a>
                </CardActions>
            </Ons.Card>
        ))}
    </ Ons.Page>);
}
export default QuestList;
