"use client";
import { useState, useEffect } from 'react';
import styles from "@/styles/ShowTemplates.module.css";
import axios from "axios";
import Link from 'next/link';

interface Sixhat {
  id: number;
  theme: string;
  title: string;
  // Add other properties if needed
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const Page = () => {
  const [sixhats, setSixhats] = useState<Sixhat[]>([]);

  useEffect(() => {
    const fetchSixhats = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/v1/sixhats`);
        const sixhatsData = await res.json();
        setSixhats(sixhatsData);
      } catch (err) {
        console.error("Failed to fetch sixhats", err);
      }
    };

    fetchSixhats();
  }, []);

  const handleDelete = async (sixhatsId: number) => {

    const confirmed = confirm("本当にこの項目を削除してもよろしいですか？");
    if (!confirmed) return;

    try {
      await axios.delete(`${apiUrl}/api/v1/sixhats/${sixhatsId}`);
      // Update the state after deletion
      setSixhats((prevSixhats) => prevSixhats.filter(sixhat => sixhat.id !== sixhatsId));
    } catch (err) {
      alert("Sixhat could not be deleted");
    }
  };

  return (
    <div>
      <h1 className={styles.feed}>履歴</h1>
      {sixhats.map(sixhat => (
        <h2 className={styles.theme} key={sixhat.id}>
          <Link href={`sixhats/${sixhat.id}`}>
            <div className={styles.id}>{sixhat.theme}</div>
          </Link>
          <Link href={`edit-sixhat/${sixhat.id}`}>
            <button className={styles.editButton}>Edit</button>
          </Link>
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(sixhat.id)}
          >
            Delete
          </button>
        </h2>
      ))}
    </div>
  );
}

export default Page;
