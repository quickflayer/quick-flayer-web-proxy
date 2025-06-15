interface CroppedAreaPixels {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function getCroppedImg(
  imageSrc: string | ArrayBuffer,
  croppedAreaPixels: CroppedAreaPixels,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';

    const setImageSrc = (src: string) => {
      image.src = src;
    };

    if (typeof imageSrc === 'string') {
      setImageSrc(imageSrc);
    } else {
      const reader = new FileReader();
      reader.onloadend = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(new Blob([imageSrc]));
    }

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Canvas context is not available.'));
        return;
      }

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
      );

      const formatMatch = imageSrc
        .toString()
        .match(/data:image\/(png|jpeg|jpg);/);
      const format = formatMatch ? formatMatch[1] : 'png';
      const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`;

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty.'));
          return;
        }
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, mimeType);
    };

    image.onerror = reject;
  });
}
