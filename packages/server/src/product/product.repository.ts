import { PrismaClient } from "../generated/prisma"

class ProductRepository {
  prisma = new PrismaClient()

  async getProduct(productId: number) {
    return await this.prisma.product.findUnique({
      where: { id: productId },
    })
  }
}

export const productRepository = new ProductRepository()
