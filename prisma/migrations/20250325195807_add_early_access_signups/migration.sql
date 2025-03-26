/*
  Warnings:

  - Added the required column `updatedAt` to the `EarlyAccessSignup` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EarlyAccessSignup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "source" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_EarlyAccessSignup" ("createdAt", "email", "id", "source", "status") SELECT "createdAt", "email", "id", "source", "status" FROM "EarlyAccessSignup";
DROP TABLE "EarlyAccessSignup";
ALTER TABLE "new_EarlyAccessSignup" RENAME TO "EarlyAccessSignup";
CREATE UNIQUE INDEX "EarlyAccessSignup_email_key" ON "EarlyAccessSignup"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
