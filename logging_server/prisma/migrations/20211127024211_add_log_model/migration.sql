-- CreateTable
CREATE TABLE "log" (
    "id" SERIAL NOT NULL,
    "machineId" TEXT NOT NULL,
    "timestamp" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logLevel" SMALLINT,
    "message" TEXT NOT NULL,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);
