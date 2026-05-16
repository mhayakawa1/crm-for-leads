import PageClient from "./PageClient";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}
export async function generateStaticParams() {
  const posts = [
    { slug: ["login"] },
    { slug: ["signup"] },
    { slug: ["dashboard"] },
    { slug: [] },
  ];

  return posts;
}

export default async function CatchAllPage({ params }: PageProps) {
  const resolvedParams = await params;
  const currentPath = resolvedParams.slug
    ? `/${resolvedParams.slug.join("/")}`
    : "/";
  return <PageClient initialPath={currentPath} />;
}
