import * as Ons from "react-onsenui"

function Leaderboard() {
    return <Ons.Page renderToolbar={() =>
        <Ons.Toolbar>
            <div className="center">Ranking</div>
        </Ons.Toolbar>
    }>
        <Ons.Card>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img style={{ width: "3em", borderRadius: 5 }} src="/avatars/sergiusz.jpeg" />
                <div style={{ paddingLeft: ".7em", fontSize: "1.5em", flexGrow: 2 }}>1. Sergiusz</div>
                <div>1337 XP</div>
            </div>
        </Ons.Card>
        <Ons.Card>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img style={{ width: "3em", borderRadius: 5 }} src="/avatars/julia.jpeg" />
                <div style={{ paddingLeft: ".7em", fontSize: "1.5em", flexGrow: 2 }}>2. Julia</div>
                <div>1024 XP</div>
            </div>
        </Ons.Card>
        <Ons.Card>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img style={{ width: "3em", borderRadius: 5 }} src="/avatars/kacper.jpeg" />
                <div style={{ paddingLeft: ".7em", fontSize: "1.5em", flexGrow: 2 }}>3. Kacper</div>
                <div>777 XP</div>
            </div>
        </Ons.Card>
        <Ons.Card>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img style={{ width: "3em", borderRadius: 5 }} src="/avatars/wojtek.jpeg" />
                <div style={{ paddingLeft: ".7em", fontSize: "1.5em", flexGrow: 2 }}>4. Wojtek</div>
                <div>256 XP</div>
            </div>
        </Ons.Card>
    </Ons.Page >
}

export default Leaderboard