// @import 'photoviewer/dist/photoviewer.css';
// import PhotoViewer from 'photoviewer';

const items = [
    {
        src: 'photos/2023/35968753-41550273.jpg', // path to image
        title: 'Test Image' // If you skip it, there will display the original image name(image1)
    },
];

const options = {
    index: 0
};


async function photoviewerHandler(event) {
    
    console.log("Button Clicked!")
    const photoviewer = new PhotoViewer(items, options)

}

// event listeners
document.querySelector("#photo_viewer").addEventListener('click', photoviewerHandler);