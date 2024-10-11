/*
  Warnings:

  - You are about to alter the column `timer` on the `Timer` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Timer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timer" REAL NOT NULL,
    "audio" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);
INSERT INTO "new_Timer" ("audio", "id", "timer", "userId") SELECT "audio", "id", "timer", "userId" FROM "Timer";
DROP TABLE "Timer";
ALTER TABLE "new_Timer" RENAME TO "Timer";
CREATE UNIQUE INDEX "Timer_userId_key" ON "Timer"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
