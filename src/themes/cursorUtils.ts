import type { ThemeKey } from "./themeEngine";
import { cursorMap } from "./cursorMap";

const cursorCache: Partial<Record<ThemeKey, string>> = {};
const pendingLoad: Partial<Record<ThemeKey, Promise<string>>> = {};

const createCursorDataUrl = (src: string, size = 64): Promise<string> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context unavailable"));
        return;
      }

      const scale = Math.min(size / image.width, size / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      const x = (size - width) / 2;
      const y = (size - height) / 2;

      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(image, x, y, width, height);
      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = () => reject(new Error(`Failed to load cursor image: ${src}`));
    image.src = src;
  });

const loadCursor = (themeKey: ThemeKey) => {
  if (!pendingLoad[themeKey]) {
    pendingLoad[themeKey] = createCursorDataUrl(cursorMap[themeKey], 64).then((dataUrl) => {
      cursorCache[themeKey] = dataUrl;
      return dataUrl;
    });
  }

  return pendingLoad[themeKey]!;
};

export const preloadCursor = (themeKey: ThemeKey) => {
  void loadCursor(themeKey).catch(() => {
    delete pendingLoad[themeKey];
  });
};

export const getCursorDataUrl = async (themeKey: ThemeKey) => {
  if (cursorCache[themeKey]) {
    return cursorCache[themeKey]!;
  }

  return await loadCursor(themeKey);
};

preloadCursor("naruto");
