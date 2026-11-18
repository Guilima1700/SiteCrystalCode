import Home from "./components/home";
import { IdentitySchema } from "./components/json-ld";
import { PAGES } from "./data/content";
import { pageMetadata } from "./lib/seo";

export const metadata = pageMetadata(PAGES[0].title, PAGES[0].description, "/");

export default function Page() {
  return (
    <>
      <IdentitySchema />
      <Home />
    </>
  );
}
