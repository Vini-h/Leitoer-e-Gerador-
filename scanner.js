const scannerDiv = document.querySelector(".scanner");

const camera = scannerDiv.querySelector("h1 .fa-camera");
const stopCam = scannerDiv.querySelector("h1 .fa-circle-stop");

const form = scannerDiv.querySelector(".scanner-form");
const p = form.querySelector("p");
const img = form.querySelector("img");
const video = form.querySelector("video");
const content = form.querySelector(".content");

const textarea = scannerDiv.querySelector(".scanner-details textarea");
const copyBtn = scannerDiv.querySelector(".scanner-details .copy");
const closeBtn = scannerDiv.querySelector(".scanner-details .close");

// Scan QR Code Camera
let scanner;

camera.addEventListener("click", () => {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      camera.style.display = "none";
      form.classList.add("pointerEvents");
      p.innerText = "Lendo QR Code...";

      scanner = new Instascan.Scanner({ video: video });

      Instascan.Camera.getCameras()
        .then(cameras => {
          if (cameras.length > 1) { // Check if there are multiple cameras
            // Select the rear camera (usually the second camera)
            scanner.start(cameras[1]).then(() => {
              form.classList.add("active-video");
              stopCam.style.display = "inline-block";
            })
          } else if (cameras.length === 1) {
            // If there's only one camera, use it
            scanner.start(cameras[0]).then(() => {
              form.classList.add("active-video");
              stopCam.style.display = "inline-block";
            })
          } else {
            console.log("No Cameras Found");
          }
        })
        .catch(err => console.error(err))

      // addListener not addEventListener
      scanner.addListener("scan", c => {
        scannerDiv.classList.add("active");
        textarea.innerText = c;
      })
    })
    .catch(error => {
      console.log("Error accessing camera: ", error);
    });
})

function onScanSuccess(scannedId) {
  const idTextarea = textarea;
  idTextarea.value = scannedId;
  const consultaForm = scannerDiv.querySelector(".scanner-form");
  consultaForm.submit();
}

// Copy
copyBtn.addEventListener("click", () => {
  let text = textarea.textContent;
  navigator.clipboard.writeText(text);
})

// Close
closeBtn.addEventListener("click", () => stopScan());
stopCam.addEventListener("click", () => stopScan());

// Stop Scan
function stopScan() {
  p.innerText = "Ler QR Code";

  camera.style.display = "inline-block";
  stopCam.style.display = "none";

  form.classList.remove("active-video", "active-img", "pointerEvents");
  scannerDiv.classList.remove("active");

  if (scanner) scanner.stop();
}