function getInvertedColor(average, dark, light) {
    let {r, g, b} = average;
    let darkColor = dark;
    let lightColor = light;

    if (darkColor === undefined) {
        darkColor = {r: 0, g: 0, b: 0}
    }
    if (lightColor === undefined) {
        lightColor = {r: 255, g: 255, b: 255}
    }

    // Calculate luminance to determine contrast
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    if (luminance > 150) {
        return darkColor
    } else {
        return lightColor;
    }
}

export default getInvertedColor;