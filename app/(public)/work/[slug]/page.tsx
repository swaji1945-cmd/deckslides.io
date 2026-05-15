import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function WorkSlugRedirect({ params }: Props) {
  const { slug } = await params;
  redirect(`/portfolio/${slug}`);
}
