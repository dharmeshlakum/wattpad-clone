import { createCanvas } from "canvas";
import fs from "fs";
import path from "path";

const generateDefaultImg = (name: string): string => {

    const fistCharacter = name[0].toUpperCase(); // get first word from the string

    // generating new canvas
    const canvas = createCanvas(300, 300);
    const ctx = canvas.getContext("2d");

    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`; // generate random color;

    // text styles
    ctx.fillStyle = randomColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '150px Times New Roman';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(fistCharacter, canvas.width / 2, canvas.height / 2);

    // file name and path
    const randomNumber = Math.floor(Math.random() * 10000);
    const filename = `${name}_${randomNumber}.png`;
    const filePath = path.join(__dirname, '../../assets/profilePictures', filename);

    // generate image buffer
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filePath, buffer);

    return filename;

}

export { generateDefaultImg }