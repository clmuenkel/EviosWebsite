import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type LeadBody = {
  fullName?: string;
  companyName?: string;
  website?: string;
  email?: string;
  phone?: string;
  software?: string;
  message?: string;
  website_url?: string;
};

type RateLimitEntry = {
  count: number;
  windowStartMs: number;
};

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing) {
    rateLimitStore.set(ip, { count: 1, windowStartMs: now });
    return false;
  }

  if (now - existing.windowStartMs > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStartMs: now });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX) {
    return true;
  }

  existing.count += 1;
  rateLimitStore.set(ip, existing);
  return false;
}

function isValidLead(body: LeadBody) {
  return Boolean(
    body.fullName?.trim() &&
      body.companyName?.trim() &&
      body.email?.trim() &&
      body.phone?.trim() &&
      body.software?.trim(),
  );
}

export async function POST(request: NextRequest) {
  let body: LeadBody;

  try {
    body = await request.json();
    // #region agent log
    fetch("http://127.0.0.1:7243/ingest/1f7391d4-b41e-42ca-a980-61a640b85e0d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"pre-fix",hypothesisId:"H3",location:"route.ts:POST:json",message:"Lead API parsed JSON",data:{hasName:Boolean(body.fullName?.trim()),hasCompany:Boolean(body.companyName?.trim()),hasEmail:Boolean(body.email?.trim()),hasPhone:Boolean(body.phone?.trim()),hasSoftware:Boolean(body.software?.trim()),honeypotLength:(body.website_url||"").trim().length},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  } catch {
    // #region agent log
    fetch("http://127.0.0.1:7243/ingest/1f7391d4-b41e-42ca-a980-61a640b85e0d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"pre-fix",hypothesisId:"H5",location:"route.ts:POST:json-catch",message:"Lead API failed to parse JSON",data:{},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!isValidLead(body)) {
    // #region agent log
    fetch("http://127.0.0.1:7243/ingest/1f7391d4-b41e-42ca-a980-61a640b85e0d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"pre-fix",hypothesisId:"H3",location:"route.ts:POST:invalid-lead",message:"Lead API missing required fields",data:{hasName:Boolean(body.fullName?.trim()),hasCompany:Boolean(body.companyName?.trim()),hasEmail:Boolean(body.email?.trim()),hasPhone:Boolean(body.phone?.trim()),hasSoftware:Boolean(body.software?.trim())},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if ((body.website_url || "").trim().length > 0) {
    // #region agent log
    fetch("http://127.0.0.1:7243/ingest/1f7391d4-b41e-42ca-a980-61a640b85e0d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"pre-fix",hypothesisId:"H3",location:"route.ts:POST:honeypot",message:"Lead API honeypot triggered",data:{honeypotLength:(body.website_url||"").trim().length},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    // #region agent log
    fetch("http://127.0.0.1:7243/ingest/1f7391d4-b41e-42ca-a980-61a640b85e0d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"pre-fix",hypothesisId:"H4",location:"route.ts:POST:rate-limited",message:"Lead API rate limited request",data:{ipKnown:clientIp!=="unknown"},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const leadsToEmail = process.env.LEADS_TO_EMAIL || "zad@evioshq.com";

  if (!resendApiKey) {
    // #region agent log
    fetch("http://127.0.0.1:7243/ingest/1f7391d4-b41e-42ca-a980-61a640b85e0d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"pre-fix",hypothesisId:"H1",location:"route.ts:POST:missing-resend-key",message:"Lead API missing RESEND_API_KEY",data:{hasLeadsToEmail:Boolean(leadsToEmail)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return NextResponse.json(
      { error: "Email provider is not configured." },
      { status: 500 },
    );
  }

  const resend = new Resend(resendApiKey);

  try {
    // #region agent log
    fetch("http://127.0.0.1:7243/ingest/1f7391d4-b41e-42ca-a980-61a640b85e0d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"pre-fix",hypothesisId:"H2",location:"route.ts:POST:before-send",message:"Lead API attempting resend send",data:{toDomain:(leadsToEmail.split("@")[1]||"unknown"),hasReplyTo:Boolean(body.email?.trim())},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    await resend.emails.send({
      from: "Evios Leads <onboarding@resend.dev>",
      to: [leadsToEmail],
      subject: "New Evios demo lead",
      replyTo: body.email?.trim(),
      text: [
        `Full name: ${body.fullName?.trim()}`,
        `Company name: ${body.companyName?.trim()}`,
        `Website: ${body.website?.trim() || "N/A"}`,
        `Email: ${body.email?.trim()}`,
        `Phone: ${body.phone?.trim()}`,
        `Software: ${body.software?.trim()}`,
        `Message: ${body.message?.trim() || "N/A"}`,
      ].join("\n"),
    });

    // #region agent log
    fetch("http://127.0.0.1:7243/ingest/1f7391d4-b41e-42ca-a980-61a640b85e0d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"pre-fix",hypothesisId:"H2",location:"route.ts:POST:send-success",message:"Lead API resend send succeeded",data:{},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    // #region agent log
    fetch("http://127.0.0.1:7243/ingest/1f7391d4-b41e-42ca-a980-61a640b85e0d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"pre-fix",hypothesisId:"H2",location:"route.ts:POST:send-failed",message:"Lead API resend send failed",data:{errorMessage:error instanceof Error?error.message:"unknown"},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return NextResponse.json(
      { error: "Failed to send email notification." },
      { status: 500 },
    );
  }
}
