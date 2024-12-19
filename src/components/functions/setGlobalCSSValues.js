function setCssVariable(colors) {
    const contrastColor = colors.mostContrastingColor;
    const root = document.documentElement;
    root.style.setProperty(`--contrastingColor`, `rgb(${contrastColor.r}, ${contrastColor.g}, ${contrastColor.b})`);
}

export default setCssVariable;