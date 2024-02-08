-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appUser" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationToken" TEXT,
    "resetPasswordToken" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "userType" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "appUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" SERIAL NOT NULL,
    "permissionName" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "avatar" TEXT,
    "tagLine" TEXT,
    "about" TEXT,
    "country" TEXT NOT NULL,
    "city" TEXT,
    "language" TEXT,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileCategory" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "profileCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profilePlatform" (
    "id" SERIAL NOT NULL,
    "platformName" TEXT NOT NULL,
    "profileLink" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "profilePlatform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "pkgTitle" TEXT NOT NULL,
    "pkgPrice" INTEGER NOT NULL,
    "platformName" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_id_key" ON "Role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_key" ON "Role"("role");

-- CreateIndex
CREATE UNIQUE INDEX "appUser_id_key" ON "appUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "appUser_username_key" ON "appUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "appUser_email_key" ON "appUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_id_key" ON "Permissions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profileCategory_id_key" ON "profileCategory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "profilePlatform_id_key" ON "profilePlatform"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Package_id_key" ON "Package"("id");

-- AddForeignKey
ALTER TABLE "appUser" ADD CONSTRAINT "appUser_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "appUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileCategory" ADD CONSTRAINT "profileCategory_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profilePlatform" ADD CONSTRAINT "profilePlatform_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
