const API_GATEWAY_URL = process.env.API_GATEWAY_URL || "http://localhost:8080";

async function fetchFromGateway(pathname) {
  const response = await fetch(`${API_GATEWAY_URL}${pathname}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function getHomeData(locale = "ru") {
  return fetchFromGateway(`/api/v1/home?locale=${locale}`);
}

export async function getCatalogData(locale = "ru") {
  return fetchFromGateway(`/api/v1/catalog?locale=${locale}`);
}

export async function getVisualResearchData(locale = "ru") {
  return fetchFromGateway(`/api/v1/visual-research?locale=${locale}`);
}

