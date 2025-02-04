"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useFontSize } from "@/app/_context/font-size-context";
import dynamic from "next/dynamic";
import Link from "next/link";
import Navbar from "../_components/navbar";
import { Button } from "../_components/ui/button";

const ScreenWrapper = dynamic(
  () => import("@/app/_components/screen-wrapper"),
  { ssr: false },
);

export default function SettingsPage() {
  const { fontSize, setFontSize } = useFontSize();

  const handleSelectChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setFontSize(newSize);
  };

  return (
    <div className="h-full">
      <Navbar />

      <div className="h-full p-6">
        <h1 className="mb-4 text-xl font-bold">Configurações</h1>

        <div className="mb-6">
          <h2 className="mb-2 text-lg">Tamanho da Fonte</h2>

          <Select value={String(fontSize)} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione um tamanho" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="14">1</SelectItem>
              <SelectItem value="16">2 (Padrão)</SelectItem>
              <SelectItem value="18">3</SelectItem>
              <SelectItem value="20">4</SelectItem>
              <SelectItem value="24">5</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button asChild>
          <Link href="/">Voltar</Link>
        </Button>
      </div>

      <ScreenWrapper />
    </div>
  );
}
