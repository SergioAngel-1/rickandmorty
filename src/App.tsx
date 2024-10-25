import { useState } from "react";
import { Layout } from "@/components/layout";
import { CharacterGrid } from "@/components/character-grid";
import { CharacterDialog } from "@/components/character-dialog";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./App.css";

export type Character = {
  id: number;
  name: string;
  image: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
  status: string;
  species: string;
};

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  return (
    <ThemeProvider defaultTheme="dark" storageKey="rick-morty-theme">
      <Layout>
        <CharacterGrid onCharacterSelect={setSelectedCharacter} />
        <CharacterDialog
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
        <Toaster />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
