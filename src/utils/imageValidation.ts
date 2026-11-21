export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
// Keep the JSON image field well below Vercel's 4.5 MB Function request limit.
export const MAX_COMPRESSED_IMAGE_DATA_URL_BYTES = 3_500_000;
export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateWasteImage(file: File): ValidationResult {
  if (!file) {
    return { isValid: false, error: 'No image file provided.' };
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return {
      isValid: false,
      error: 'Invalid file format. Please upload JPG, JPEG, PNG, or WEBP images.',
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      isValid: false,
      error: `File is too large (${sizeMB} MB). Maximum allowed size is 10 MB.`,
    };
  }

  return { isValid: true };
}

/**
 * Resizes and compresses an image before transmission to save bandwidth
 * and ensure fast AI processing.
 */
export async function compressImage(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not prepare image for upload'));
          return;
        }

        const qualities = [...new Set([quality, 0.68, 0.55, 0.42, 0.32])];
        for (let resizeAttempt = 0; resizeAttempt < 12; resizeAttempt += 1) {
          canvas.width = width;
          canvas.height = height;
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          for (const outputQuality of qualities) {
            const compressedDataUrl = canvas.toDataURL('image/jpeg', outputQuality);
            // Data URLs contain only ASCII characters, so length equals their UTF-8 byte size.
            if (compressedDataUrl.length <= MAX_COMPRESSED_IMAGE_DATA_URL_BYTES) {
              resolve(compressedDataUrl);
              return;
            }
          }

          if (Math.max(width, height) <= 256) break;
          const scale = Math.max(0.55, Math.min(0.82, Math.sqrt(
            MAX_COMPRESSED_IMAGE_DATA_URL_BYTES / canvas.toDataURL('image/jpeg', qualities[qualities.length - 1]).length
          ) * 0.9));
          width = Math.max(1, Math.floor(width * scale));
          height = Math.max(1, Math.floor(height * scale));
        }

        reject(new Error('Could not compress this image small enough to upload. Please choose a smaller image.'));
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}
