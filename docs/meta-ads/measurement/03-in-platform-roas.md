# In-Platform ROAS (One Signal Only)

Meta's self-reported Return on Ad Spend. Use it as a directional signal, never as the truth.

## Why It's Unreliable as Truth

- Meta attributes conversions to ads that were merely viewed (view-through)
- Default attribution window is 7-day click, 1-day view
- Multiple platforms can claim the same conversion
- Meta has financial incentive to show good results

## How to Use In-Platform ROAS

- Track trends, not absolute numbers
- If in-platform ROAS drops 30%+ week over week, something is wrong
- If in-platform ROAS is stable, creative and targeting are consistent
- Compare to blended revenue (the source of truth)

## TC Insurance Settings

| Setting | Recommended Value |
|---------|------------------|
| Attribution window | 7-day click, 1-day view |
| Conversion event | Lead form submission |
| Value | Estimated commission per policy type |

## Red Flags

- ROAS looks great but no new policies in CRM → attribution problem
- ROAS dropped but blended revenue is up → Meta underreporting (good sign)
- ROAS and blended revenue both dropping → real problem, audit campaigns
