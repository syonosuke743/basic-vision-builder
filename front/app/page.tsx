import styles from "@/styles/login.module.css"
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.description}>
            <h1>Basic Vision Builderとは</h1>
            <p>シンプルな操作で、アイデアを思いつくために有用なテンプレートを作成できます。</p>
            <p>テンプレートを手書きで使いたい場合も、テンプレートを印刷することができます。</p>
        </div>
        <LoginForm/>
    </div>
    </main>
  );
}
