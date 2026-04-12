-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
