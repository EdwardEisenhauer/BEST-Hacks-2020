import * as Ons from "react-onsenui"

import { useState, useEffect } from "react";

// TODO: implement getPosts
function getPosts() {
    return Promise.resolve({
        "posts": [
            {
                id: 1,
                title: "Post 1"
            },
            {
                id: 2,
                title: "Post 2"
            },
            {
                id: 3,
                title: "Post 3"
            }


        ]
    })
}

function Feed({ navigator }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then((response) => {
            setPosts(response.posts);
        })
    }, [])

    return (<Ons.Page
        renderToolbar={
            () => <Ons.Toolbar>
                <div className="center">Feed</div>
            </Ons.Toolbar>
        }>
        {posts.map((post) => (
            <Ons.Card
                key={post.id}
                onClick={() => {
                    // TODO: implement navigator for this tab and  postview and fix this
                }}>
                <div className="title">{post.title}</div>
            </Ons.Card>
        ))}
    </Ons.Page>);
}

export default Feed;
