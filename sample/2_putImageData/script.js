document.addEventListener("DOMContentLoaded", async () => {
  const canvas = document.querySelector("#myCanvas");
  canvas.width = 512;
  canvas.height = 512;
  canvas.style.width = 512 + "px";
  canvas.style.height = 512 + "px";
  const ctx = canvas.getContext("2d");

  const imageWidth = 512;
  const imageHeight = 512;
  const pixelSize = imageWidth * imageHeight;
  // ピクセル数*4のUint8ClampedArrayデータを作成。内部では約1MBのArrayBufferが作成される
  const data = new Uint8ClampedArray(imageWidth * imageHeight * 4);
  for (let i = 0; i < pixelSize; i++) {
    const pixelDataIndex = 4 * i;
    // 各ピクセルにランダムな色をセットする。
    // Uint8ClampedArrayは小数点の値を代入すると自動的に範囲内の整数にクランプされる
    data[pixelDataIndex] = 256 * Math.random(); // R
    data[pixelDataIndex + 1] = 256 * Math.random(); // G
    data[pixelDataIndex + 2] = 256 * Math.random(); // B
    data[pixelDataIndex + 3] = 255; // A（アルファは固定で1.0）
  }
  // Uint8ClampedArrayからImageDataを作成し、キャンバスの座標(0, 0)にセット
  ctx.putImageData(new ImageData(data, imageWidth), 0, 0);
})