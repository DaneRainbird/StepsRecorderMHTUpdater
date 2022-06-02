/**
 * Name: main.js
 * Description: Handles converting an MHT file to a HTML file for modern browser usage.
 * Author: Dane Rainbird (dane.rainbird@monash.edu)
 * Last Edited: 2022-06-01
 */

/**
 * Reads the filename and textual contents from the file and passes to updateMht
 * @param {File} file a file object from the file input element 
 */
let readFile = async (file) => {
    const text = await file.text();
    const fileName = file.name;
    updateMht(text, fileName);
}

/**
 * Handles the form submit event and prevents the default POST behaviour
 * @param {event} event 
 */
let catchSubmit = (event) => {
    event.preventDefault();
    // Get the file from the form input and pass to readFile
    let file = event.target.files[0];
    readFile(file);
}

/**
 * Handles converting the mht file to a HTML file with new CSS and images
 * @param {String} text the text from the file passed to readFile
 * @param {String} fileName the name of the file passed in from the file input element 
 */
let updateMht = (text, fileName) => {
    updatedImageText = updateMhtImages(text);
    updatedCssText = updateMhtCSS(updatedImageText);
    cleanedText = removeMhtTags(updatedCssText);

    // Download the cleaned text as a .html file using Blob
    let blob = new Blob([cleanedText], {type: "text/html"});
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(".mht", "") + "_cleaned.html";
    a.click();
}

/**
 * Removes the CSS from the MIME format and places it into the head of the HTML file
 * @param {String} text the text from the file passed to readFile 
 * @returns {String} the updated text with the CSS in the head of the HTML file
 */
let updateMhtCSS = (text) => {
    // Find the occurrence of the string "Content-Location: main.css"
    let match = text.match(/Content-Location: main\.css/);

    // Read from the start of the match until reaching the delimiter "--=_NextPart_SMP"
    let start = text.indexOf(match);
    let end = text.indexOf("--=_NextPart_SMP", start);
    let splicedText = text.slice(start, end);
    splicedText = splicedText.replace(/Content-Location: main.css\r\n\r\n/, "");

    // Replace the occurrence of the string "<link rel="stylesheet" type="text/css" href="main.css">" with a style tag
    let newText = text.replace('<link rel="stylesheet" type="text/css" href="main.css">', `<style>${splicedText}</style>`);
    return newText;
}

/**
 * Removes the images from the MIME format and replaces them with B64 images in the HTML file
 * @param {String} text the text from the file passed to readFile 
 * @returns {String} the updated text with the images in the HTML file
 */
let updateMhtImages = (text) => {
    // Find each occurrence of the string "Content-Location: .JPEG"
    let matches = text.match(/Content-Location: .*JPEG/g);
    
    // Read from the start of each match until reaching the delimiter "--=_NextPart_SMP"
    let b64images = matches.map(match => {
        let start = text.indexOf(match);
        let end = text.indexOf("--=_NextPart_SMP", start);
        let splicedText = text.slice(start, end);

        return splicedText.replace(/Content-Location: .*JPEG\r\n\r\n/, "");
    });

    // For each image in the array, decode the base64 string and create an image element
    let images = b64images.map(b64 => {
        let image = document.createElement("img");
        image.src = "data:image/jpeg;base64," + b64;
        return image;
    });

    // In the original text, replace src="screenshot.jpeg" tags with the base64 image strings
    let newText = text.replace(/src=".*JPEG"/g, (match) => {
        let image = images.shift();
        if (image) {
            return `src="${image.src}"`;
        } else {
            return match;
        }
    });

    return newText;
}

/**
 * Removes MIME data and the XML associated with MHT files from the text
 * @param {String} text the text from the file passed to readFile
 * @returns {String} the text with the MIME and MHT-specific tags removed
 */
let removeMhtTags = (text) => {
    // Remove everything between the <xml> and </xml> tag
    let match = text.match(/<!-- This is the recorded XML data that was used in generating this page. -->/);
    let start = text.indexOf(match);
    let end = text.indexOf("</xml>", start);
    let splicedText = text.slice(start, end);
    let newText = text.replace(splicedText, "");

    // Remove everything after the before the <!DOCTYPE html> tag and after the </html> tag
    match = newText.match(/<!DOCTYPE html>/);
    start = newText.indexOf(match);
    end = newText.indexOf("</html>", start);
    splicedText = newText.slice(start, end + 7); // keep the </html> tag

    // Remove the "Review the recorded steps as a slide show" <li> tag
    match = splicedText.match(/<li title=\"Review the recorded steps as a slide show\">/);
    start = splicedText.indexOf(match);
    end = splicedText.indexOf("</li>", start);
    splicedText = splicedText.slice(0, start) + splicedText.slice(end + 5);

    return splicedText;
}

// Add event listener to the form change event
document.getElementById('file-upload').addEventListener('change', catchSubmit, false);