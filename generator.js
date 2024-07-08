const generatorDiv = document.querySelector(".generator");
const qrInput = generatorDiv.querySelector(".generator-form input");
const qrImg = generatorDiv.querySelector(".generator-img img");
const downloadBtn = generatorDiv.querySelector(".generator-btn.btn-link");

let imgURL = '';

document.addEventListener("DOMContentLoaded", () => {
  let qrValue = qrInput.value;
  if (qrValue.trim()) {
    // if the value is valid -> using qrserver api to generate QR code
    imgURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.src = imgURL;

    qrImg.addEventListener("load", () => {
      generatorDiv.classList.add("active");
    })
  }
})

qrInput.addEventListener("change", () => {
  let qrValue = qrInput.value;
  if (!qrValue.trim()) return; // if value is empty -> stop here

  // if the value is valid -> using qrserver api to generate QR code
  imgURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
  qrImg.src = imgURL;

  qrImg.addEventListener("load", () => {
    generatorDiv.classList.add("active");
  })
})
// Dowload QR Code
downloadBtn.addEventListener("click", () => {
  if (!imgURL) return;
  fetchImage(imgURL)
})

function fetchImage(url) {
  fetch(url).then(res => res.blob()).then(file => {
    let tempFile = URL.createObjectURL(file);
    let file_name = url.split("/").pop().split(".")[0];
    let extension = file.type.split("/")[1];
    download(tempFile, file_name, extension);
  })
    .catch(() => imgURL = '');
}

function download(tempFile, file_name, extension) {
  let a = document.createElement('a');
  a.href = tempFile;
  a.download = `${file_name}.${extension}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// if value is empty -> remove active class
qrInput.addEventListener("input", () => {
  if (!qrInput.value.trim())
    return generatorDiv.classList.remove("active");
})