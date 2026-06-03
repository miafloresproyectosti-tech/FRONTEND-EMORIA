import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

const EMOCIONES = ["Enojo", "Disgusto", "Miedo", "Feliz", "Triste", "Sorpresa", "Neutral"];

export function useEmotionModel() {
  const [modelo, setModelo] = useState<tf.GraphModel | null>(null);

  useEffect(() => {
    tf.loadGraphModel('/modelo_tfjs_v3/model.json').then((m) => {
      setModelo(m);
      console.log("Modelo cargado ✅");
    });
  }, []);

  const predecir = async (imageData: string): Promise<string> => {
    if (!modelo) return "Modelo no cargado";

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const tensor = tf.tidy(() => {
          return tf.browser
            .fromPixels(img, 1)
            .resizeBilinear([48, 48])
            .toFloat()
            .div(255.0)
            .expandDims(0);
        });

        const prediccion = modelo.predict(tensor) as tf.Tensor;
        const indice = prediccion.argMax(-1).dataSync()[0];
        tensor.dispose();
        prediccion.dispose();
        resolve(EMOCIONES[indice]);
      };
      img.src = imageData;
    });
  };

  return { modelo, predecir };
}