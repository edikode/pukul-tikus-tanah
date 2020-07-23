const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.querySelector('.papan-skor');
const pop = document.querySelector('#pop');

let tanahSebelumnya;
let selesai;
let skor;
let timeleft;

function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[t];
  if (tRandom == tanahSebelumnya) {
    randomTanah(tanah);
  }
  tanahSebelumnya = tRandom;
  return tRandom;
}

function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function munculkanTikus() {
  const tRandom = randomTanah(tanah);
  const wRandom = randomWaktu(300, 600);
  tRandom.classList.add('muncul');

  setTimeout(() => {
    tRandom.classList.remove('muncul');
    if (!selesai) {
      munculkanTikus();
    }
  }, wRandom);
}

function mulai() {
  selesai = false;
  let waktu = 10; // detik
  skor = 0;
  papanSkor.textContent = 0;
  countdown(waktu-1);
  munculkanTikus();
  setTimeout(() => {
    selesai = true;
    alert('Permainan selesai Skor anda ' + skor)
  }, (waktu+1) * 1000);
}

function pukul() {
  skor++;
  this.parentNode.classList.remove('muncul');
  pop.play();
  papanSkor.textContent = skor;
}

tikus.forEach(t => {
  t.addEventListener('click', pukul);
});

function countdown(waktuleft) {
  var downloadTimer = setInterval(function(){
    document.getElementById("countdown").innerHTML = waktuleft + " Detik";
    waktuleft -= 1;
    if(waktuleft < 0){
      clearInterval(downloadTimer);
      document.getElementById("countdown").innerHTML = "Waktu Habis";
    }
  }, 1000);
}