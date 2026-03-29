# Conversion Tracking

## Qué quedó instrumentado

- `qualify_lead` se dispara en cliente al enviar exitosamente el formulario.
- `qualify_lead` también puede reenviarse server-side a GA4 desde `src/app/api/lead/route.ts` si existe `GA4_API_SECRET`.
- `close_convert_lead` y `purchase` pueden enviarse a `POST /api/conversions` desde un CRM, Zapier, Make o un backend propio.
- Los emails de leads ahora incluyen `GA client ID` cuando el navegador ya tiene cookie `_ga`.
- Si todavía no conservas `leadId` o `clientId`, el webhook acepta `email` o `phone` y los transforma a `user_data` hasheado para GA4.

## Variables de entorno

```bash
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_API_SECRET=tu_api_secret_de_measurement_protocol
CONVERSION_API_KEY=una_llave_larga_y_privada
```

`GA4_MEASUREMENT_ID` es el nombre preferido para el backend. `NEXT_PUBLIC_GA4_ID` se mantiene porque el frontend lo usa para cargar GA4 en el navegador.

`CONVERSION_API_KEY` no viene de GA4. En este proyecto es una llave interna para autenticar llamadas al webhook `POST /api/conversions`, y debe ser distinta de `GA4_API_SECRET`.

## Autenticación del webhook

Envía una de estas cabeceras:

```bash
Authorization: Bearer $CONVERSION_API_KEY
```

O bien:

```bash
x-conversion-key: $CONVERSION_API_KEY
```

## Payload base

```json
{
  "event": "close_convert_lead",
  "email": "cliente@correo.com",
  "phone": "+1 (469) 123-4567",
  "source": "/",
  "pageUrl": "https://tcinsurancetx.com/#contacto",
  "insuranceType": "Salud",
  "occurredAt": "2026-03-14T15:30:00.000Z",
  "attribution": {
    "gclid": "EAIaIQobChMI-example",
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "lead-gen"
  }
}
```

Puedes enviar cualquiera de estos identificadores:

- `leadId`
- `clientId`
- `email`
- `phone`
- `transactionId` para `purchase`

## Ejemplo close_convert_lead

```bash
curl -X POST https://tcinsurancetx.com/api/conversions \
  -H "Authorization: Bearer $CONVERSION_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "close_convert_lead",
    "email": "cliente@correo.com",
    "phone": "+1 (469) 123-4567",
    "source": "/",
    "insuranceType": "Salud",
    "occurredAt": "2026-03-14T15:30:00.000Z",
    "attribution": {
      "gclid": "EAIaIQobChMI-example",
      "utm_source": "google",
      "utm_medium": "cpc",
      "utm_campaign": "lead-gen"
    }
  }'
```

## Ejemplo purchase

`purchase` requiere `transactionId`, `value` y `currency`.

```bash
curl -X POST https://tcinsurancetx.com/api/conversions \
  -H "Authorization: Bearer $CONVERSION_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "purchase",
    "email": "cliente@correo.com",
    "transactionId": "sale_9001",
    "value": 325.50,
    "currency": "USD",
    "source": "/",
    "insuranceType": "Vida",
    "occurredAt": "2026-03-14T16:00:00.000Z",
    "attribution": {
      "gclid": "EAIaIQobChMI-example"
    }
  }'
```

## Nota operativa

Si el cierre ocurre fuera del sitio, lo ideal sigue siendo conservar también `leadId` o `clientId`.

Con solo `email` o `phone`, el evento se puede enviar a GA4 y Google puede usar `user_data` hasheado para matching, pero la atribución de sesión suele ser menos precisa que con `clientId`.
