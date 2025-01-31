"use client";

import React from "react";
import { useFontSize } from "@/app/_context/font-size-context";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/_components/ui/select";
import { Button } from "../_components/ui/button";
import Navbar from "../_components/navbar";
import Link from "next/link";

export default function SettingsPage() {
  const { fontSize, setFontSize } = useFontSize();

  const handleSelectChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setFontSize(newSize);
  };

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h1 className="mb-4 text-xl font-bold">Configurações</h1>

        <div className="mb-6">
          <h2 className="mb-2 text-lg">Tamanho da Fonte</h2>

          <Select value={String(fontSize)} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione um tamanho" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="14">1 (Padrão)</SelectItem>
              <SelectItem value="16">2</SelectItem>
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
    </>
  );
}
