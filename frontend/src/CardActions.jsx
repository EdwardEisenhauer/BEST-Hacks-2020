import "./CardActions.css"
function CardActions({ children, left }) {
    return <div className="CardActions" style={{ fontSize: "0.9em", paddingTop: "1em", paddingRight: "0.5em", display: "flex", justifyContent: "space-between", alignItems: "center", textTransform: "uppercase", color: "#3377ff", fontWeight: 600 }}>
        <div className="left">
            {left}
        </div>
        <div className="right">
            {children}
        </div>
    </div>
}

export default CardActions