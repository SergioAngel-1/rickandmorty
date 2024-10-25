import { useEffect, useState } from "react";
import { Character } from "@/App";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface CharacterGridProps {
  onCharacterSelect: (character: Character) => void;
}

interface ApiResponse {
  results: Character[];
}

export function CharacterGrid({ onCharacterSelect }: CharacterGridProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharacters();
  }, []);

  async function fetchCharacters() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const data: ApiResponse = await response.json();
      setCharacters((prev) => {
        const existingIds = new Set(prev.map((char: Character) => char.id));
        const newCharacters = data.results.filter(
          (char: Character) => !existingIds.has(char.id)
        );
        return [...prev, ...newCharacters];
      });
      setPage((p) => p + 1);
    } catch (error) {
      toast.error("Error al cargar los personajes");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {characters.map((character) => (
          <Card
            key={`character-${character.id}-${page}`}
            className="overflow-hidden transition-all hover:scale-[1.02] cursor-pointer"
            onClick={() => onCharacterSelect(character)}
          >
            <CardContent className="p-0">
              <img
                src={character.image}
                alt={character.name}
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h2 className="line-clamp-1 text-xl font-semibold">
                  {character.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {character.species}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={`skeleton-${i}-${page}`} className="overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="aspect-square" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={fetchCharacters}
          disabled={loading}
          className="min-w-[200px]"
        >
          {loading ? "Cargando..." : "Cargar Más"}
        </Button>
      </div>
    </div>
  );
}
