-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "photoID" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_photoID_userID_key" ON "Like"("photoID", "userID");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_photoID_fkey" FOREIGN KEY ("photoID") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
