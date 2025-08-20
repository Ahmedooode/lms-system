// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "@prisma/client";
const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "programming" },
        { name: "Accounting" },
        { name: "Engineering" },
        { name: "Management" },
        { name: "Projects Management" },
        { name: "Engineering Management" },
        { name: "Database" },
      ],
      //   skipDuplicates: true,
    });
    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
