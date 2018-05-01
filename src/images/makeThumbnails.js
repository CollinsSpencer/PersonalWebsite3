// Run with `node src/images/makeThumbnails.js`

const Jimp = require('jimp');

function squareThumbnail(image) {
    Jimp.read("./src/images/" + image, function (err, newImage) {
        if (err) throw err;
        newImage.clone();
        newImage.cover(350, 350, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_TOP)
            .write("./src/images/thumbnail-" + image);
    });
    return image;
}

squareThumbnail('gecko.JPG');
squareThumbnail('madeline.JPG');
squareThumbnail('mtAudubon.jpg');
squareThumbnail('panoUtah.jpg');
squareThumbnail('perrySunset.jpg');
squareThumbnail('sanDiegoSunset.jpg');
squareThumbnail('skippy.jpg');
squareThumbnail('tentStars.JPG');
squareThumbnail('tree.JPG');
squareThumbnail('whiteSands.jpg');
