import * as Ons from "react-onsenui"

function PostQuest({route}) {
    return <Ons.Page renderToolbar={() =>
        <Ons.Toolbar>
            <Ons.BackButton/>
            <div className="center">Public Quest</div>
        </Ons.Toolbar>
    }><Ons.Card>
        <div className="title">
            {route.quest.title}
            <div style={{"float": "right"}}>
                {route.quest.icon && <Ons.Icon icon={route.quest.icon} />}
            </div>
        </div>
        <Ons.Input size={"140"} type={"text"} placeholder={"Share your thoughts with friends!"}/>
        <Ons.Icon icon={"fa-camera"}/> {/* TODO: Add a photo when onclick */}
        <Ons.Icon icon={"fa-user-plus"}/> {/* TODO: Add a friend when onclick */}
        <div style={{"float": "right"}}><Ons.Button id="button-post-publish" onClick={
                    () => {
                        /* Add post to database */
                    }
                }>Publish!</Ons.Button></div>
        </Ons.Card>
    </Ons.Page>
}

export default PostQuest;