# AD Real Estate

Marketing and lead-generation site for AD Real Estate & Builders (Pvt) Ltd —
property advisory for DHA and Bahria Town, Islamabad.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind v4 · Sanity CMS · Resend

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

The site runs without any environment variables — the marketing pages build and
serve fine. Only the Studio and enquiry form need credentials.

---

## Setup checklist

### 1. Sanity (CMS + enquiry inbox)

1. Create a project at [sanity.io/manage](https://sanity.io/manage).
2. Copy the **Project ID** into `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. Under **API → Tokens**, create a token with **Editor** permissions and put it
   in `SANITY_API_WRITE_TOKEN`. This is server-only — it must never be prefixed
   with `NEXT_PUBLIC_`.
4. Under **API → CORS origins**, add `http://localhost:3000` and the production
   domain, both with credentials allowed.
5. Push the starter inventory:

   ```bash
   npm run seed
   ```

6. Visit [/studio](http://localhost:3000/studio) to manage properties and read
   enquiries.

### 2. Lead notification email (optional)

Enquiries are always saved to the Studio. Email is an extra notification, so a
mail outage can never lose a lead.

1. Create an account at [resend.com](https://resend.com) and verify the sending
   domain.
2. Set `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL` (comma-separate for several
   recipients), and `LEAD_FROM_EMAIL`.

### 3. Deploy to Vercel

1. Push to GitHub, then import the repo at [vercel.com/new](https://vercel.com/new).
2. Add every variable from `.env.example` under **Settings → Environment Variables**.
3. Set `NEXT_PUBLIC_SITE_URL` to the real domain — canonical tags, the sitemap,
   and social preview URLs all derive from it.

---

## How the site is organised

| Path | Purpose |
| --- | --- |
| `src/app/page.tsx` | Homepage |
| `src/app/properties/` | Listing grid + individual project pages |
| `src/app/studio/` | Sanity Studio (admin panel) |
| `src/app/actions/submit-lead.ts` | Enquiry handling — validate, store, notify |
| `src/components/sections/` | Page sections |
| `src/components/ui/` | Reusable primitives |
| `src/content/` | Seed content (source for the Sanity import) |
| `src/lib/site.ts` | Business identity — **single source of truth for NAP** |
| `src/sanity/schemas/` | CMS document definitions |

### Business details

Name, address, and phone live only in `src/lib/site.ts`. They must stay
byte-identical to the Google Business Profile — mismatched NAP data is the most
common cause of weak local-search ranking. Change them in one place.

---

## Enquiry flow

1. Client-side form posts to a Server Action.
2. Validated with Zod (same schema client and server).
3. Rejected if the honeypot field is filled, or if the IP exceeds 5 submissions
   per hour.
4. Saved to Sanity as a `lead` document.
5. Email notification sent (failure here is logged, not surfaced — the lead is
   already safe).
6. If the save itself fails, the user is shown the phone number rather than a
   dead end.

> The in-memory rate limit is per-instance. If the site ever scales to multiple
> regions, move it to Vercel KV so the limit is shared.

---

## Chat assistant

`src/components/chat/ChatWidget.tsx` is a rule-based assistant, not an LLM —
there is no API call and no per-conversation cost. It understands buyer intent
by expanding a synonym table (English and Roman Urdu, e.g. "qeemat" → price)
over the message, extracting entities with regex (phase, size, budget,
installment tenure), and matching both against the site's real content:
`src/content/properties.ts` for listings, `src/content/faqs.ts` for FAQ
answers. See `src/lib/chat/nlp.ts` (the language layer) and
`src/lib/chat/engine.ts` (intents and replies).

Because it has no model behind it, it says so on open, and hands off to
WhatsApp — with the buyer's context prefilled — the moment a message doesn't
clear its match threshold, rather than guessing. Conversation history persists
per browser tab via `sessionStorage`, not sent anywhere.

To extend it: add a keyword group to `SYNONYMS` in `nlp.ts` for new
vocabulary, or a new entry to `INTENTS` in `engine.ts` for a new topic. FAQ
answers update automatically from `src/content/faqs.ts` — no engine change
needed.

---

## Before launch

**Unverified content — must be confirmed with the client first**

- [ ] **Prices.** Every listing shows "On Request" because no real figures were
      supplied. Put actual numbers in `priceFrom` (or leave null deliberately) —
      never a guessed price on a live listing.
- [ ] **Listing copy.** The `overview`, `highlights`, and `sizes` fields in
      `src/content/properties.ts` are drafted from general knowledge of these
      developments, not from client-supplied facts. Confirm or correct each.
- [ ] Confirm the four placeholder job titles in `src/content/team.ts` — only
      the CEO's was verified.
- [ ] Get the exact citation for the Rawalpindi Chamber "Certificate of
      Recognition" (`src/content/site-content.ts`).
- [ ] Replace the illustrated `PropertyArt` placeholders with real project
      photography.
- [x] ~~Live Google Places review pull~~ — deliberately skipped. Google
      requires a billing card on file even for the free tier, and the client
      wants zero card-on-file risk. The 3 reviews on the site are real
      (transcribed from the actual Google listing), just not auto-updating.
      Revisit only if the client later opts into adding a card.
- [ ] Verify the logo in `src/components/ui/Logo.tsx` — traced by eye from a
      raster export, not the original vector. Swap in the real `.ai`/`.svg` if
      it turns up.
- [ ] Verify the domain in Google Search Console and submit `/sitemap.xml`.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- [ ] Delete `/logo-check` — internal contrast-testing page, `noindex`'d but
      unlinked and unneeded once the logo is signed off.

## Commands

```bash
npm run dev        # development server
npm run build      # production build
npm run typecheck  # TypeScript, no emit
npm run lint       # ESLint
npm run seed       # push seed inventory into Sanity
```
