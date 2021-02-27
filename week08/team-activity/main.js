
class StarWarsFacts {
getPeople = (url) => {
  var result = fetch(url)
  .then(response => {
    if(!response.ok){
      throw Error(response.statusText)
    }
    return response.json()
  })
  .then(result => {
    this.buildPeopleListing(result);
  })
  .catch(err => console.error(err));
}

buildPeopleListing = (people) => {
  var list = document.getElementById('people'); 
  list.innerHTML = "";
  console.log(people);

  people.results.forEach(person => {
    var listItem = document.createElement('li');
    listItem.innerText = person['name'];
    listItem.addEventListener('click',() => {this.showDetails(person);} )
    list.appendChild(listItem);
  });
  var previous = document.getElementById('previousButton');
  var next = document.getElementById('nextButton');
  
  if(people.previous == null){
    previous.innerText = "First";
    previous.onclick = "";
  }
  else {
    previous.innerText = "Previous";
    previous.onclick = () => { this.getPeople(people.previous); }
  }

  if(people.next == null){
    next.innerText = "Last";
    next.onclick = "";
  }
  else {
    next.innerText = "Next";
    next.onclick = () => { this.getPeople(people.next); }
  }


  let pagesList = document.getElementById('pagesList');    
  pagesList.length = 0;
  if(people.count > 10) {
    let totalPages = Math.floor(people.count/10);
    if(people.count%10 != 0)
      totalPages += 1;

    for(let i=1; i<=totalPages; i++) {
      let option = document.createElement('option');
      option.value = i;
      option.innerText = i;
      pagesList.options.add(option);
    }     
  }
 
  let goto = document.getElementById('gotoPage');
  goto.onclick = () => { this.getPeople(peopleUrl+"?page="+pagesList.value) }

}

showDetails = (person) => {
  var container = document.getElementById("details");
  container.innerHTML = "";

  var name = document.createElement("h2");
  name.innerText = person.name;
  container.appendChild(name);

  var height = document.createElement("p");
  height.innerText = "Height: " + person.height + " cm";
  container.appendChild(height);

  var weight = document.createElement("p");
  weight.innerText = "Weight: " + person.mass + " kg";
  container.appendChild(weight);

  var hairColor = document.createElement("p");
  hairColor.innerText = "Hair color: " + person.hair_color;
  container.appendChild(hairColor);
  
  var eyeColor = document.createElement("p");
  eyeColor.innerText = "Eye color: " + person.eye_color;
  container.appendChild(eyeColor);

  var gender = document.createElement("p");
  gender.innerText = "Gender: " + person.gender;
  container.appendChild(gender);

  var birthYear = document.createElement("p");
  birthYear.innerText = "Birth year: " + person.birth_year;
  container.appendChild(birthYear);


  
  var closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.onclick = () => {
    container.classList.toggle("hide-modal");
  }
  container.appendChild(closeButton);  
  container.classList.toggle("hide-modal");
}

}

const peopleUrl = 'https://swapi.dev/api/people/';
var facts = new StarWarsFacts();
facts.getPeople(peopleUrl);




