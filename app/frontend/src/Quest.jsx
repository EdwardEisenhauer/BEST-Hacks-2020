import * as Ons from "react-onsenui"

import {useState, useEffect} from "react";

function getQuest(id) {
    return fetch(`/api/v1/quests/${id}.json`).then(data => data.json())
}

function Quest({route}) {
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
            <div class="center">Quest</div>
        </Ons.Toolbar>
    }>
        {questDetails == null ? <h1>Loading...</h1> : <Ons.Card>
            <div className="title">
                {questDetails.title}
                <div style={{"float": "right"}}>
                    {questDetails.icon && <Ons.Icon icon={questDetails.icon} />}
                </div>
            </div> { /* TODO: Get title and category icon (some category -> icon name mapping?) from DB. */}
            <div className="content">
                {questDetails.instruction}
                {/* TODO: images with no link */}
                {/* TODO: friend avatars */}
                {questDetails.link && <a href={questDetails.link}><img
                    src={questDetails.img} style={{"width": "100%"}}
                    alt={questDetails.alt} /></a>}
            Friends list:<br />
                <img src={"https://avatars0.githubusercontent.com/u/25778208?s=460&u=0333a8b6bdcff8a8ad623cde86b767515513b09a&v=4"} style={{"width": "10%"}} alt={"Sergiusz"} /> { /* Add href to Users' profiles */}
                <div style={{"float": "right"}}><Ons.Button id="button-quest-accept">Let{"'"}s do it!</Ons.Button></div>
            </div>
        </Ons.Card>}
    </Ons.Page >
}

export default Quest