/*
  Warnings:

  - You are about to drop the column `image` on the `Thread` table. All the data in the column will be lost.
  - Added the required column `threadId` to the `Thread` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "image",
ADD COLUMN     "threadId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ThreadImage" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "threadId" INTEGER NOT NULL,

    CONSTRAINT "ThreadImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadImage" ADD CONSTRAINT "ThreadImage_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
