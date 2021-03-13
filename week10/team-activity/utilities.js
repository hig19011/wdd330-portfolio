export const getJSON = (url) => {
  return fetch(url)
    .then( response => {
      if(!response.ok) {
        throw Error(response.statusText)
      }
      return response.json();
     })    
    .catch( (error) => { console.log(error)});
}

export const getLocation = (options) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}




//getJson('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02');
