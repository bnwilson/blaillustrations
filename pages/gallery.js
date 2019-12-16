

function Gallery () {
    const galleryStyle = {
        "display": "grid",
        "grid-template-columns": "1fr 1fr 1fr",
        "grid-template-rows": "1fr auto",
        "gap": ".5rem",
        "margin": "5rem 1rem"
    }

    const galleryItemStyle = {
        "backgroundColor": "rgba(233, 235, 222, .4)",
        "border": "2px solid gray",
        "padding": "1px"
    }

    const galleryTempItems = ["One", "Two", "Three", "Four", "Fivers", "Sixers", "Se7en", "Eight", "Nine"]

    return (
        <div className="main-gallery" style={galleryStyle}>
            {galleryTempItems.map((item, index) => (
                <label key={index} className="gallery-item" style={galleryItemStyle}>
                    {item}
                </label>
            ))}
        </div>
    )
}

export default Gallery;