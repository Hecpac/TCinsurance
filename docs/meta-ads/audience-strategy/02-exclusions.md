# Exclusions (Buyers, Email, Visitors)

Exclude people who already converted to avoid wasting budget on existing clients.

## Exclusion List

| Audience | Source | Why |
|----------|--------|-----|
| Existing clients | CRM email list upload | Don't sell to people who already bought |
| Recent converters | Lead form submissions (30 days) | Already in pipeline |
| Website visitors (7 days) | Meta Pixel | Move to retargeting campaign instead |
| Engaged users (14 days) | Page/profile engagement | Move to retargeting |

## Setup

1. Upload client email list to Meta as Custom Audience (update monthly)
2. Create Custom Audience from Meta Pixel: "All website visitors - last 7 days"
3. Create Custom Audience from Lead Form: "Submitted - last 30 days"
4. Add all three as exclusions in every prospecting ad set

## Important

- Update email exclusion list at least monthly
- Don't exclude too aggressively — some overlap is normal
- Retargeting campaigns should INCLUDE these excluded audiences
