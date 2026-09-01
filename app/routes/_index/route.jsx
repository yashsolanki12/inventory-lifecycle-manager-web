import { redirect } from "react-router";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app${url.search ? url.search : ""}`);
  }

  return null;
  // const params = new URLSearchParams(url.searchParams);
  // params.delete("appLoadId");
  // throw redirect(`/app${params.toString() ? `?${params.toString()}` : ""}`);
};

export default function App() {
  return null;
}
