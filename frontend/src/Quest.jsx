import * as Ons from "react-onsenui"

import { useState, useEffect } from "react"

import CardActions from "./CardActions"
import PostQuest from "./PostQuest"
import QuestMeta from "./QuestMeta"

function getQuest(id) {
    return fetch(`/api/v1/quests.json`).then(data => data.json()).then(data => ({
        "quest": data.quests[id - 1]
    }))
}

function Quest({ route, navigator }) {
    const quest = route.quest;
    const [questDetails, setQuestDetails] = useState(null);
    console.log("QV", route)

    useEffect(() => {
        getQuest(quest.id).then(response => {
            setQuestDetails(response.quest)
        });
    }, [quest.id])
    return <Ons.Page renderToolbar={() =>
        <Ons.Toolbar>
            <Ons.BackButton />
            <div className="center">Quest</div>
        </Ons.Toolbar>
    }>
        {questDetails == null ? <h1>Loading...</h1> :
            (<>
                <Ons.Card style={{ padding: "1em" }}>
                    <QuestMeta icon={questDetails.icon} category={questDetails.category} />
                    <div className="title">
                        {questDetails.title}
                    </div>
                    {questDetails.img && <div className="image" style={{ paddingBottom: "1em" }}>
                        <img style={{ width: "100%", borderRadius: 5 }} src={questDetails.img}></img>
                    </div>}
                    <div className="content" style={{ paddingBottom: ".7em" }}>
                        {questDetails['additional note']}
                        {/* TODO: images with no link */}
                        {/* TODO: friend avatars */}
                    </div>
                    {questDetails.link && <div className="link" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <a href={questDetails.link} style={{ color: "#3377ff" }} target="_blank" rel="norefer nofollow">{questDetails.link}</a>
                    </div>}

                    <CardActions>
                        <a id="button-quest-accept" onClick={() => {
                            navigator.pushPage({ view: PostQuest, quest: questDetails })
                        }}>
                            Wykonane
                            </a>
                    </CardActions>

                </Ons.Card>
                <Ons.Card>
                    <div style={{ paddingBottom: ".4em", paddingTop: ".2em", fontWeight: "bold", fontSize: "0.9em", color: "#222" }}>Znajomi, którzy ukończyli to zadanie:</div>
                    <img src={"https://avatars0.githubusercontent.com/u/25778208?s=460&u=0333a8b6bdcff8a8ad623cde86b767515513b09a&v=4"} style={{ borderRadius: 5, "width": "2.5em", marginLeft: "0em", marginTop: ".3em" }} alt={"Sergiusz"} /> { /* Add href to Users' profiles */}
                </Ons.Card>
            </>)
        }
    </Ons.Page >
}

export default Quest


