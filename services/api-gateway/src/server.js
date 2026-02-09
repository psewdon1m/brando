const http = require("node:http");
const { randomUUID } = require("node:crypto");

const PORT = Number(process.env.PORT || 8080);
const SERVICE_NAME = process.env.SERVICE_NAME || "api-gateway";
const CATALOG_SERVICE_URL =
  process.env.CATALOG_SERVICE_URL || "http://catalog-service:8081";
const MEDIA_SERVICE_URL =
  process.env.MEDIA_SERVICE_URL || "http://media-service:8082";
const ALLOWED_LOCALES = new Set(["ru", "en"]);

function getRequestId(req) {
  return String(req.headers["x-request-id"] || randomUUID());
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function sendError(res, statusCode, code, message, requestId) {
  sendJson(res, statusCode, {
    error: {
      code,
      message,
      requestId,
    },
  });
}

function validateLocale(locale, requestId, res) {
  if (!locale) {
    return "ru";
  }

  if (!ALLOWED_LOCALES.has(locale)) {
    sendError(
      res,
      400,
      "VALIDATION_ERROR",
      "Invalid locale. Allowed values: ru, en.",
      requestId
    );
    return null;
  }

  return locale;
}

async function fetchJson(url, requestId) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-request-id": requestId,
    },
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  return { response, payload };
}

async function callUpstreamOrFail(res, requestId, url) {
  try {
    const { response, payload } = await fetchJson(url, requestId);
    if (!response.ok) {
      const upstreamError = payload && payload.error ? payload.error.message : "Upstream request failed.";
      sendError(res, 502, "UPSTREAM_UNAVAILABLE", upstreamError, requestId);
      return null;
    }
    return payload;
  } catch {
    sendError(res, 502, "UPSTREAM_UNAVAILABLE", "Upstream service unavailable.", requestId);
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  const requestId = getRequestId(req);
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const locale = validateLocale(url.searchParams.get("locale"), requestId, res);

  if (locale === null) {
    return;
  }

  if (req.method !== "GET") {
    sendError(res, 405, "VALIDATION_ERROR", "Only GET method is supported.", requestId);
    return;
  }

  if (url.pathname === "/health") {
    sendJson(res, 200, { service: SERVICE_NAME, status: "ok", requestId });
    return;
  }

  if (url.pathname === "/api/v1/home") {
    const heroUrl = `${MEDIA_SERVICE_URL}/api/v1/media/hero?locale=${locale}`;
    const previewUrl = `${CATALOG_SERVICE_URL}/api/v1/catalog/preview?locale=${locale}`;

    const heroPayload = await callUpstreamOrFail(res, requestId, heroUrl);
    if (!heroPayload) {
      return;
    }

    const previewPayload = await callUpstreamOrFail(res, requestId, previewUrl);
    if (!previewPayload) {
      return;
    }

    const heroMedia = Array.isArray(heroPayload.items) ? heroPayload.items : [];
    const catalogPreview = Array.isArray(previewPayload.items) ? previewPayload.items : [];

    sendJson(res, 200, { heroMedia, catalogPreview });
    return;
  }

  if (url.pathname === "/api/v1/catalog") {
    const itemsUrl = `${CATALOG_SERVICE_URL}/api/v1/catalog/items?locale=${locale}`;
    const itemsPayload = await callUpstreamOrFail(res, requestId, itemsUrl);
    if (!itemsPayload) {
      return;
    }

    const items = Array.isArray(itemsPayload.items) ? itemsPayload.items : [];
    sendJson(res, 200, { items });
    return;
  }

  if (url.pathname === "/api/v1/visual-research") {
    const vrUrl = `${MEDIA_SERVICE_URL}/api/v1/media/visual-research?locale=${locale}`;
    const vrPayload = await callUpstreamOrFail(res, requestId, vrUrl);
    if (!vrPayload) {
      return;
    }

    const entries = Array.isArray(vrPayload.items) ? vrPayload.items : [];
    sendJson(res, 200, { entries });
    return;
  }

  sendError(res, 404, "NOT_FOUND", "Route not found.", requestId);
});

server.listen(PORT, "0.0.0.0", () => {
  // eslint-disable-next-line no-console
  console.log(`${SERVICE_NAME} started on port ${PORT}`);
});

