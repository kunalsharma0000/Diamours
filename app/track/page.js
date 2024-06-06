"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css"
export default function Track() {
  const router = useRouter();

  const redirectToTrack = (id) => {
    router.push(`/track/${id}`);
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.header_h1}>Track your order</h1>
        <hr className={styles.header_hr} />
      </header>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          redirectToTrack(e.target.elements[0].value);
        }}
      >
        <input type="text" className={styles.form_input} />
        <button type="submit" className={styles.form_button}>Submit</button>
      </form>
    </main>
  );
}