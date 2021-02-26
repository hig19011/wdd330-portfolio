
class StarWarsFacts {
getPeople = (url) => {
  var result = fetch(url)
  .then(response => response.json())
  .then(result => {
    this.buildPeopleListing(result);
  })
  .catch(err => console.error(err));
}

buildPeopleListing = (people) => {
  var list = document.getElementById('people'); 
  list.innerHTML = "";

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
    previous.onclick = () => { this.getPeople(people.previous); }
  }

  if(people.next == null){
    next.innerText = "Last";
    next.onclick = "";
  }
  else {
    next.onclick = () => { this.getPeople(people.next); }
  }
  

}

showDetails = (person) => {
  alert(person['name'])
}

}

var facts = new StarWarsFacts();
facts.getPeople('https://swapi.dev/api/people');




