const { JSDOM } = require("jsdom");
const cv = require('@techstark/opencv-js');
const fs = require('fs');
const { Image, ImageData } = require('canvas');
const { processImage } = require("./processMyImage");


// Wait for OpenCV's WebAssembly runtime to fully load before doing anything.
// Without this, cv functions will not be available yet and the script silently does nothing.
cv.onRuntimeInitialized = () => {
    console.log("OpenCV runtime initialized successfully.");


    // Step 1: Set up a virtual browser environment using JSDOM.
    // OpenCV.js was designed for browsers, so it needs a DOM with a <canvas> element
    // to render images — we simulate that here in Node.js.
    const dom = new JSDOM(`<!DOCTYPE html><body><canvas id="canvas"></canvas></body>`);


    // Step 2: Expose browser globals so OpenCV.js can find what it needs.
    global.document = dom.window.document;
    global.HTMLImageElement = Image;
    global.HTMLCanvasElement = dom.window.HTMLCanvasElement;
    global.ImageData = ImageData;


    // Step 3: Get a reference to the virtual canvas and create an Image object.
    const canvas = document.getElementById('canvas');
    const img = new Image();


    // Step 4: Define what happens once the image has finished loading.
    img.onload = () => {
        console.log("Image loaded. Applying transformations...");


        // Step 5: Pass the image through our processing pipeline.
        // processImage() returns a new OpenCV Mat with all transformations applied.
        let dst = processImage(img, cv);


        // Step 6: Render the processed Mat onto the virtual canvas.
        cv.imshow(canvas, dst);


        // Step 7: Export the canvas contents as a Base64-encoded PNG string.
        const imageData = canvas.toDataURL("image/png");


        // Step 8: Strip the "data:image/png;base64," prefix to get raw Base64 data.
        const base64Data = imageData.replace(/^data:image\/png;base64,/, "");


        // Step 9: Write the decoded image data to disk as a PNG file.
        fs.writeFileSync("output.png", base64Data, 'base64');


        // Step 10: Free the memory used by the processed Mat.
        // OpenCV.js uses manual memory management — always delete Mats when done.
        dst.delete();


        console.log("Done! Processed image saved as output.png");
    };


    // Step 11: Load the local image file into the Image object.
    // Reading it as a Buffer triggers the onload callback above.
    img.src = fs.readFileSync('./lena.png');
};
