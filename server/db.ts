import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  limit,
  doc,
} from "firebase/firestore";

export async function initDb() {
  const bcrypt = await import("bcryptjs");
  const password = process.env.ADMIN_PASSWORD || "admin@MI2024";
  const hash = await bcrypt.default.hash(password, 10);

  const usernames = (process.env.ADMIN_USERNAME || "miengineering17@gmail.com")
    .split(",")
    .map((u) => u.trim().toLowerCase())
    .filter(Boolean);

  try {
    for (const username of usernames) {
      const q = query(collection(db, "adminUsers"), where("username", "==", username), limit(1));
      const snap = await getDocs(q);
      if (snap.empty) {
        await addDoc(collection(db, "adminUsers"), { username, passwordHash: hash });
        console.log("[db] Admin seeded:", username);
      } else {
        await updateDoc(doc(db, "adminUsers", snap.docs[0].id), { passwordHash: hash });
        console.log("[db] Admin password synced:", username);
      }
    }
  } catch (err: any) {
    console.warn("[db] Firebase admin sync skipped:", err?.code || err?.message);
  }
}
