
import React from 'react';
import styles from "@/styles/CreateSixhat.module.css";
import Image from "next/image";
import Link from "next/link";


const page = () => {

  return (
    <header>
      <main>
        <h1 className={styles.template_name}>
          シックスハット法
        </h1>
        <form>
        <div className={styles.container_theme}>
        <textarea className={styles.theme_text}>テーマ</textarea>
        </div>
          <div className={styles.container}>
            <div className={styles.item}>白の帽子
            <Image src="/2467042.jpg" alt="whiteHat" width={50} height={30} />
            </div>
            <div className={styles.item}>赤の帽子
            <Image src="/1391448.jpg" alt="redHat" width={50} height={30} />
            </div>
            <div className={styles.item}>黒の帽子
            <Image src="/1079226.jpg" alt="blackHat" width={50} height={30} />
            </div>
              <textarea rows={20} className={styles.white}>客観的・中立的にみると </textarea>
              <textarea rows={20} className={styles.red}>感情的・直接的にみると </textarea>
              <textarea rows={20} className={styles.black}>批判的・消極的にみると</textarea>
            <div className={styles.item}>黄色の帽子
            <Image src="/23841222.jpg" alt="yellowHat" width={50} height={30} />
            </div>
            <div className={styles.item}>緑の帽子
            <Image src="/222074.jpg" alt="greenHat" width={50} height={30} />
            </div>
            <div className={styles.item}>青の帽子
            <Image src="/1102557.jpg" alt="blueHat" width={50} height={30} />
            </div>
              <textarea rows={20} className={styles.yellow}>創造的・革新的にみると</textarea>
              <textarea rows={20} className={styles.green}>肯定的・希望的にみると</textarea>
              <textarea rows={20} className={styles.blue}>分析的・俯瞰的にみると</textarea>
          </div>
          <div className={styles.button_container}>
            <Link href="/choice-templates">
              <button className={styles.back_button}>戻る</button>
           </Link>
          <button className={styles.create_button}>作成</button>
          </div>
        </form>
      </main>
    </header>
  )
}

export default page