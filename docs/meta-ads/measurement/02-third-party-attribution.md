# Third-Party Attribution (Northbeam, Triple Whale, etc.)

Independent tracking that sits between Meta's self-reported data and your actual results.

## Why Third-Party Attribution

- Meta counts view-through conversions (someone saw your ad, then converted later)
- Google counts last-click conversions (ignores prior touchpoints)
- Third-party tools attempt to stitch the full journey together

## Options for TC Insurance (by Budget)

| Tool | Monthly Cost | Best For |
|------|-------------|----------|
| UTM tracking + Google Analytics | Free | Starting out |
| Hyros | $99-$299/mo | Lead gen businesses |
| Northbeam | $500+/mo | When spending $5k+/mo on ads |
| Triple Whale | $300+/mo | E-commerce focused |

## Starting Recommendation

At TC Insurance's current scale, use:
1. UTM parameters on all ad links
2. Google Analytics 4 for attribution modeling
3. CRM tracking (ask leads "how did you hear about us?")
4. Compare GA4 data to Meta's reported conversions

## UTM Structure

```
utm_source=meta
utm_medium=paid
utm_campaign={campaign_name}
utm_content={ad_name}
```
