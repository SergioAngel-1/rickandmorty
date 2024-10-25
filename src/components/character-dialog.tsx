import { Character } from "@/App";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  MapPinIcon,
  HomeIcon,
  ActivityIcon,
  FlaskConicalIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CharacterDialogProps {
  character: Character | null;
  onClose: () => void;
}

const translateStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    Alive: "Vivo",
    Dead: "Muerto",
    unknown: "Desconocido",
  };
  return statusMap[status] || status;
};

const translateSpecies = (species: string) => {
  const speciesMap: Record<string, string> = {
    Human: "Humano",
    Alien: "Alienígena",
    Robot: "Robot",
    unknown: "Desconocido",
  };
  return speciesMap[species] || species;
};

export function CharacterDialog({ character, onClose }: CharacterDialogProps) {
  if (!character) return null;

  const status = translateStatus(character.status);
  const species = translateSpecies(character.species);

  return (
    <Dialog open={!!character} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {character.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="relative w-full pt-[100%]">
            <img
              src={character.image}
              alt={character.name}
              className="absolute inset-0 h-full w-full object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Badge
                variant={
                  character.status === "Alive" ? "default" : "destructive"
                }
                className="text-sm font-medium"
              >
                {status}
              </Badge>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <ActivityIcon className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm">
                Estado: <span className="font-medium">{status}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FlaskConicalIcon className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm">
                Especie: <span className="font-medium">{species}</span>
              </span>
            </div>

            <Separator />

            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm">
                Última ubicación conocida:{" "}
                <span className="font-medium">{character.location.name}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <HomeIcon className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm">
                Origen:{" "}
                <span className="font-medium">{character.origin.name}</span>
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
