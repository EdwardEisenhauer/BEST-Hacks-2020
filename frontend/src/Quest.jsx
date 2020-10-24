import * as Ons from "react-onsenui"

function Quest () {
    return <Ons.Card>
        <div className="title">Cook a vegan lunch!<div style={{"float": "right"}}><Ons.Icon icon={"fa-carrot"}/></div></div>
        <div className="content">
            Is it burger time? Try this recipe:
            <a href="https://ervegan.com/2016/08/burgery-z-cukinii/"><img
    src="https://ervegan.com/wp-content/uploads/2020/01/ervegan-logo-2020.jpg" style={{"width": "100%"}}
    alt="ervegan logo"/></a>
            Fiends list:<br></br>
            <img src={"https://avatars0.githubusercontent.com/u/25778208?s=460&u=0333a8b6bdcff8a8ad623cde86b767515513b09a&v=4"} style={{"width": "10%"}} alt={"Sergiusz"}/>
        </div>

        {/*<Ons.Button id="button-quest-vegan">Show me!</Ons.Button>*/}
    </Ons.Card>
}

// function Quest({ route, setRoute }) {
//     const quest = route.quest;
//     const [questDetails, setQuestDetails] = useState(null);
//
//     useEffect(() => {
//         getQuest(quest.id).then(response => {
//             setQuestDetails(response.quest)
//         });
//     }, [quest.id])
//
//     return <div>
//         <h1>{quest.title}</h1>
//         {questDetails === null ? <h3>Loading...</h3> : (
//             <p>{questDetails.instruction}</p>
//         )}
//         <a onClick={() => { setRoute({ view: QuestList, title: "Today's Quests" }) }}>Back</a>
//     </div>
// }

export default Quest