import * as Ons from "react-onsenui"

import Quest from "./Quest"
import CardActions from "./CardActions"

import { useState, useEffect } from "react";
import { render } from "react-dom";

// TODO: implement getPosts
function getPosts() {
    return fetch('/api/posts').then(data => data.json())
}

function renderPost(post) {
    switch (post.type) {
        case "activity":
            return <>
                <div style={{ fontSize: "1.2em", paddingBottom: ".5em" }}>
                    <span style={{ fontWeight: "bold" }}>{post.user}</span> {post.title}
                </div>
            </>
        case "tip":
            return <>
                <div style={{ fontSize: "1.2em", paddingBottom: ".5em" }}>
                    {post.title}
                </div>
            </>
        case "quest":
            return <>
                <div style={{ fontSize: "1em" }}>
                    <span style={{ fontWeight: "bold" }}>{post.user}</span> {post.title}
                </div>
                <div style={{ fontSize: "1.5em", paddingTop: ".4em", paddingBottom: "0.5em" }}>
                    {post.quest.title}
                </div>
            </>
        default:
            return post.title
    }
}

function linkFor(post) {
    switch (post.type) {
        case "quest":
            return { view: Quest, quest: post.quest }
    }
}

function Feed({ navigator }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then((response) => {
            console.log(response.posts)
            setPosts(response.posts);
        })
    }, [])

    return <Ons.Page
        renderToolbar={
            () => <Ons.Toolbar>
                <div className="center">Aktywność</div>
            </Ons.Toolbar>
        }>
        {posts.map((post) => <Ons.Card
            key={post.id}
            onClick={() => {
                // TODO: implement navigator for this tab and  postview and fix this
            }}>
            {renderPost(post)}
            {post.img && <img style={{ width: "100%", borderRadius: 5 }} src={post.img}></img>}
            {post.text && <div style={{ paddingTop: post.img != null ? ".5em" : "0" }}>{post.text}</div>}
            <CardActions left={<>
                <Ons.Icon icon="md-thumb-up" size={24} />
            </>}>
                <a onClick={() => { navigator.pushPage(linkFor(post)) }}>Więcej...</a>
            </CardActions>
        </Ons.Card>)}
    </Ons.Page>;
}

export default Feed;
