import { useState, useEffect } from "react"
import * as Ons from "react-onsenui"
import CardActions from "./CardActions";

function getUser(id) {
    return fetch('/api/v1/users.json').then(data => data.json()).then(data => ({
        "user": data.users[id - 1]
    }))
}

function User({route, navigator}) {
    const user = route.user;
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        getUser(1).then(response => {
            setUserDetails(response.user)
        });
    }, [1])

    return <Ons.Page renderToolbar={() =>
        <Ons.Toolbar>
            <Ons.BackButton />
            <div className="center">User Profile</div>
        </Ons.Toolbar>
    }>
        { userDetails == null ? null :
        <><Ons.Card>
            <div style={{"text-align": "center"}}>
            <img
            src={'/api/v1/avatars/' + userDetails.name + '.jpeg'}
            style={{"width": "50%"}} alt={userDetails.name}/>
            <h1>{userDetails.name}</h1></div>
            <p>Points: {userDetails.points}</p>
            <CardActions>
                Add to friends
            </CardActions>
        </Ons.Card>
        <Ons.Card>
            <div className={"title"}>Recent activity:</div>
            {/* TODO: Display quests associated with the User */ }
        </Ons.Card></>
        }
    </Ons.Page>
}
export default User