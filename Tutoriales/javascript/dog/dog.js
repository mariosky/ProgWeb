function setImage(api){
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "live_BWDYdpGKzi2Qw1CDRgWDsNIWyiM7UbAEHu3rlteKy0N0vZccuXU2CCrRqtEEgDGH",
  });

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  fetch(
    `https://api.the${api}api.com/v1/images/search?format=json&order=RANDOM`,
    //`https://api.the${api}api.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1`,
    requestOptions,
    //`https://api.the${button.dataset.api}api.com/v1/images/search`,
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector("#main-img").src = data[0].url;
    });
}
  
document.addEventListener("DOMContentLoaded", () => {
        
  document.querySelector("#fav-img").src = window.localStorage.getItem("fav-img");
  document.querySelector("#main-img").src = window.localStorage.getItem("fav-img");
  document.querySelector("#fav-button").onclick = () => {
        console.log('fav')
        favImgUrl = document.querySelector("#main-img").src;
        window.localStorage.setItem("fav-img",favImgUrl);
        document.querySelector("#fav-img").src = favImgUrl;
   } 

  document.querySelectorAll(".api-button").forEach((button) => {
    button.onclick = () => {
      console.log(button.dataset.api);
      setImage(button.dataset.api);
    };
  });

});
