-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Timer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timer" REAL,
    "audio" TEXT,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Timer_userId_key" ON "Timer"("userId");
