function getColorScheme(base64Image, callback, colorsToTake = 5, skipStep = 16) {
    const img = new Image();
    img.src = base64Image;
    img.onload = function () {
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

        // Helper function to get top N colors from a category
        function getTopColors(colorMap, count) {
            return Object.entries(colorMap)
                .sort((a, b) => b[1] - a[1]) // Sort by frequency
                .slice(0, count) // Take top N
                .map(([color]) => {
                    const [r, g, b] = color.split(',').map(Number);
                    return { r, g, b };
                });
        }

        // Get top 2 colors from each category
        const dark = getTopColors(darkColors, 2);
        const neutral = getTopColors(neutralColors, 2);
        const light = getTopColors(lightColors, 2);

        // Combine and add the average color
        const diverseColors = [...dark, ...neutral, ...light, averageColor];

        // Function to calculate luminance
        function calculateLuminance(r, g, b) {
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        }

        // Find the most contrasting color
        const avgLuminance = calculateLuminance(avgR, avgG, avgB);
        let mostContrastingColor = null;
        let highestContrast = 0;

        diverseColors.forEach(color => {
            const colorLuminance = calculateLuminance(color.r, color.g, color.b);
            const L1 = Math.max(avgLuminance, colorLuminance);
            const L2 = Math.min(avgLuminance, colorLuminance);
            const contrastRatio = (L1 + 0.05) / (L2 + 0.05);

            if (contrastRatio > highestContrast) {
                highestContrast = contrastRatio;
                mostContrastingColor = color;
            }
        });

        callback({ diverseColors, averageColor, mostContrastingColor });
    };

    img.onerror = function () {
        console.error("Failed to load image.");
    };
}

export default getColorScheme;