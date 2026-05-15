import styles from "./svgDeckPage.module.css";

interface SvgDeckPageProps {
  title: string;
  folderName: string;
  slides: string[];
}

export default function SvgDeckPage({ title, folderName, slides }: SvgDeckPageProps) {
  const encodedFolder = encodeURIComponent(folderName);
  return (
    <main className={styles.page}>
      {slides.map((filename, index) => (
        <div key={index} className={styles.slide}>
          <img
            src={`/${encodedFolder}/${filename}`}
            alt={`${title} slide ${index + 1}`}
            className={styles.slideImage}
            loading={index < 2 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </main>
  );
}
