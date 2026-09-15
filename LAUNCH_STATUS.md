# GoBilling Website Launch Status

Last updated: 15 September 2026

## Completed

- Correct business email and WhatsApp/phone contact
- Reliable WhatsApp demo enquiry flow
- Privacy Policy
- Terms, cancellation and refund policy
- GitHub Pages deployment structure and custom-domain configuration
- Supabase schema for leads and anonymous conversion events
- RLS enabled; public roles cannot read, edit or delete lead/event data
- Server-side validation, origin restriction and honeypot spam check
- UTM attribution and conversion-event instrumentation
- robots.txt, sitemap.xml and no-Jekyll configuration
- Branded social-sharing image and Open Graph metadata
- Complete cross-platform logo kit: master marks, light/dark wordmarks, favicons, PWA/Apple icons and Windows application ICO/PNG sizes
- Supabase production write/readback test completed and test rows removed
- GitHub Pages repository created and first build completed
- Cloudflare apex DNS updated to all four GitHub Pages addresses (DNS only)
- `www.gobilling.app` updated to `gobilling.github.io` (DNS only)
- Production domain verified serving the GoBilling website over HTTP
- Version 1 preserved as Git tag `website-v1` and a dated ZIP archive
- Premium Version 2 implemented with real-product demo screenshots, comparison, FAQ and qualified demo form

## Pending after first publication

- GitHub is provisioning the custom-domain TLS certificate; enable HTTPS enforcement as soon as the certificate becomes available
- Obtain approved customer testimonials, business names, cities and logos before adding social proof
- Confirm commercial plan pricing and module limits, or retain the quotation-only approach
- Obtain final approval for the fictional-data product screenshots before using them in paid advertising
- Add real GoBilling screen recording
- Add 2–3 real product screenshots
- Add approved customer testimonials and shop logos
- Verify all sample invoice calculations and every product claim
- Confirm plan limits: computers, users, updates, training, backup and migration
- Decide whether to keep or revise the limited-time first-1,000-customers claim
- Connect Google Search Console
- Optional: add GA4 and/or Microsoft Clarity IDs for their dashboards
- Complete a real mobile-device test and live demo-enquiry test
- Obtain legal review of policies before scaling paid campaigns
- Review existing Supabase advisor warnings: mutable search path on `public.set_updated_at`, leaked-password protection disabled, and an inefficient existing licence RLS policy
