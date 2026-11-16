import { prisma } from "@/lib/db";
export default async function Products() {
  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });
  return <ul>{products.map(p => <li key={p.id}><a href={`/products/${p.slug}`}>{p.name}</a> — {(p.priceCents/100).toFixed(2)} USD</li>)}</ul>;
}
