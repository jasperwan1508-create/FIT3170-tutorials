function processImage(image, cv) {
    // Read the input image into an OpenCV Mat
    let src = cv.imread(image);

    // Create Mats for intermediate/final results
    let gray = new cv.Mat();
    let dst = new cv.Mat();

    // 1. Convert to grayscale
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    // 2. Apply thresholding
    cv.adaptiveThreshold(
        gray,
        dst,
        255,
        cv.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv.THRESH_BINARY,
        11,
        2
    );
    // Clean up intermediate Mats
    src.delete();
    gray.delete();

    // Return final processed image
    return dst;
}

module.exports = { processImage };