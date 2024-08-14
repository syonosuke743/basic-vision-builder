"use client"
import React, { FormEvent, useState } from 'react';
import styles from "@/styles/CreateSixhat.module.css";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const SixHat = () => {
  const [theme, setTheme] = useState("");
  const [white, setWhite] = useState("");
  const [red, setRed] = useState("");
  const [black, setBlack] = useState("");
  const [yellow, setYellow] = useState("");
  const [green, setGreen] = useState("");
  const [blue, setBlue] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!session) {
      console.log("User is not authenticated");
      return;
    }

    const userId = session.user.id;


    //console.log(theme, white, red, black, yellow, green, blue);
    try {
      await fetch(`${apiUrl}/api/v1/sixhats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: userId,
          theme: theme,
          white: white,
          red: red,
          black: black,
          yellow: yellow,
          green: green,
          blue: blue
        })
      });
    
      router.push("/show-templates");
    } catch (err) {
      console.error("Error creating sixhat:", err);
      alert("New sixhat could not be created");
    }
  };

  return (
    <header>
      <main>
        <h1 className={styles.template_name}>シックスハット法</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.container_theme}>
            <textarea
              className={styles.theme_text}
              onChange={(e) => setTheme(e.target.value)}
              value={theme}
              placeholder='テーマ'
            />
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
            <textarea
              rows={20}
              className={styles.white}
              onChange={(e) => setWhite(e.target.value)}
              value={white}
              placeholder='客観的・中立的にみると'
            />
            <textarea
              rows={20}
              className={styles.red}
              onChange={(e) => setRed(e.target.value)}
              value={red}
              placeholder='感情的・直接的にみると'
            />
            <textarea
              rows={20}
              className={styles.black}
              onChange={(e) => setBlack(e.target.value)}
              value={black}
              placeholder='批判的・消極的にみると'
            />
            <div className={styles.item}>黄色の帽子
              <Image src="/23841222.jpg" alt="yellowHat" width={50} height={30} />
            </div>
            <div className={styles.item}>緑の帽子
              <Image src="/222074.jpg" alt="greenHat" width={50} height={30} />
            </div>
            <div className={styles.item}>青の帽子
              <Image src="/1102557.jpg" alt="blueHat" width={50} height={30} />
            </div>
            <textarea
              rows={20}
              className={styles.yellow}
              onChange={(e) => setYellow(e.target.value)}
              value={yellow}
              placeholder='創造的・革新的にみると'
            />
            <textarea
              rows={20}
              className={styles.green}
              onChange={(e) => setGreen(e.target.value)}
              value={green}
              placeholder='肯定的・希望的にみると'
            />
            <textarea
              rows={20}
              className={styles.blue}
              onChange={(e) => setBlue(e.target.value)}
              value={blue}
              placeholder='分析的・俯瞰的にみると'
            />
          </div>
          <div className={styles.button_container}>
            <Link href="/choice-templates">
              <button className={styles.back_button}>戻る</button>
            </Link>
            <button className={styles.create_button} type="submit">作成</button>
          </div>
        </form>
      </main>
    </header>
  );
};

export default SixHat;