
// ============================================================
// AJEET'S FAVORITE SONGS
// Music Player + Admin Login + Add + Delete
// ============================================================


// ============================================================
// ADMIN LOGIN
// ============================================================

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Ajeet@123";

let isAdmin = false;


// ============================================================
// DEMO AUDIO
// ============================================================

const DEMO = (n) =>
  `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${n}.mp3`;


// ============================================================
// SONGS
// ============================================================

const songs = [

  {
    title: "Kesariya",
    artist: "Arijit Singh",
    movie: "Brahmastra",
    term: "Kesariya Arijit Singh Brahmastra",
    fallback: DEMO(1),
    color: "#ff7a3d"
  },

  {
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    movie: "Aashiqui 2",
    term: "Tum Hi Ho Arijit Singh Aashiqui 2",
    fallback: DEMO(2),
    color: "#e84393"
  },

  {
    title: "Channa Mereya",
    artist: "Arijit Singh",
    movie: "Ae Dil Hai Mushkil",
    term: "Channa Mereya Arijit Singh",
    fallback: DEMO(3),
    color: "#6c5ce7"
  },

  {
    title: "Kal Ho Naa Ho",
    artist: "Sonu Nigam",
    movie: "Kal Ho Naa Ho",
    term: "Kal Ho Naa Ho Sonu Nigam",
    fallback: DEMO(4),
    color: "#00b894"
  },

  {
    title: "Raataan Lambiyan",
    artist: "Jubin Nautiyal, Asees Kaur",
    movie: "Shershaah",
    term: "Raataan Lambiyan Jubin Nautiyal",
    fallback: DEMO(5),
    color: "#fdcb6e"
  },

  {
    title: "Apna Bana Le",
    artist: "Arijit Singh",
    movie: "Bhediya",
    term: "Apna Bana Le Arijit Singh Bhediya",
    fallback: DEMO(6),
    color: "#0984e3"
  },

  {
    title: "Gerua",
    artist: "Arijit Singh, Antara Mitra",
    movie: "Dilwale",
    term: "Gerua Arijit Singh Dilwale",
    fallback: DEMO(7),
    color: "#d63031"
  },

  {
    title: "Kabira",
    artist: "Tochi Raina, Rekha Bhardwaj",
    movie: "Yeh Jawaani Hai Deewani",
    term: "Kabira Yeh Jawaani Hai Deewani",
    fallback: DEMO(8),
    color: "#55efc4"
  },

  {
    title: "Chaiyya Chaiyya",
    artist: "Sukhwinder Singh, Sapna Awasthi",
    movie: "Dil Se",
    term: "Chaiyya Chaiyya Dil Se Sukhwinder Singh",
    fallback: DEMO(9),
    color: "#a29bfe"
  },

  {
    title: "Tujhe Dekha To",
    artist: "Kumar Sanu, Lata Mangeshkar",
    movie: "Dilwale Dulhania Le Jayenge",
    term: "Tujhe Dekha To Yeh Jana Sanam",
    fallback: DEMO(10),
    color: "#fab1a0"
  }

];


// ============================================================
// ELEMENTS
// ============================================================

const $ = (id) =>
  document.getElementById(id);


const audio = $("audio");

const playBtn = $("play");
const progress = $("progress");
const volume = $("volume");

const muteBtn = $("mute");

const list = $("list");

const art = $("art");

const autoplay = $("autoplay");

const status = $("status");


// Admin

const adminBtn = $("adminBtn");
const logoutBtn = $("logoutBtn");

const adminModal = $("adminModal");
const closeModal = $("closeModal");

const adminForm = $("adminForm");

const adminUsername = $("adminUsername");
const adminPassword = $("adminPassword");

const loginError = $("loginError");

const adminUpload = $("adminUpload");
const adminStatus = $("adminStatus");


// ============================================================
// PLAYER VARIABLES
// ============================================================

let index = 0;

let loadId = 0;

let usingFallback = false;

const durations = {};


// ============================================================
// FORMAT TIME
// ============================================================

const fmt = (seconds) => {

  return isFinite(seconds)
    ? `${Math.floor(seconds / 60)}:${String(
        Math.floor(seconds % 60)
      ).padStart(2, "0")}`
    : "0:00";

};


