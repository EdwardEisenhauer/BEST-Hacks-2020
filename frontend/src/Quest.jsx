import * as Ons from "react-onsenui"

function Quest () {
    return <Ons.Card>
        <div className="title">Cook a vegan lunch!<div style={{"float": "right"}}><Ons.Icon icon={"fa-carrot"}/></div></div> { /* TODO: Get title and category icon (some category -> icon name mapping?) from DB. */ }
        <div className="content">
            Is it burger time? Try this recipe:
            <a href="https://ervegan.com/2016/08/burgery-z-cukinii/"><img
    src="https://ervegan.com/wp-content/uploads/2020/01/ervegan-logo-2020.jpg" style={{"width": "100%"}}
    alt="ervegan logo"/></a>
            Friends list:<br/>
            <img src={"https://avatars0.githubusercontent.com/u/25778208?s=460&u=0333a8b6bdcff8a8ad623cde86b767515513b09a&v=4"} style={{"width": "10%"}} alt={"Sergiusz"}/> { /* Add href to Users' profiles */ }
            <div style={{"float": "right"}}><Ons.Button id="button-quest-accept">Let's do it!</Ons.Button></div>
        </div>
    </Ons.Card>
}

export default Quest