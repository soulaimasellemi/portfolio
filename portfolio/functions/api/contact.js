/* Cloudflare Pages Function: POST /api/contact
   Receives the contact form and emails it to you with Resend.

   Two settings live in Cloudflare (never in GitHub):
     RESEND_API_KEY  -> your Resend API key   (type: Secret)
     CONTACT_TO      -> your email address     (the one you signed up to Resend with)
   Set them in: Cloudflare > Workers & Pages > your project > Settings > Variables and Secrets
*/

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json" } });

const clean = (v, max) => String(v ?? "").replace(/\r/g, "").trim().slice(0, max);

export async function onRequestPost({ request, env }) {
  let data;
  try {
    const type = request.headers.get("content-type") || "";
    data = type.includes("application/json")
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Hidden "botcheck" box: people never tick it, spam robots do. Pretend success, send nothing.
  if (data.botcheck) return json({ ok: true });

  const name = clean(data.name, 100).replace(/\n/g, " ");
  const email = clean(data.email, 200);
  const message = clean(data.message, 5000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "invalid" }, 400);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO) {
    return json({ ok: false, error: "not_configured" }, 500);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio <onboarding@resend.dev>",
      to: [env.CONTACT_TO],
      reply_to: email, // pressing "Reply" answers the visitor directly
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
    }),
  });

  if (!res.ok) return json({ ok: false, error: "send_failed" }, 502);
  return json({ ok: true });
}

// Anything other than POST
export const onRequest = () => json({ ok: false, error: "method_not_allowed" }, 405);
