"use client";
import React, { useEffect, useState } from 'react';
import styles from "@/styles/CreateSixhat.module.css";
import Image from "next/image";
import { useSession } from 'next-auth/react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ShowSixhat = ({ params }) => {
  const [sixhats, setSixhats] = useState(null);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const userId = session?.user?.id; // UIDをセッションから取得

  useEffect(() => {
    const fetchSixhatData = async () => {
      try {
        // fetchを使い、X-UIDヘッダーをリクエストに追加
        const response = await fetch(`${apiUrl}/api/v1/sixhats/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-UID': userId // X-UIDヘッダーにユーザーIDを設定
          }
        });

        if (!response.ok) {
          throw new Error("データの取得に失敗しました。");
        }

        const data = await response.json();
        setSixhats(data);
      } catch (err) {
        //console.error("Error fetching sixhat data", err);
        setError("データの取得に失敗しました。");
      }
    };

    if (params.id && userId) {
      fetchSixhatData();
    }
  }, [params.id, userId]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!sixhats) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1 className={styles.template_name}>シックスハット法</h1>
      <div className={styles.container_theme}>
        <textarea
          className={styles.theme_text}
          value={sixhats.theme}
          readOnly
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
          value={sixhats.white}
          readOnly
          placeholder='客観的・中立的にみると'
        />
        <textarea
          rows={20}
          className={styles.red}
          value={sixhats.red}
          readOnly
          placeholder='感情的・直接的にみると'
        />
        <textarea
          rows={20}
          className={styles.black}
          value={sixhats.black}
          readOnly
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
          value={sixhats.yellow}
          readOnly
          placeholder='創造的・革新的にみると'
        />
        <textarea
          rows={20}
          className={styles.green}
          value={sixhats.green}
          readOnly
          placeholder='肯定的・希望的にみると'
        />
        <textarea
          rows={20}
          className={styles.blue}
          value={sixhats.blue}
          readOnly
          placeholder='分析的・俯瞰的にみると'
        />
      </div>
    </main>
  );
};

export default ShowSixhat;
