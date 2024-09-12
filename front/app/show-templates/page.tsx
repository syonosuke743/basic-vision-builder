"use client";
import { useState, useEffect } from 'react';
import styles from "@/styles/ShowTemplates.module.css";
import Link from 'next/link';
import { getSession } from "next-auth/react";

interface Sixhat {
  id: number;
  theme: string;
  title: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Page = () => {
  const [sixhats, setSixhats] = useState<Sixhat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSixhats = async () => {
      try {
        const session = await getSession();
        //console.log("Session:", session);

        if (!session || !session.user?.id) {
          throw new Error("No session found or user ID missing. Please log in.");
        }

        const res = await fetch(`${apiUrl}/api/v1/sixhats?uid=${session.user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch sixhats');
        }

        const sixhatsData = await res.json();
        setSixhats(sixhatsData);
      } catch (err: any) {
        //console.error("Failed to fetch sixhats", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSixhats();
  }, []);

  const handleDelete = async (sixhatsId: number) => {
    const confirmed = confirm("本当にこの項目を削除してもよろしいですか？");
    if (!confirmed) return;

    try {
      const session = await getSession();
      //console.log("Session for delete:", session);

      if (!session || !session.user?.id) {
        throw new Error("No session found or user ID missing. Please log in.");
      }

      await fetch(`${apiUrl}/api/v1/sixhats/${sixhatsId}?uid=${session.user.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSixhats((prevSixhats) => prevSixhats.filter(sixhat => sixhat.id !== sixhatsId));
    } catch (err) {
      alert("Sixhat could not be deleted");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1 className={styles.feed}>履歴</h1>
      {sixhats.length === 0 ? (
        <p>No Sixhats available</p>
      ) : (
        sixhats.map(sixhat => (
          <h2 className={styles.theme} key={sixhat.id}>
            <Link href={`sixhats/${sixhat.id}`}>
              <div className={styles.id}>{sixhat.theme}</div>
            </Link>
            <Link href={`edit-sixhat/${sixhat.id}`}>
              <button className={styles.editButton}>編集</button>
            </Link>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(sixhat.id)}
            >
              削除
            </button>
          </h2>
        ))
      )}
    </div>
  );
}

export default Page;
