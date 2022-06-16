/*
  Warnings:

  - You are about to drop the column `photoId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `photoID` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_photoId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "photoId",
DROP COLUMN "userId",
ADD COLUMN     "photoID" INTEGER NOT NULL,
ADD COLUMN     "userID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_photoID_fkey" FOREIGN KEY ("photoID") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
