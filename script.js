const musicBar = document.getElementById("bar")
const title = document.getElementById("songTitle")
const author = document.getElementById("songAuthor")
const cover = document.getElementById("songCover")
const audio = document.getElementById("songAudio")
const totalDuration = document.getElementById("totalDuration")
const img = document.getElementById("imgPlayStop")
const currentDuration = document.getElementById("currentDuration")

function AnimateMusicBar(){
    let value = musicBar.value
    musicBar.style.backgroundSize = value + "% 100%"
    audio.currentTime = (musicBar.value/100) * duration 
}

//Get data list from json
async function getData(path){
    const json = await fetch(path)
    const data = await json.json()
    return data
}

const stopPlay = document.getElementById("stop/play")
stopPlay.addEventListener('click', StopPlay)

function StopPlay(){
    stopPlay.classList.toggle("active")
    if (!stopPlay.classList.contains("active")){
        img.setAttribute("src", "./imgs/play.png")
        audio.pause()
    } else{
        CurrentTime()
        img.setAttribute("src", "./imgs/pause.png")
        audio.play()
    }
}

let id = 0
let duration
let size
getData("./data.json").then(songs=>{
    size = songs.length;
    drawPlayer(songs)})

function drawPlayer(songs){
    let infoSong = songs[id]
    title.innerText = infoSong.name
    author.innerText = infoSong.author
    cover.setAttribute('src', infoSong.cover)
    audio.setAttribute('src', infoSong.song)
    audio.onloadedmetadata = () =>{
        duration = Math.floor(audio.duration)
        let minutes = Math.floor(duration / 60)
        let seconds = duration % 60
        totalDuration.innerText = `${minutes}:${seconds}`
    }
    audio.play()
}

const next = document.getElementById("nextSong")
next.addEventListener('click', () => {ChangeSong(true)})
const prev = document.getElementById("prevSong")
prev.addEventListener('click', () => {ChangeSong(false)})

function ChangeSong(bool){
    if (bool){
        id++
    }else{
        id--
    }
    if (id >= size || id < 0){
        id = 0
    }
    getData("./data.json").then(songs=>{drawPlayer(songs)})
    stopPlay.classList.add('active')
    img.setAttribute("src", "./imgs/pause.png")
}

function CurrentTime(){
    let time = audio.currentTime
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time % 60)
    let percentage = Math.floor((time/duration)*100)
    musicBar.style.backgroundSize = percentage + '% 100%'
    if (seconds < 10){
        currentDuration.innerText = `${minutes}:0${seconds}`
    }else{
        currentDuration.innerText = `${minutes}:${seconds}`
    }
    if (percentage === 100){
        ChangeSong(true)
    }
    setInterval(CurrentTime, 1000)

}


function setTime(){
    audio.oncanplay = function(){
        audio.currentTime = (musicBar.value/100) * duration
        
    }
}