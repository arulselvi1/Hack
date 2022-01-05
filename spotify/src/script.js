import login from "./login.js";
import getplaylists from "./getplaylists.js";
import getuserid from "./getuserid.js";
import getfeaturedplaylists from "./getfeaturedplaylists.js";
import search from "./search.js";

let access_token = "";
let query = [...window.location.href];
let str = [...window.location.href];
let position = str.indexOf("#");

if (query[position] == "#") {
  //alert("hai")
  query[position] = "?";
  query = query.join("");
  location.replace(query);
}
query = window.location.search;
console.log(query);
if (query.length > 0) {
  const params = new URLSearchParams(query);
  access_token = params.has("access_token") ? params.get("access_token") : "";
}
const client_id = "18c3bd9f7cd3465daaea8ff6337e6a21";
const client_secret = "80c99967bf3f486bbf0e8fd2dfb5d1c4";
const grant_type = "authorization_code";
let user_id = "";

if (access_token.length > 0) {
  setTimeout(() => {
    location.replace(
      `https://mohanraj194.github.io/Guvi_task/hackathon/spotify/`
    );
  }, 3600000);
  document.getElementById("wait").hidden = true;
  document.getElementById("login").hidden = true;
  document.getElementById("content").hidden = false;
  document.getElementById("myplaylists").onclick = async () => {
    let data = await getuserid(access_token);
    user_id = data.id;
    let url = `https://api.spotify.com/v1/me/playlists?access_token=${access_token}&limit=9&offset=0`;
    getplaylists(url, access_token, user_id, "myplaylist");
  };
  document.getElementById("featuredplaylist").onclick = () => {
    getfeaturedplaylists(access_token, user_id, "featuredplaylist");
  };
  document.getElementById("tracksbutton").onclick = () => {
    search(access_token, user_id);
  };
  document.getElementById("myplaylists").click();
} else {
  let redirect_uri = "https://github.com/arulselvi1/Hack1/spotify/";
  let scope =
    "user-read-playback-position user-read-private user-read-email user-library-read user-library-modify user-top-read playlist-read-collaborative playlist-modify-public playlist-modify-private ugc-image-upload user-follow-read user-follow-modify user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played";
  redirect_uri = encodeURIComponent(redirect_uri);
  scope = encodeURIComponent(scope);
  document.getElementById("login").hidden = true;
  document.getElementById("content").hidden = true;
  document.getElementById("wait").hidden = false;
  login(redirect_uri, "token", client_id, scope);
}
