import React from 'react'
import styles from "@/styles/choice-templates.module.css"

const page = () => {
  return (
    <main>
      <h1 className={styles.template_choice}>テンプレート選択</h1>
        <div className={styles.container}>
          <h2>シックスハット法</h2>
          <h2>マンダラチャート</h2>
          <h2>6W2H法</h2>
        </div>
    </main>
  )
}

export default page