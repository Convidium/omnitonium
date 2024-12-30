function getInvertedColor(rgb) {
    let r = rgb.r;
    let g = rgb.g;
    let b = rgb.b;

    // Calculate luminance to determine contrast
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    const isContrastNeeded = luminance > 115; // Adjust threshold if needed

    if (isContrastNeeded) {
        return luminance > 186
            ? { r: 0, g: 0, b: 0 } // Darker inverted color
            : { r: 255, g: 255, b: 255 }; // Brighter inverted color
    }

    // If enough contrast, invert the colors
    r = (255 - r);
    g = (255 - g);
    b = (255 - b);

    return { r: r, g: g, b: b };
}

export default getInvertedColor;