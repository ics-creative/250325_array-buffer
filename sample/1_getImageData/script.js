document.addEventListener("DOMContentLoaded", async () => {
  const canvas = document.querySelector("#myCanvas");
  const imageWidth = 256;
  const imageHeight = 256;
  canvas.width = imageWidth;
  canvas.height = imageHeight;
  const ctx = canvas.getContext("2d");
  const image = await new Promise((resolve) => {
    const image = document.querySelector("#myImage");
    image.onload = () => resolve(image);
    image.src = "./image.jpg";
  });
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Canvasの画素のImageDataをgetImageData()で取得
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // 画素のデータを参照できるビュー配列、Uint8ClampedArrayを取得
  const data = imageData.data;

  // 1ピクセルにつき4バイト（4要素）のUint8ClampedArrayデータが返却される。
  const pixelLength = data.length / 4;
  // すべてのピクセルについて処理
  for (let i = 0; i < pixelLength; i += 1) {
    // 注目ピクセルの最初の要素（R）のTypedArray内の位置
    const pixelId = i * 4;
    // モノクロ化には様々な方法があるが、今回は単純に平均をとる
    const average = (data[pixelId] + data[pixelId + 1] + data[pixelId + 2]) / 3;
    data[pixelId] = average; // R
    data[pixelId + 1] = average; // G
    data[pixelId + 2] = average; // B
    // data[i + 3]はアルファのデータのためそのまま変更しない
  }

  // 変更したピクセルのデータをCanvasにセット
  ctx.putImageData(imageData, 0, 0);
})