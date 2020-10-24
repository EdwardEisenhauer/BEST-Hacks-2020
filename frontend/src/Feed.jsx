import * as Ons from "react-onsenui"

import {useState, useEffect} from "react";

// TODO: implement getPosts
function getPosts() {return Promise.reject()}

function Feed({navigator}) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then((response) => {
            setPosts(response.posts);
        })
    }, [])

    return (<div>
        {posts.map((post) => (
            <Ons.Card
                key={post.id}
                onClick={() => {
                    // TODO: implement postview and fix this
                    navigator.pushPage({view: null, title: "Post", post});
                }}>
                <div className="title">{post.title}</div>
            </Ons.Card>
        ))}
    </div>);
}

export default Feed