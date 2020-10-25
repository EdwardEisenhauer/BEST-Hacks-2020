import * as Ons from "react-onsenui"

import { useState, useEffect } from "react"

import CardActions from "./CardActions"
import PostQuest from "./PostQuest"
import QuestMeta from "./QuestMeta"
import getUser from "./User"

function getQuest(id) {
    return fetch(`/api/quest/${id}`).then(data => data.json())
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
                        <img style={{ width: "100%", borderRadius: 5 }} src={questDetails.img} />
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
                {console.log(questDetails, "AAAA")}
                <Ons.Card>
                    <div style={{
                        paddingBottom: ".4em",
                        paddingTop: ".2em",
                        fontWeight: "bold",
                        fontSize: "0.9em",
                        color: "#222"
                    }}>Znajomi, którzy ukończyli to zadanie:</div>
                    <div style={{ display: "flex" }}>
                        {questDetails.users.map(user => (
                            <div>
                                <img src={'/avatars/' + user + '.jpeg'} style={{
                                    borderRadius: 5,
                                    "width": "2.5em",
                                    marginLeft: "0.4em",
                                    marginTop: ".3em",
                                    marginRight: "0.2em"
                                }} alt={user} />
                            </div>
                        ))}
                    </div>
                    { /* Add href to Users' profiles */}
                </Ons.Card>
            </>)
        }
    </Ons.Page >
}

export default Quest


