import { useEffect, useRef } from "react";
import * as Ons from "react-onsenui"
import ReactDOM from "react-dom";


import CardActions from "./CardActions"
import QuestMeta from "./QuestCategory"

function PostQuest({ route }) {
    return <Ons.Page renderToolbar={() =>
        <Ons.Toolbar>
            <Ons.BackButton />
            <div className="center">Pochwal się</div>
        </Ons.Toolbar>
    }><Ons.Card>
            <QuestMeta icon={route.quest.icon} category={route.quest.category} />
            <div style={{ fontSize: "0.8em", color: "#333", paddingBottom: "0.3em", paddingTop: "0.5em" }}>Wykonałem zadanie:</div>
            <div className="title" style={{ paddingBottom: "0.0em" }}>
                {route.quest.title}
            </div>
            <Ons.Input size={"140"} autoFocus={true} type={"text"} placeholder={"Dotknij tutaj, aby dodać opis..."} />
            <br /><br /><br />
            <CardActions left={<>
                <Ons.Icon icon={"md-camera-add"} size={24} /> {/* TODO: Add a photo when onclick */}
                <Ons.Icon icon={"md-account-add"} size={24} /> {/* TODO: Add a friend when onclick */}
            </>}>
                <a>Opublikuj</a>
            </CardActions>
        </Ons.Card >
    </Ons.Page >
}

export default PostQuest;