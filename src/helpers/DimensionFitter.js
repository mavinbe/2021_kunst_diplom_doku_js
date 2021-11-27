
export function contain({width: imageWidth, height: imageHeight}, {width: areaWidth, height: areaHeight}) {
    const imageRatio = imageWidth / imageHeight;
    if (imageRatio >= areaWidth / areaHeight) {
        // longest edge is horizontal
        return {width: areaWidth, height: areaWidth / imageRatio};
    } else {
        // longest edge is vertical
        return {width: areaHeight * imageRatio, height: areaHeight};
    }
}