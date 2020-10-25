import * as Ons from "react-onsenui"

function getUser(id) {
    return fetch('/api/v1/users.json').then(data => data.json())
}

function User({route, navigator}) {
    // const user = getUser(1);
    return <Ons.Page renderToolbar={() =>
        <Ons.Toolbar>
            <Ons.BackButton />
            <div className="center">User Profile</div>
        </Ons.Toolbar>
    }>
        <Ons.Card>
        <style>

        </style>

        <img
        src={'/api/v1/avatars/sergiusz.jpeg'}
        style={{"width": "30%", "align": "center"}} alt={"Sergiusz"}/>
        <p style={{}}>Sergiusz</p>
        <div className={"title"}>Recent activity:</div>
            {/*{user}*/}
    </Ons.Card>
    </Ons.Page>
}
export default User