
const fs = require('fs');
const {Jimp} = require('jimp');

const dir = process.cwd() + '/static';
const temp = process.cwd() + '/temp';

const maxW = 1920
const maxH = 1920

if(fs.existsSync(temp)) {
  fs.rmSync(temp, { recursive: true });
}

async function checkFolder(originPath, tempPath){
    if(!fs.existsSync(tempPath)) {
        fs.mkdirSync(tempPath, { recursive: true });
    }
    const files = fs.readdirSync(originPath);
    for (const file of files) {
        if(!file.includes(".")) {
            checkFolder(originPath + "/" + file, tempPath + "/" + file);
        }
        else if(file.includes(".png") || file.includes(".jpg") || file.includes(".jpeg")){
        // if(file.includes(".png")){
            if(await transImg(originPath + "/" + file, tempPath + "/" + file), file.includes(".png")){
                console.log(file);
            }
        }
    }
}

async function transImg(originPath, tempPath, isPng){
    const image = await Jimp.read(originPath);
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    let hasResize = false
    if(width > maxW || height > maxH) {
        const scaleW = width / maxW
        const scaleH = height / maxH
        if(scaleW > scaleH){
            image.resize({w:maxW, h:Math.round(height / scaleW)})
        }
        else {
            image.resize({w:Math.round(width / scaleW), h:maxH})
        }
        hasResize = true
    }
    if(isPng && isFullyOpaque(image)){
        console.log("fully opaque")
        image.write(tempPath.replace(".png", ".jpg"));
        return true
    }
    else if(hasResize){
        console.log("resize")
        image.write(tempPath);
        return true
    }
    return false
}

function isFullyOpaque(image){
    const pixelNum = image.bitmap.width * image.bitmap.height
    for (var i = 0; i < pixelNum; i++) {
      const idx = i * 4 + 3
      if (image.bitmap.data[idx] < 255) {
        return false
      }
    }
    return true
}

function startCheck(){
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if(file === "img" || file === "assets") {
        checkFolder(dir + "/" + file, temp + "/" + file);
      }
    }
}

startCheck();



