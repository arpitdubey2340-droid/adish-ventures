import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products } from '@/lib/products';
import ProductDetail from './ProductDetail';

// Statically prerender one page per product at build time.
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} | Ethnobotanical`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) notFound();

  const related = products.find((p) => p.id !== slug) ?? null;

  return <ProductDetail product={product} related={related} />;
}
