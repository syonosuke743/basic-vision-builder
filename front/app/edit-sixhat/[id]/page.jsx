"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import styles from "@/styles/CreateSixhat.module.css";
import Link from "next/link";

const EditSixhat = ({ params }) => {
  const [theme, setTheme] = useState("");
  const [white, setWhite] = useState("");
  const [red, setRed] = useState("");
  const [black, setBlack] = useState("");
  const [yellow, setYellow] = useState("");
  const [green, setGreen] = useState("");
  const [blue, setBlue] = useState("");
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchSixhatData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/sixhats/${params.id}`);
        const sixhatData = response.data;
        setTheme(sixhatData.theme);
        setWhite(sixhatData.white);
        setRed(sixhatData.red);
        setBlack(sixhatData.black);
        setYellow(sixhatData.yellow);
        setGreen(sixhatData.green);
        setBlue(sixhatData.blue);
      } catch (err) {
        console.error("Error fetching sixhat data", err);
      }
    };

    if (params.id) {
      fetchSixhatData();
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${apiUrl}/api/v1/sixhats/${params.id}`, {
        theme,
        white,
        red,
        black,
        yellow,
        green,
        blue
      });

      router.push("/show-templates");
    } catch (error) {
      alert("Sixhat update failed");
    }
  };

  return (
    <div>
      <h2 className={styles.edit}>シックスハットを編集</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.container_theme}>
          <textarea
            className={styles.theme_text}
            onChange={(e) => setTheme(e.target.value)}
            placeholder='Theme'
            value={theme}
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
            placeholder='White'
            value={white}
          />
          <textarea
            rows={20}
            className={styles.red}
            onChange={(e) => setRed(e.target.value)}
            placeholder='Red'
            value={red}
          />
          <textarea
            rows={20}
            className={styles.black}
            onChange={(e) => setBlack(e.target.value)}
            placeholder='Black'
            value={black}
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
            placeholder='Yellow'
            value={yellow}
          />
          <textarea
            rows={20}
            className={styles.green}
            onChange={(e) => setGreen(e.target.value)}
            placeholder='Green'
            value={green}
          />
          <textarea
            rows={20}
            className={styles.blue}
            onChange={(e) => setBlue(e.target.value)}
            placeholder='Blue'
            value={blue}
          />
        </div>
        <div className={styles.button_container}>
          <Link href="/show-templates">
            <button className={styles.back_button}>戻る</button>
          </Link>
          <button className={styles.create_button} type="submit">編集</button>
        </div>
      </form>
    </div>
  );
};

export default EditSixhat;

