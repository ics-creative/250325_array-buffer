document.addEventListener("DOMContentLoaded", async () => {
  const canvas = document.querySelector("#myCanvas");
  canvas.width = 512;
  canvas.height = 512;
  canvas.style.width = 512 + "px";
  canvas.style.height = 512 + "px";
  const ctx = canvas.getContext("2d");
  const image = await new Promise((resolve) => {
    const image = document.querySelector("#myImage");
    image.onload = () => resolve(image);
    image.src = "./image.jpg";
  });
  ctx.drawImage(image, 0, 0);

  // Canvasの画素のImageDataをgetImageData()で取得
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // 画素のデータを参照できるビュー配列、Uint8ClampedArrayを取得
  const data = imageData.data;
  // 1ピクセルにつき4バイト（4要素）のUint8ClampedArrayデータが返却される。ピクセル数は単純にcanvas.width * canvas.heightでも取得可能
  const pixelLength = data.length / 4;
  // すべてのピクセルについて処理
  for (let i = 0; i < pixelLength; i += 1) {
    // 注目ピクセルの最初の要素（R）のTypedArray内の位置
    const pixelDataIndex = i * 4;
    // モノクロ化には様々な方法があるが、今回は単純に平均をとる
    const average = (data[pixelDataIndex] + data[pixelDataIndex + 1] + data[pixelDataIndex + 2]) / 3;
    data[pixelDataIndex] = average; // R
    data[pixelDataIndex + 1] = average; // G
    data[pixelDataIndex + 2] = average; // B
    // data[i + 3]はアルファのデータのためそのまま変更しない
  }
  ctx.putImageData(imageData, 0, 0);
})