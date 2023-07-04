const fs = require("fs").promises;
const deleteImage = async (imagePath) => {
    try {
        await fs.access(imagePath);
        await fs.unlink(imagePath);
        console.log("image successfully deleted")
    } catch (error) {
        console.error("Image was deleted")
    }
}

module.exports = {deleteImage}