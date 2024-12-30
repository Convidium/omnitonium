import getInvertedColor from "./getInvertedColor";

function getAverageRGB(base64Image, callback, skipStep = 8) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Avoid cross-origin issues
        img.src = base64Image;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;

            const darkColors = {};
            const neutralColors = {};
            const lightColors = {};
            let totalR = 0, totalG = 0, totalB = 0, totalPixels = 0;

            for (let i = 0; i < pixels.length; i += skipStep) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                const a = pixels[i + 3];

                // Ignore transparent pixels
                if (a === 0) continue;

                // Add to total for average color calculation
                totalR += r;
                totalG += g;
                totalB += b;
                totalPixels++;

                // Calculate luminance
                const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                const color = `${r},${g},${b}`;

                // Categorize based on luminance
                if (luminance < 50) {
                    darkColors[color] = (darkColors[color] || 0) + 1;
                } else if (luminance < 200) {
                    neutralColors[color] = (neutralColors[color] || 0) + 1;
                } else {
                    lightColors[color] = (lightColors[color] || 0) + 1;
                }
            }

            // Calculate average color
            const avgR = Math.round(totalR / totalPixels);
            const avgG = Math.round(totalG / totalPixels);
            const avgB = Math.round(totalB / totalPixels);

            const averageColor = { r: avgR, g: avgG, b: avgB };
            const invertedColor = getInvertedColor(averageColor);

            callback({ averageColor: averageColor, invertedColor: invertedColor });
        };

        img.onerror = () => reject("Failed to load image");

    });
}

export default getAverageRGB;