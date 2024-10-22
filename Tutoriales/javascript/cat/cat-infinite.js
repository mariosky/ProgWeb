const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": "live_TuPropiaLlaveIWyiM7UbAEHu3rlteKy0N0vZccuXU2CCrRqtEEgDGH",
});

var requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};

var loading = false;

function addImages(api) {
  fetch(
    `https://api.the${api}api.com/v1/images/search?format=json&order=RANDOM&page=0&limit=5`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((image) => {
        addImage(image);
      });
      loading = false;
    });
}

function addImage(img) {
  const post = document.createElement("div");
  const image = document.createElement("img");

  image.onload = (event) => {
    const button = document.createElement("button");
    button.innerHTML = "Remove";
    button.onclick = () => {
      button.parentNode.style.animationPlayState = "running";
      button.parentNode.addEventListener("animationend", () => {
        button.parentNode.remove();
      });
    };
    console.log(image);
    image.after(button);
  };
  image.src = img.url;
  image.width = 400;
  image.className = "post-image";

  post.append(image);
  post.className = "post";
  document.querySelector("#main-images").append(post);
}

document.addEventListener("DOMContentLoaded", () => {
  addImages("cat");
  window.onscroll = () => {
    if (
      !loading &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    ) {
      loading = true;
      addImages("cat");
    }
  };
});
