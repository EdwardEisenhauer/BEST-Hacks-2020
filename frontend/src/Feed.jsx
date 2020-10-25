import * as Ons from "react-onsenui"

import { useState, useEffect } from "react";

// TODO: implement getPosts
function getPosts() {
    return fetch('/api/v1/posts.json').then(data => data.json())
}

function Feed({ navigator }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then((response) => {
            setPosts(response.posts);
        })
    }, [])

    return <Ons.Page
        renderToolbar={
            () => <Ons.Toolbar>
                <div className="center">Feed</div>
            </Ons.Toolbar>
        }>
        {posts.map((post) => <Ons.Card
                key={post.id}
                onClick={() => {
                    // TODO: implement navigator for this tab and  postview and fix this
                }}>
            { post.type === "activity" ?
                <div className="title">{post.user + " " + post.title}</div>
                :
                <div className="title">{post.title}</div>
            }
            </Ons.Card>)}
    </Ons.Page>;
}

export default Feed;
