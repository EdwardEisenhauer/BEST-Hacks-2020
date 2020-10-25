function CardActions({ children }) {
    return <div style={{ fontSize: "0.9em", paddingTop: "1em", paddingRight: "0.5em", display: "flex", justifyContent: "flex-end", textTransform: "uppercase", color: "#3377ff", fontWeight: 600 }}>
        {children}
    </div>
}

export default CardActions