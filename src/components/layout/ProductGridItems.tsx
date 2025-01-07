import { Product } from "@/lib/shopify/types"
import Link from "next/link"
import React from 'react'
import GridTileImage from "../grid/GridTileImage"

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link href={`product/${product.handle}`} className="relative inline-block h-full w-full" prefetch={true}>
            <GridTileImage/>
          </Link>
        </Grid.Item>
      ))}
    </>
  )
}