// ============================================================
// SLIDER
// ============================================================

const setFill = (input) => {

  const min = Number(input.min);

  const max = Number(input.max);

  const value = Number(input.value);

  const percentage =
    ((value - min) / (max - min)) * 100;

  input.style.setProperty(
    "--pct",
    `${percentage}%`
  );

};


// ============================================================
// ESCAPE HTML
// ============================================================

const esc = (text) => {

  return String(text).replace(
    /[&<>"]/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;"
      }[char])
  );

};


// ============================================================
// ADMIN UI
// ============================================================

function updateAdminUI() {

  if (isAdmin) {

    adminBtn.classList.add("hidden");

    logoutBtn.classList.remove("hidden");

    adminUpload.classList.remove("hidden");

    adminStatus.classList.remove("hidden");

  } else {

    adminBtn.classList.remove("hidden");

    logoutBtn.classList.add("hidden");

    adminUpload.classList.add("hidden");

    adminStatus.classList.add("hidden");

  }


  renderList();

}


// ============================================================
// ADMIN LOGIN MODAL
// ============================================================

adminBtn.addEventListener("click", () => {

  adminModal.classList.remove("hidden");

  adminUsername.focus();

});


closeModal.addEventListener("click", () => {

  adminModal.classList.add("hidden");

  loginError.textContent = "";

  adminForm.reset();

});


adminModal.addEventListener("click", (event) => {

  if (event.target === adminModal) {

    adminModal.classList.add("hidden");

    loginError.textContent = "";

  }

});


// ============================================================
// ADMIN LOGIN
// ============================================================

adminForm.addEventListener("submit", (event) => {

  event.preventDefault();


  const username =
    adminUsername.value.trim();

  const password =
    adminPassword.value;


  if (
    username === ADMIN_USERNAME &&
    password === ADMIN_PASSWORD
  ) {

    isAdmin = true;


    updateAdminUI();


    adminModal.classList.add("hidden");


    adminForm.reset();


    loginError.textContent = "";


    status.textContent =
      "Admin mode enabled. You can add or delete songs.";

  } else {

    loginError.textContent =
      "Invalid username or password.";

  }

});


// ============================================================
// ADMIN LOGOUT
// ============================================================

logoutBtn.addEventListener("click", () => {

  isAdmin = false;

  updateAdminUI();

  status.textContent = "";

});


// ============================================================
// GET SONG PREVIEW
// ============================================================

async function getPreview(song) {

  if (song.preview) {
    return song.preview;
  }


  const url =
    `https://itunes.apple.com/search?term=` +
    `${encodeURIComponent(song.term)}` +
    `&entity=song&country=IN&limit=5`;


  const response =
    await fetch(url);


  if (!response.ok) {
    throw new Error("Request failed");
  }


  const data =
    await response.json();


  const first =
    song.title
      .toLowerCase()
      .split(" ")[0];


  const hit =
    data.results.find(
      (result) =>
        result.previewUrl &&
        result.trackName
          .toLowerCase()
          .includes(first)
    )
    ||
    data.results.find(
      (result) => result.previewUrl
    );


  if (!hit) {
    throw new Error("No preview found");
  }


  song.preview =
    hit.previewUrl;


  song.cover =
    hit.artworkUrl100.replace(
      "100x100",
      "400x400"
    );


  return song.preview;

}


// ============================================================
// RENDER PLAYLIST
// ============================================================

