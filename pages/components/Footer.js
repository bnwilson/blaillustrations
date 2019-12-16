function Footer () {
    const footerStyle = {
        "position": "absolute",
        "bottom": "0",
        "width": "100%",
        "backgroundColor": "#333",
        "color":"#fff",
        "textAlign": "center"
    };

    return (
        <footer className="footer" style={footerStyle}>
            BLA Illustrations&copy;
        </footer>
    )
}

export default Footer;