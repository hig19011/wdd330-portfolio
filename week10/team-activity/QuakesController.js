import { getLocation } from './utilities.js';
import Quake from './Quake.js';
import QuakesView from './QuakesView.js';

// Quake controller
export default class QuakesController {
  constructor(parent, position = null) {
    this.parent = parent;
    // sometimes the DOM won't exist/be ready when the Class gets instantiated, so we will set this later in the init()
    this.parentElement = null;
    this.startOn = null;
    this.endOn = null;
    this.radius = null;
    // let's give ourselves the option of using a location other than the current location by passing it in.
    this.position = position || {
      lat: 0,
      lon: 0
    };
    // this is how our controller will know about the model and view...we add them right into the class as members.
    this.quakes = new Quake();
    this.quakesView = new QuakesView();
  }
  async init() {
    // use this as a place to grab the element identified by this.parent, do the initial call of this.initPos(), 
    // and display some quakes by calling this.getQuakesByRadius()
    this.parentElement = document.querySelector(this.parent);
    this.startOn = document.getElementById('startOn');
    this.endOn = document.getElementById('endOn');
    this.radius = document.getElementById('radius');
    this.loadQuakes = document.getElementById('loadQuakes');
    this.backToList = document.getElementById('backToList');
    this.loadQuakes.addEventListener('click', () => {this.getQuakesByRadius(this.radius.value);});
    this.backToList.addEventListener('click', () => {this.getQuakesByRadius(this.radius.value);});

    await this.initPos();
    this.getQuakesByRadius(this.radius.value);
  }
  async initPos() {
    // if a position has not been set
    if (this.position.lat === 0) {
      try {
        // try to get the position using getLocation()
        let pos = await getLocation();
        // if we get the location back then set the latitude and longitude into this.position
        
        this.position.latitude = pos.coords.latitude;
        this.position.longitude = pos.coords.longitude;
                
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getQuakesByRadius(radius = 500) {
    // this method provides the glue between the model and view. Notice it first goes out and requests the 
    // appropriate data from the model, then it passes it to the view to be rendered.
    //set loading message
    this.parentElement.innerHTML = 'Loading...';
    // get the list of quakes in the specified radius of the location
    const quakeList = await this.quakes.getEarthQuakesByRadius(this.position, this.startOn.value, this.endOn.value, this.radius.value);
    // render the list to html
    this.quakesView.renderQuakeList(quakeList, this.parentElement);
    // add a listener to the new list of quakes to allow drill down in to the details
    this.parentElement.addEventListener('click', e => {
      this.getQuakeDetails(e.target.dataset.id, this.parentElement);
    });
    this.backToList.classList.add('hide-me');
  }
  async getQuakeDetails(quakeId, element) {
    // get the details for the quakeId provided from the model, then send them to the view to be displayed
    let quake = this.quakes.getQuakeById(quakeId);
    this.quakesView.renderQuake(quake,element);
    this.backToList.classList.remove('hide-me');
  }
}
      