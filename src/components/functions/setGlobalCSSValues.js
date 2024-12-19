function setCssVariable(colors) {
    const contrastColor = colors.mostContrastingColor;
    const root = document.documentElement;
    // colors.forEach((color, index) => {
    //     root.style.setProperty(`--coverColor${index + 1}`, `rgb(${color.r}, ${color.g}, ${color.b})`);
    // });
    root.style.setProperty(`--contrastingColor`, `rgb(${contrastColor.r}, ${contrastColor.g}, ${contrastColor.b})`);
}

export default setCssVariable;