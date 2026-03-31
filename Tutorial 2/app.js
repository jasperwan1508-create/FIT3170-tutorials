const { JSDOM } = require('jsdom');
const cv = require('@techstark/opencv-js');
const fs = require('fs');
const {Image, ImageData} = require('canvas');
const { processImage } = require("./processMyImage");

cv.onRuntimeInitialized = () => {
    console.log("OpenCV runtime initialized");
    const dom = new JSDOM(`<!DOCTYPE html><html><body><canvas id="canvas"></canvas></body></html>`);
    global.document = dom.window.document;
    global.HTMLImageElement = Image;
    global.HTMLCanvasElement = dom.window.HTMLCanvasElement;
    global.ImageData = ImageData;

    const canvas = document.getElementById('canvas');
    const img = new Image();

    img.onload = () => {
        console.log("Image loaded. doing transformation...");
        let dst = processImage(img);
        cv.imshow(canvas, dst);
        const imageData = canvas.toDataURL("image/png");
        const base64Data = imageData.replace(/^data:image\/png;base64,/, "");
        fs.writeFileSync("output.png", base64Data, 'base64');
        dst.delete();
        console.log("Image processed and saved as output.png");
    };
    img.src = fs.readFileSync('./lena.png');
};