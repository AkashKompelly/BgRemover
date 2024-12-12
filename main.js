let btn = document.getElementById("image-submit-btn");
let image = document.getElementById("input-img");
let container = document.getElementsByClassName("input-container")[0];
let imageUrl;
let apiKey = "YMXHW5yCnLmknhbMWhDXrEBZ";
let imageObject;
let BgRemovedImg;
image.addEventListener("change", function (e) {
  imageObject = e.target.files[0];
  container.removeChild(BgRemovedImg);
//   imageUrl = URL.createObjectURL(e.target.files[0]);
//   let previewImg = document.createElement("img");
//   previewImg.src = imageUrl;
//   previewImg.width = 300;
//   container.appendChild(previewImg);
});


btn.addEventListener("click", function () {

    const formData = new FormData();
    formData.append("image_file", imageObject);
    formData.append("size", "auto");

    fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": apiKey },
    body: formData,
  })
    .then((res) => {
        return res.blob();
    })
    .then((finalResult)=>{
       BgRemovedImg =  document.createElement("img");
       let downloadButton = document.createElement("a");
       downloadButton.href = URL.createObjectURL(finalResult);
       downloadButton.download = "no-bg.png";
       container.appendChild(downloadButton);
       BgRemovedImg.src = URL.createObjectURL(finalResult);
       BgRemovedImg.width = 300;
       BgRemovedImg.classList.add("m-auto");
       container.appendChild(BgRemovedImg);
       downloadButton.click();
    })
    .catch((error) => {
      console.log(error);
    });
});
