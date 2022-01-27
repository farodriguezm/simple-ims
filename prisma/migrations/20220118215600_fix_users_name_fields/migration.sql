/*
  Warnings:

  - You are about to drop the column `fistName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - Added the required column `fist_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "fistName",
DROP COLUMN "lastName",
ADD COLUMN     "fist_name" VARCHAR(64) NOT NULL,
ADD COLUMN     "last_name" VARCHAR(64) NOT NULL;
