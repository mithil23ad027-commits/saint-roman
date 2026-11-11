// Part B - 10-page continuous presentation data (extracted slide-14.png through slide-23.png)
// Auto-imported via Vite's import.meta.glob for optimal bundling

const partBImages = import.meta.glob('../assets/part-b/slide-*.png', {
  eager: true,
  import: 'default',
});

// Render extracted images slide-14.png through slide-23.png, re-indexed as Page 1 through Page 10
export const PART_B_SLIDES = Array.from({ length: 10 }, (_, index) => {
  const pageNumber = index + 1; // Page 1 through Page 10
  const originalSlideNumber = index + 14; // slide-14.png through slide-23.png
  const imageKey = `../assets/part-b/slide-${originalSlideNumber}.png`;
  const imageSrc = partBImages[imageKey];

  return {
    number: pageNumber,
    pageNumber,
    originalSlideNumber,
    formattedNumber: String(pageNumber).padStart(2, '0'),
    src: imageSrc,
    alt: `Saint Roman Design Portfolio Part B — Page ${pageNumber}`,
    title: `Portfolio Presentation — Page ${pageNumber}`,
  };
});
