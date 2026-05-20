const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: 'dz1nn391z',
  api_key: '645636597319121',
  api_secret: 'VJYs_aVBIh_dUXRPtvsnjOfkoNQ'
});

async function testUpload() {
  const video = './public/assets/banner_videos/v1.mp4';
  try {
    const res = await cloudinary.uploader.upload_large(video, {
      resource_type: "video",
      folder: "vandan_darshan"
    });
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}
testUpload();
