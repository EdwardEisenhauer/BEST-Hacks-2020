import * as Ons from "react-onsenui"


function QuestMeta({ icon, category, xp }) {
    return <div style={{ color: "#555", fontSize: "0.8em", paddingBottom: ".4em" }}>
        {icon && <span style={{ padding: ".1em", paddingRight: ".5em" }}><Ons.Icon icon={icon} /></span>}
        <span>{category}</span>
        {xp && <>
            <span>&nbsp;&middot;&nbsp;{xp} XP</span>
        </>}
    </div>
}
export default QuestMeta;