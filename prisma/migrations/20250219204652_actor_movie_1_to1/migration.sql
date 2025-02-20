-- AlterTable
ALTER TABLE "movie" ADD COLUMN     "actor_id" INTEGER;

-- AddForeignKey
ALTER TABLE "movie" ADD CONSTRAINT "movie_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "actors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
