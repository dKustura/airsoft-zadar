import { BACKGROUND_IMAGES } from './contants';

export const getRandomArbitrary = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

const translationCoordDividers = [3, 6, 8, 10];
const translations = translationCoordDividers.map(
  (divider) => (x: number, y: number) =>
    `translate3d(${x / divider}px,${y / divider}px,0)`
);

export const getRandomSpringTranslation = () => {
  const randomIndex = getRandomInt(0, translations.length);
  return translations[randomIndex];
};

export const getBackgroundImageTransform = (
  initialX: number,
  initialY: number,
  scale: number,
  rotate: number,
  springTranslation: (x: number, y: number) => string
) => {
  return (x: number, y: number) => {
    const springTranslate = springTranslation(x, y);
    return `translate(${initialX}vw, ${initialY}px) scale(${scale}) ${springTranslate} rotate(${rotate}deg)`;
  };
};

export const getRandomBackgroundImageTransform = (
  initialX: number,
  initialY: number,
  scale: number,
  rotate: number
) =>
  getBackgroundImageTransform(
    initialX,
    initialY,
    scale,
    rotate,
    getRandomSpringTranslation()
  );

export const calculateTranslationCoords = (x: number, y: number) => [
  x - window.innerWidth / 2,
  y - window.innerHeight / 2,
];

export const getBackgroundImageScaleTransform = () =>
  getRandomArbitrary(BACKGROUND_IMAGES.MIN_SCALE, BACKGROUND_IMAGES.MAX_SCALE);

export const getBackgroundImageRotateTransform = () =>
  getRandomArbitrary(
    BACKGROUND_IMAGES.MIN_ROTATION_DEG,
    BACKGROUND_IMAGES.MAX_ROTATION_DEG
  );
export const getBackgroundImageXPosition = () =>
  getRandomArbitrary(
    BACKGROUND_IMAGES.MIN_X_PERCENTAGE,
    BACKGROUND_IMAGES.MAX_X_PERCENTAGE
  );
export const getBackgroundImageYPosition = (containerHeight: number) =>
  getRandomArbitrary(0, containerHeight * 0.6);
