-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "gpa" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
