const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dz1nn391z',
  api_key: 'VJYs_aVBIh_dUXRPtvsnjOfkoNQ', // testing as key
  api_secret: 'dummy_secret'
});

cloudinary.api.ping()
  .then(res => console.log('Ping with VJYs as key success:', res))
  .catch(err => {
    console.error('Ping with VJYs as key failed:', err.error ? err.error.message : err.message);
    
    // Now test as secret
    cloudinary.config({
      cloud_name: 'dz1nn391z',
      api_key: '123456789012345', // dummy key
      api_secret: 'VJYs_aVBIh_dUXRPtvsnjOfkoNQ' // testing as secret
    });

    cloudinary.api.ping()
      .then(res => console.log('Ping with VJYs as secret success:', res))
      .catch(err => console.error('Ping with VJYs as secret failed:', err.error ? err.error.message : err.message));
  });
