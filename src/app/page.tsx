import HomeV2 from "@/components/home-v2";
import HomeStructuredData from "@/components/home-structured-data";
import { SemanticRelatedLinks } from "@/components/semantic-related-links";

export default function Page() {
  return (
    <>
      <HomeStructuredData />
      <HomeV2 />
      <SemanticRelatedLinks currentPath="/" language="pt-BR" limit={5} />
    </>
  );
}
