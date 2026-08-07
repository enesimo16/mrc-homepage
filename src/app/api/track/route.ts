import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

/**
 * Public endpoint the site itself calls to log page views and UI events
 * (WhatsApp click, form submit, etc). Never returns visitor data - write-only.
 */
export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const pool = getPool();

  try {
    if (body.kind === "pageview") {
      await pool.query(
        "INSERT INTO page_views (path, referrer, user_agent, ip, lang, session_id) VALUES (?, ?, ?, ?, ?, ?)",
        [
          String(body.path ?? "").slice(0, 500),
          body.referrer ? String(body.referrer).slice(0, 500) : null,
          req.headers.get("user-agent")?.slice(0, 500) ?? null,
          ip,
          body.lang ? String(body.lang).slice(0, 8) : null,
          body.sessionId ? String(body.sessionId).slice(0, 64) : null,
        ]
      );
    } else if (body.kind === "event") {
      await pool.query(
        "INSERT INTO events (type, page, meta, session_id) VALUES (?, ?, ?, ?)",
        [
          String(body.type ?? "unknown").slice(0, 64),
          body.page ? String(body.page).slice(0, 500) : null,
          body.meta ? JSON.stringify(body.meta) : null,
          body.sessionId ? String(body.sessionId).slice(0, 64) : null,
        ]
      );
    } else {
      return NextResponse.json({ ok: false, error: "unknown_kind" }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("track error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
