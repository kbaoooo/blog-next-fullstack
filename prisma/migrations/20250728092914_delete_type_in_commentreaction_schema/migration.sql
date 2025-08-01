/*
  Warnings:

  - You are about to drop the column `type` on the `CommentReaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[commentId,userId]` on the table `CommentReaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CommentReaction_commentId_userId_type_key";

-- AlterTable
ALTER TABLE "CommentReaction" DROP COLUMN "type";

-- CreateIndex
CREATE UNIQUE INDEX "CommentReaction_commentId_userId_key" ON "CommentReaction"("commentId", "userId");
