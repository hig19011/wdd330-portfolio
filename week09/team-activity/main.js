
let currentAudio = null;
let keyLength = [];

bindKeys = () => {
  let body = document.getElementsByTagName('body');
  body[0].addEventListener('keydown', e => playSound(e.keyCode));

  let keys = document.getElementsByClassName('key');
  for(let i=0;i<keys.length; i++) {
    keys[i].addEventListener('click', e => playSound(keys[i].dataset.key));    
    keyLength[keys[i].dataset.key] = 0;
  }

  let audios = document.getElementsByTagName('audio');
  for(let i=0;i<audios.length; i++) {
    audios[i].addEventListener('ended', e => stopPlayingKey(audios[i].dataset.key));
  }
}

playSound = (id) => {
  let audios = document.getElementsByTagName('audio');
  for(let i=0;i<audios.length; i++) {
    if(audios[i].dataset.key == id) {
      if(currentAudio != null && currentAudio.paused == false) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        stopPlayingKey(currentAudio.dataset.key);
      }

      audios[i].play();     
      playingKey(id);

      currentAudio = audios[i];
      return;
    }
  }
}

playingKey = (id) => {
  let keys = document.getElementsByClassName('key');
  for(let i=0;i<keys.length; i++) {
    if(keys[i].dataset.key == id) {
      moveKey(keys[i],id);

      keys[i].classList.add("playing");      
      keys[i].style.transform = "translateY("+keyLength[id]+"px)";
      return;
    }
  }
}

moveKey = (key,id) => {
  keyLength[id] += 10;
  if(keyLength[id] > 100){
    keyLength[id] = 0;
    key.style.transform = "translateY("+keyLength[id]+"px)";
  }
}

stopPlayingKey = (id) => {
  let keys = document.getElementsByClassName('key');
  for(let i=0;i<keys.length; i++) {
    if(keys[i].dataset.key == id) {
      keys[i].classList.remove("playing");    
      return;
    }
  }
}
 


bindKeys();