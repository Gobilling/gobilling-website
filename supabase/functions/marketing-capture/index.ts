import { createClient } from "npm:@supabase/supabase-js@2.95.0";

const allowedOrigins = new Set([
  "https://gobilling.app",
  "https://www.gobilling.app",
  "https://gobilling.github.io",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
]);

const allowedEvents = new Set([
  "page_view", "whatsapp_click", "phone_click", "email_click",
  "pricing_click", "lead_submit", "lead_error",
]);

function response(origin: string, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": origin || "https://gobilling.app",
      "access-control-allow-headers": "content-type, apikey",
      "access-control-allow-methods": "POST, OPTIONS",
      "vary": "Origin",
    },
  });
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

Deno.serve(async (request) => {
  const origin = request.headers.get("origin") || "";
  if (origin && !allowedOrigins.has(origin)) return response(origin, { error: "Origin not allowed" }, 403);
  if (request.method === "OPTIONS") return response(origin, { ok: true });
  if (request.method !== "POST") return response(origin, { error: "Method not allowed" }, 405);

  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 12_000) return response(origin, { error: "Request too large" }, 413);
    const payload = await request.json();
    if (clean(payload.website, 100)) return response(origin, { ok: true });

    const url = Deno.env.get("SUPABASE_URL")!;
    const secretKeys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}");
    const secretKey = secretKeys.default;
    if (!url || !secretKey) throw new Error("Server configuration unavailable");
    const db = createClient(url, secretKey, { auth: { persistSession: false } });
    const userAgent = clean(request.headers.get("user-agent"), 300);

    if (payload.kind === "lead") {
      const name = clean(payload.name, 100);
      const shopName = clean(payload.shop_name, 150);
      const phone = clean(payload.phone, 10).replace(/\D/g, "");
      const elapsed = Number(payload.elapsed_ms || 0);
      if (name.length < 2 || shopName.length < 2 || !/^\d{10}$/.test(phone) || elapsed < 2500 || payload.consent !== true) {
        return response(origin, { error: "Please check the submitted details" }, 400);
      }
      const { error } = await db.from("marketing_leads").insert({
        name,
        shop_name: shopName,
        phone,
        source: "website",
        landing_page: clean(payload.landing_page, 500),
        referrer: clean(payload.referrer, 500),
        utm_source: clean(payload.utm_source, 100),
        utm_medium: clean(payload.utm_medium, 100),
        utm_campaign: clean(payload.utm_campaign, 150),
        utm_content: clean(payload.utm_content, 150),
        utm_term: clean(payload.utm_term, 150),
        consent_at: new Date().toISOString(),
        user_agent: userAgent,
      });
      if (error) throw error;
      return response(origin, { ok: true });
    }

    if (payload.kind === "event" && allowedEvents.has(payload.event_name)) {
      const { error } = await db.from("marketing_events").insert({
        event_name: payload.event_name,
        page_path: clean(payload.page_path, 500),
        session_id: clean(payload.session_id, 36) || null,
        referrer: clean(payload.referrer, 500),
        utm_source: clean(payload.utm_source, 100),
        utm_medium: clean(payload.utm_medium, 100),
        utm_campaign: clean(payload.utm_campaign, 150),
        metadata: typeof payload.metadata === "object" && payload.metadata ? payload.metadata : {},
        user_agent: userAgent,
      });
      if (error) throw error;
      return response(origin, { ok: true });
    }

    return response(origin, { error: "Invalid request" }, 400);
  } catch (error) {
    console.error(error);
    return response(origin, { error: "Unable to save right now" }, 500);
  }
});
