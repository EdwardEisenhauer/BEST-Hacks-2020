import * as Ons from "react-onsenui"

function Feed({setRoute}) {
    const [posts, setQuests] = useState([]);

    useEffect(() => {
        getPosts().then((response) => {
            setPosts(response.posts);
        })
    }, [])

    return (<div>
        {posts.map([post] => (
            <Ons.Card
                key={post.id}
                onClick={() => {
                    setRoute({ view: PostView, title: "Post", post });
                }}>
                <div class="title">{post.title}</div>
            </Ons.Card>
        ))}
    </div>);
}