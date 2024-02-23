import Image from "next/image";
import styles from "./hero.module.css";

import mobinsImage from "@/assets/site/mobin.jpg";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image src={mobinsImage} alt="An Image showing Mobin" />
      </div>

      <h1>Hi I&lsquo;m Mobin</h1>
      <p>
        I&apos;m a Frontend developer from Bangladesh. I love to share my
        knowledge with people.
      </p>
    </section>
  );
}
