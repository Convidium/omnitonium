function setCssVariable(colors) {
    const averageColor = colors.averageColor;
    const invertedColor = colors.invertedColor
    const root = document.documentElement;
    root.style.setProperty(`--averageColor`, `rgb(${averageColor.r}, ${averageColor.g}, ${averageColor.b})`);
    root.style.setProperty(`--invertedColor`, `rgb(${invertedColor.r}, ${invertedColor.g}, ${invertedColor.b})`);
}

export default setCssVariable;