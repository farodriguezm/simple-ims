-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "fistName" VARCHAR(64) NOT NULL,
    "lastName" VARCHAR(64) NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "password" VARCHAR(128) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_password_key" ON "users"("password");
