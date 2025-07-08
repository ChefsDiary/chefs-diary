/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `UserInfo` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userName` on table `UserInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserInfo" ALTER COLUMN "userName" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_userName_key" ON "UserInfo"("userName");
