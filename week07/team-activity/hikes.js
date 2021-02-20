import Comments from './comments.js'

export default class Hikes {
  imgBasePath = "//byui-cit.github.io/cit261/examples/";
  //create an array of hikes
  hikeList = [
    {
      name: "Bechler Falls",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "3 miles",
      difficulty: "Easy",
      description:
        "Beautiful short hike along the Bechler river to Bechler Falls",
      directions:
        "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
    },
    {
      name: "Teton Canyon",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "3 miles",
      difficulty: "Easy",
      description: "Beautiful short (or long) hike through Teton Canyon.",
      directions:
        "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
    },
    {
      name: "Denanda Falls",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "7 miles",
      difficulty: "Moderate",
      description:
        "Beautiful hike through Bechler meadows river to Denanda Falls",
      directions:
        "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
    }
  ];

  constructor(elementId) {
    this.parentElement = document.getElementById(elementId);
    // we need a back button to return back to the list. This will build it and hide it. When we need it we just need to remove the 'hidden' class
    this.backButton = this.buildBackButton();
    this.comments = new Comments();
  }
  // why is this function necessary?  hikeList is not exported, and so it cannot be seen outside of this module. I added this in case I ever need the list of hikes outside of the module. This also sets me up nicely if my data were to move. I can just change this method to the new source and everything will still work if I only access the data through this getter.
  getAllHikes() {
    return hikeList;
  }
  // For the first stretch we will need to get just one hike.
  getHikeByName(hikeName) {
    return this.getAllHikes().find(hike => hike.name === hikeName);
  }
  //show a list of hikes in the parentElement
  showHikeList() {
    this.parentElement.innerHTML = "";
    this.renderHikeList(this.hikeList, this.parentElement);
  }

  renderHikeList(hikes, parent) {
    hikes.forEach(hike => {
      parent.appendChild(this.renderOneHike(hike));      
    });
  }

  renderOneHike(hike) {
    const item = document.createElement("li");
    item.innerHTML = ` <h2>${hike.name}</h2>
          <div class="image"><img src="${this.imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
          <div>
                  <div>
                      <h3>Distance</h3>
                      <p>${hike.distance}</p>
                  </div>
                  <div>
                      <h3>Difficulty</h3>
                      <p>${hike.difficulty}</p>
                  </div>
          </div>`;
   
    item.innerHTML += this.comments.renderComments(hike.name);
    this.addHikeListener(item, hike.name)
    return item;
  }

  // show one hike with full details in the parentElement
  showOneHike(hikeName) {
    let hike = {};
    for(let i=0; i<this.hikeList.length; i++){
      if(hikeName == this.hikeList[i].name){
        hike = this.hikeList[i];
        break;
      }
    }

    
    this.parentElement.innerHTML = `<li class="detailed-hike"> 
      <h2>${hike.name}</h2>
      <div class="image"><img src="${this.imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
      <div>
        <div>
          <h3>Distance</h3>
          <p>${hike.distance}</p>
        </div>
        <div>
          <h3>Difficulty</h3>
          <p>${hike.difficulty}</p>
        </div>
        <div>
          <h3>Description</h3>
            <p>${hike.description}</p>
          </div>
        <div>
          <h3>Direction</h3>
          <p>${hike.directions}</p>
        </div>
      </div>`

    this.parentElement.innerHTML += this.comments.renderComments(hike.name);
    this.parentElement.innerHTML += this.comments.renderAddComment(hike.name);
    this.parentElement.innerHTML += `</li>`;    
    this.parentElement.appendChild(this.backButton)
    this.attachAddCommentEvent(hike.name);
   }

   attachAddCommentEvent = (hikeName) => {
    let element = document.getElementById('addContent');
    element.addEventListener('click',() => {
      this.comments.createComment(hikeName);
      this.showOneHike(hikeName);
    });
  }
  // in order to show the details of a hike ontouchend we will need to attach a listener AFTER the list of hikes has been built. The function below does that.
  addHikeListener(hikeListItem, name) {
    hikeListItem.addEventListener('click',x => {
      this.showOneHike(name);
    });      
  }
  buildBackButton() {
    const backButton = document.createElement("button");
    backButton.innerText = "Back to Hike List";
    backButton.addEventListener('click',x => { this.showHikeList(); }); 
    return backButton;
  }
}