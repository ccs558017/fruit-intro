import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "subscribers.json");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Subscriber = { email: string; joinedAt: string };

async function load(): Promise<Subscriber[]> {
  try {
    return JSON.parse(await readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = String(body?.email ?? "").trim().toLowerCase();
  } catch {
    return Response.json({ message: "資料格式不正確" }, { status: 400 });
  }

  if (!EMAIL.test(email) || email.length > 254) {
    return Response.json({ message: "請輸入有效的 Email" }, { status: 400 });
  }

  try {
    const list = await load();
    if (list.some((s) => s.email === email)) {
      return Response.json({ message: "這個 Email 已經在名單中了" });
    }
    list.push({ email, joinedAt: new Date().toISOString() });
    await mkdir(path.dirname(FILE), { recursive: true });
    await writeFile(FILE, JSON.stringify(list, null, 2));
  } catch {
    return Response.json({ message: "伺服器暫時無法儲存，請稍後再試" }, { status: 500 });
  }

  return Response.json({ message: "加入成功！產季開跑時會第一時間通知你" });
}
