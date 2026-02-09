const http = require("node:http");
const { randomUUID } = require("node:crypto");

const PORT = Number(process.env.PORT || 8081);
const SERVICE_NAME = process.env.SERVICE_NAME || "catalog-service";
const ALLOWED_LOCALES = new Set(["ru", "en"]);

const catalogItems = [
  {
    id: "cat-001",
    title: "Silence Ring",
    slug: "silence-ring",
    imageUrl: "https://cdn.example.local/catalog/silence-ring.jpg",
    isFeatured: true,
    mediaType: "image",
  },
  {
    id: "cat-002",
    title: "Metamorph Brooch",
    slug: "metamorph-brooch",
    imageUrl: "https://cdn.example.local/catalog/metamorph-brooch.jpg",
    isFeatured: false,
    mediaType: "image",
  },
  {
    id: "cat-003",
    title: "Echo Pendant",
    slug: "echo-pendant",
    imageUrl: "https://cdn.example.local/catalog/echo-pendant.jpg",
    isFeatured: false,
    mediaType: "video",
  },
];

function getRequestId(req) {
  return req.headers["x-request-id"] || randomUUID();
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

function parseLocaleOrFail(url, requestId, res) {
  const locale = url.searchParams.get("locale");
  if (!locale) {
    return null;
  }

  if (!ALLOWED_LOCALES.has(locale)) {
    sendError(
      res,
      400,
      "VALIDATION_ERROR",
      "Invalid locale. Allowed values: ru, en.",
      requestId
    );
    return { invalid: true };
  }

  return locale;
}

const server = http.createServer((req, res) => {
  const requestId = String(getRequestId(req));
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (req.method !== "GET") {
    sendError(res, 405, "VALIDATION_ERROR", "Only GET method is supported.", requestId);
    return;
  }

  if (url.pathname === "/health") {
    sendJson(res, 200, { service: SERVICE_NAME, status: "ok", requestId });
    return;
  }

  if (url.pathname === "/api/v1/catalog/items") {
    const localeCheck = parseLocaleOrFail(url, requestId, res);
    if (localeCheck && localeCheck.invalid) {
      return;
    }

    sendJson(res, 200, { items: catalogItems });
    return;
  }

  if (url.pathname === "/api/v1/catalog/preview") {
    const localeCheck = parseLocaleOrFail(url, requestId, res);
    if (localeCheck && localeCheck.invalid) {
      return;
    }

    const preview = catalogItems.slice(0, 2).map((item) => ({
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      isFeatured: item.isFeatured,
    }));

    sendJson(res, 200, { items: preview });
    return;
  }

  sendError(res, 404, "NOT_FOUND", "Route not found.", requestId);
});

server.listen(PORT, "0.0.0.0", () => {
  // eslint-disable-next-line no-console
  console.log(`${SERVICE_NAME} started on port ${PORT}`);
});

