/*
  Warnings:

  - You are about to drop the column `seriesId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Series` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `usage` on the `PostMedia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MediaUsageType" AS ENUM ('COVER', 'CONTENT', 'GALLERY');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_seriesId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "seriesId";

-- AlterTable
ALTER TABLE "PostMedia" DROP COLUMN "usage",
ADD COLUMN     "usage" "MediaUsageType" NOT NULL;

-- DropTable
DROP TABLE "Series";