function renderList() {

  list.innerHTML = "";


  songs.forEach((song, i) => {

    const li =
      document.createElement("li");


    li.className =
      i === index ? "active" : "";


    li.tabIndex = 0;


    li.innerHTML = `

      <span
        class="dot"
        style="background:${song.color}"
      ></span>

      <div class="info">

        <div class="name">
          ${esc(song.title)}
        </div>

        <div class="by">
          ${esc(song.artist)}
        </div>

      </div>

      <span class="time">
        ${
          durations[i]
            ? fmt(durations[i])
            : "--:--"
        }
      </span>

      ${
        isAdmin
          ? `
            <button
              class="delete-song"
              title="Delete song"
              aria-label="Delete ${esc(song.title)}"
            >
              🗑️
            </button>
          `
          : ""
      }

    `;


    // Play song when playlist item is clicked

    li.addEventListener("click", (event) => {

      if (
        event.target.closest(".delete-song")
      ) {
        return;
      }


      loadSong(i, true);

    });


    // Delete button

    if (isAdmin) {

      const deleteBtn =
        li.querySelector(".delete-song");


      deleteBtn.addEventListener(
        "click",
        (event) => {

          event.stopPropagation();

          deleteSong(i);

        }
      );

    }


    list.appendChild(li);

  });

}


// ============================================================
// DELETE SONG
// ============================================================

function deleteSong(songIndex) {

  // Security check

  if (!isAdmin) {
    return;
  }


  const song =
    songs[songIndex];


  if (!song) {
    return;
  }


  const confirmed =
    confirm(
      `Delete "${song.title}" from the playlist?`
    );


  if (!confirmed) {
    return;
  }


  // Stop current audio if deleting current song

  const deletingCurrent =
    songIndex === index;


  if (deletingCurrent) {

    audio.pause();

    audio.removeAttribute("src");

    audio.load();

  }


  // Release uploaded file memory

  if (song.file) {

    URL.revokeObjectURL(song.file);

  }


  // Remove duration

  delete durations[songIndex];


  // Remove song

  songs.splice(songIndex, 1);


  // If no songs remain

  if (songs.length === 0) {

    index = 0;

    list.innerHTML = "";

    $("title").textContent =
      "No songs";

    $("artist").textContent = "";

    $("movie").textContent = "";

    $("current").textContent =
      "0:00";

    $("duration").textContent =
      "0:00";

    progress.value = 0;

    setFill(progress);

    status.textContent =
      "Playlist is empty.";

    return;

  }


  // Fix current index

  if (songIndex < index) {

    index--;

  }


  if (index >= songs.length) {

    index = songs.length - 1;

  }


  renderList();


  // Load another song

  if (deletingCurrent) {

    loadSong(index, false);

  }


  status.textContent =
    `"${song.title}" deleted successfully.`;

}


// ============================================================
// PAINT ART
// ============================================================

function paintArt(song) {

  const hole =
    "radial-gradient(circle at 50% 50%, " +
    "#14101f 7%, transparent 8%)";


  if (song.cover) {

    art.style.background =
      `${hole}, url("${song.cover}") center/cover`;

  } else {

    art.style.background =
      `${hole}, ${song.color}`;

  }

}


// ============================================================
// LOAD SONG
// ============================================================

async function loadSong(
  i,
  autoStart = false
) {

  if (!songs.length) {
    return;
  }


  index =
    (i + songs.length) %
    songs.length;


  const song =
    songs[index];


  const mine =
    ++loadId;


  audio.pause();


  usingFallback = false;


  $("title").textContent =
    song.title;


  $("artist").textContent =
    song.artist;


  $("movie").textContent =
    song.movie;


  paintArt(song);


  progress.value = 0;

  setFill(progress);


  $("current").textContent =
    "0:00";


  $("duration").textContent =
    durations[index]
      ? fmt(durations[index])
      : "0:00";


  renderList();


  let src;


  // Uploaded song

  if (song.file) {

    src = song.file;

    status.textContent =
      "Playing song from your device.";

  }


  // Online preview

  else {

    status.textContent =
      "Loading song...";


    try {

      src =
        await getPreview(song);


      status.textContent =
        "30-second preview";


      paintArt(song);

    }

    catch {

      src =
        song.fallback;


      usingFallback = true;


      status.textContent =
        "Could not fetch this song. " +
        "Playing a demo track.";

    }

  }


  if (mine !== loadId) {
    return;
  }


  audio.src = src;


  if (autoStart) {
    play();
  }

}


// ============================================================
// PLAY / PAUSE
// ============================================================

function play() {

  audio
    .play()
    .catch(() => {});

}


function pause() {

  audio.pause();

}


// ============================================================
// NEXT / PREVIOUS
// ============================================================

