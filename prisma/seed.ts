import { PrismaClient } from "@prisma/client";
import { amplifiers } from "../data/amplifiers";

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.amplifier.deleteMany();

  // amplifiers 데이터 삽입
  for (const amp of amplifiers) {
    await prisma.amplifier.create({
      data: {
        name: amp.name,
        name_slug: amp.name_slug,
        description: amp.description,
        price: amp.price,
        specs: amp.specs,
        thumbnail: amp.thumbnail,
        spec_image: amp.spec_image,
        warranty: amp.warranty,
        images: amp.images,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
