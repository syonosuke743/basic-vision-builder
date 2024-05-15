import React from 'react'
import styles from "@/styles/choice-templates.module.css"
import Link from 'next/link'
import Image from "next/image";

const page = () => {
  return (
    <main>
      <h1 className={styles.template_choice}>テンプレートを選択</h1>
        <div className={styles.container}>
          <h2 className={styles.item}>シックスハット法</h2>
          <h2 className={styles.item}>マンダラチャート</h2>
            <div className={styles.item}>
            <Link href="/create-sixhat">
            <Image  className={styles.sixhat} src="/sixhat.png" alt="sixhatpic" width={450} height={400}></Image>
            </Link>
            </div>
            <div className={styles.item}>
            <Link href="/create-mandala">
            <Image className={styles.mandala} src="/25150251.jpg" alt="mandalapic" width={450} height={400}></Image>
            </Link>
            </div>
          <h2 className={styles.item}>6W2H法</h2>
          <h2 className={styles.item}>エレベーターピッチ法</h2>
            <div className={styles.item}>
              <Link href="/create-6w2h">
              <Image className={styles.sixw2h} src="/6w2himage.png" alt="6w2hpic" width={450} height={400}></Image>
              </Link>
            </div>
            <div className={styles.item}>
              <Link href="/create-elevatorPitch">
              <Image className={styles.elevatorPitch} src="/elevator.png" alt="elevatorpic" width={450} height={400}></Image>
              </Link>
            </div>
        </div>
    </main>
  )
}

export default page