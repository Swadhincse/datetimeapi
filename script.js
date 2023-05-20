 function fetchUserTimezone() {
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(showUserTimezone);
     } else {
         alert('Geolocation is not supported by this browser.');
     }
 }

 function showUserTimezone(position) {
     const latitude = position.coords.latitude;
     const longitude = position.coords.longitude;

     fetch(`https://api.geoapify.com/v1/timezone/by-geocode?lat=${latitude}&lon=${longitude}&apiKey=API_KEY`)
         .then(response => response.json())
         .then(data => {
             const userTimezone = data.timezone.name;
             document.getElementById('user-timezone').textContent = userTimezone;
         })
         .catch(error => {
             console.error('Error:', error);
         });
 }

 
 function fetchTimezoneByAddress() {
     const address = document.getElementById('address-input').value;

     fetch(`https://api.geoapify.com/v1/geocode/forward?limit=1&text=${address}&apiKey=API_KEY`)
         .then(response => response.json())
         .then(data => {
             const coordinates = data.features[0].geometry.coordinates;
             const latitude = coordinates[1];
             const longitude = coordinates[0];

             

             fetch(`https://api.geoapify.com/v1/timezone/by-geocode?lat=${latitude}&lon=${longitude}&apiKey=API_KEY`)
                 .then(response => response.json())
                 .then(data => {
                     const timezone = data.timezone.name;
                     document.getElementById('timezone-result').textContent = timezone;
                 })
                 .catch(error => {
                     console.error('Error:', error);
                 });
         })
         .catch(error => {
             console.error('Error:', error);
         });
 }