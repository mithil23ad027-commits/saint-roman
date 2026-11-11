// Part B - 23-page continuous presentation data
// Auto-imported via Vite's import.meta.glob for optimal bundling

const partBImages = import.meta.glob('../assets/part-b/slide-*.png', {
  eager: true,
  import: 'default',
});

export const PART_B_SLIDES = Array.from({ length: 23 }, (_, index) => {
  const slideNumber = index + 1;
  const imageKey = `../assets/part-b/slide-${slideNumber}.png`;
  const imageSrc = partBImages[imageKey];

  return {
    number: slideNumber,
    formattedNumber: String(slideNumber).padStart(2, '0'),
    src: imageSrc,
    alt: `Saint Roman Design Portfolio Part B — Page ${slideNumber}`,
    title: `Portfolio Presentation — Page ${slideNumber}`,
  };
});
