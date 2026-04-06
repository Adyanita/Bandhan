-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dob" DATETIME NOT NULL,
    "height" TEXT,
    "maritalStatus" TEXT,
    "complexion" TEXT,
    "bodyType" TEXT,
    "diet" TEXT,
    "photo" TEXT,
    "religion" TEXT NOT NULL,
    "caste" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "languages" TEXT,
    "about" TEXT,
    "hobbies" TEXT,
    "education" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "income" TEXT,
    "fatherProfession" TEXT,
    "motherProfession" TEXT,
    "siblings" TEXT,
    "partnerReligion" TEXT,
    "partnerCity" TEXT,
    "partnerMinAge" INTEGER,
    "partnerMaxAge" INTEGER,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
