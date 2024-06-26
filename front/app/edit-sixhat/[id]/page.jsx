"use client"
import React, {  useState, useEffect } from 'react';
import axios from 'axios';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import styles from "@/styles/CreateSixhat.module.css";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const EditSixhat = ({params}) => {

  const [theme, setTheme] = useState("");
  const [white, setWhite] = useState("");
  const [red, setRed] = useState("");
  const [black, setBlack] = useState("");
  const [yellow, setYellow] = useState("");
  const [green, setGreen] = useState("");
  const [blue, setBlue] = useState("");
  const router = useRouter();

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
    //console.log( theme,white,red,black,yellow,green,blue);

    try {
      await axios.put(`${apiUrl}/api/v1/posts/${params.id}`, {
        theme: theme,
        white: white,
        red: red,
        black:black,
        yellow:yellow,
        green:green,
        blue:blue
      });

      router.push("/show-templates");

    } catch (error) {
      alert("Sixhat update failed");
    }
  };

  return (
    <div>
      <h2>シックスハットを編集</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.container_theme}>
        <textarea className={styles.theme_text} onChange={(e) => setTheme(e.target.value)} placeholder='Theme'>
          テーマ</textarea>
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
              <textarea rows={20} className={styles.white} onChange={(e) => setWhite(e.target.value)} placeholder='White'>
                客観的・中立的にみると 
              </textarea>
              <textarea rows={20} className={styles.red} onChange={(e) => setRed(e.target.value)} placeholder='Red'>
                感情的・直接的にみると
              </textarea>
              <textarea rows={20} className={styles.black} onChange={(e) => setBlack(e.target.value)} placeholder='Black'>
                批判的・消極的にみると
              </textarea>
            <div className={styles.item}>黄色の帽子
            <Image src="/23841222.jpg" alt="yellowHat" width={50} height={30} />
            </div>
            <div className={styles.item}>緑の帽子
            <Image src="/222074.jpg" alt="greenHat" width={50} height={30} />
            </div>
            <div className={styles.item}>青の帽子
            <Image src="/1102557.jpg" alt="blueHat" width={50} height={30} />
            </div>
              <textarea rows={20} className={styles.yellow} onChange={(e) => setYellow(e.target.value)} placeholder='Yellow'>
                創造的・革新的にみると
              </textarea>
              <textarea rows={20} className={styles.green} onChange={(e) => setGreen(e.target.value)} placeholder='green'>
                肯定的・希望的にみると
              </textarea>
              <textarea rows={20} className={styles.blue} onChange={(e) => setBlue(e.target.value)} placeholder='blue'>
                分析的・俯瞰的にみると
              </textarea>
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

export default EditSixhat
