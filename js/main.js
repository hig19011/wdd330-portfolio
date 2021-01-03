

function populateEntries(links){
  var entries = document.getElementById("entries");
  links.forEach(linkInfo => {
    var entry = document.createElement("li");
    var link = createLink(linkInfo);
    entry.appendChild(link);
    entries.appendChild(entry);
  });  
}

function createLink(linkInfo){
  var link = document.createElement("a");
  link.href=linkInfo.url;
  link.text=linkInfo.label;
  return link;
}