const next = () => {

  if (songs.length) {
    loadSong(index + 1, true);
  }

};


const prev = () => {

  if (!songs.length) {
    return;
  }


  if (audio.currentTime > 3) {

    audio.currentTime = 0;

  } else {

    loadSong(index - 1, true);

  }

};


// ============================================================
// AUDIO EVENTS
// ============================================================

audio.addEventListener("play", () => {

  playBtn.innerHTML = "⏸";

  art.classList.add("spin");

});


audio.addEventListener("pause", () => {

  playBtn.innerHTML = "▶";

  art.classList.remove("spin");

});


audio.addEventListener(
  "loadedmetadata",
  () => {

    durations[index] =
      audio.duration;


    $("duration").textContent =
      fmt(audio.duration);


    renderList();

  }
);


audio.addEventListener(
  "timeupdate",
  () => {

    if (!audio.duration) {
      return;
    }


    progress.value =
      (audio.currentTime /
        audio.duration) * 100;


    setFill(progress);


    $("current").textContent =
      fmt(audio.currentTime);

  }
);


audio.addEventListener(
  "ended",
  () => {

    if (autoplay.checked) {
      next();
    }

  }
);


audio.addEventListener(
  "error",
  () => {

    const song =
      songs[index];


    if (
      !usingFallback &&
      song &&
      song.fallback
    ) {

      usingFallback = true;


      status.textContent =
        "Song could not load. " +
        "Playing demo track instead.";


      audio.src =
        song.fallback;


      play();

    } else {

      status.textContent =
        "This song could not be played.";

    }

  }
);


// ============================================================
// PLAYER CONTROLS
// ============================================================

playBtn.onclick = () => {

  audio.paused
    ? play()
    : pause();

};


$("next").onclick = next;

$("prev").onclick = prev;


// ============================================================
// PROGRESS
// ============================================================

progress.addEventListener(
  "input",
  () => {

    if (audio.duration) {

      audio.currentTime =
        (progress.value / 100) *
        audio.duration;

    }


    setFill(progress);

  }
);


// ============================================================
// VOLUME
// ============================================================

volume.addEventListener(
  "input",
  () => {

    audio.volume =
      Number(volume.value);


    audio.muted = false;


    muteBtn.innerHTML =
      audio.volume === 0
        ? "🔇"
        : "🔊";


    setFill(volume);

  }
);


// ============================================================
// MUTE
// ============================================================

muteBtn.onclick = () => {

  audio.muted =
    !audio.muted;


  muteBtn.innerHTML =
    audio.muted
      ? "🔇"
      : "🔊";

};


// ============================================================
// ADMIN ADD SONG
// ============================================================

$("files").addEventListener(
  "change",
  (event) => {

    // Admin check

    if (!isAdmin) {

      event.target.value = "";

      return;

    }


    const files =
      [...event.target.files];


    if (!files.length) {
      return;
    }


    const colors = [
      "#e17055",
      "#00cec9",
      "#fd79a8",
      "#74b9ff",
      "#a29bfe",
      "#55efc4"
    ];


    const firstNew =
      songs.length;


    files.forEach((file, k) => {

      const objectURL =
        URL.createObjectURL(file);


      songs.push({

        title:
          file.name.replace(
            /\.[^.]+$/,
            ""
          ),

        artist:
          "My song",

        movie:
          "From your device",

        file:
          objectURL,

        color:
          colors[
            k % colors.length
          ]

      });

    });


    renderList();


    loadSong(
      firstNew,
      true
    );


    event.target.value = "";

  }
);


// ============================================================
// KEYBOARD CONTROLS
// ============================================================

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.target.tagName === "INPUT" ||
      event.target.tagName === "BUTTON"
    ) {
      return;
    }


    if (event.code === "Space") {

      event.preventDefault();

      playBtn.click();

    }


    if (event.code === "ArrowRight") {
      next();
    }


    if (event.code === "ArrowLeft") {
      prev();
    }

  }
);


// ============================================================
// INITIALIZATION
// ============================================================

audio.volume =
  Number(volume.value);


setFill(volume);

setFill(progress);


isAdmin = false;

updateAdminUI();

loadSong(0);