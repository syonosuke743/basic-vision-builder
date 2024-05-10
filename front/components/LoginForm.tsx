import React from 'react'
import styles from "@/styles/login.module.css"

const LoginForm = () => {
  return (
    <div className={styles.loginForm}>
      <form method="post">
        <h2>ログイン</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="username">ユーザー名</label>
          <input type="text" id="username" name="username" className={styles.input} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">パスワード</label>
          <input type="password" id="password" name="password" className={styles.input} required />
        </div>
        <button type="submit" className={styles.button}>ログイン</button>
      </form>
    </div>
    );
  }

export default LoginForm
