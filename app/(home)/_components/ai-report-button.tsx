"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { BotIcon, DownloadIcon, Loader2Icon } from "lucide-react";
import { generateAiReport } from "../_actions/generate-ai-report";
import { useCallback, useRef, useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";
import Link from "next/link";
import jsPDF from "jspdf";
import "jspdf/dist/polyfills.es.js";

interface AiReportButtonProps {
  hasPremiumPlan: boolean;
  month: string;
}

const AiReportButton = ({ month, hasPremiumPlan }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null);
  const [reportIsLoading, setReportIsLoading] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true);
      const aiReport = await generateAiReport({ month });
      setReport(aiReport);
    } catch (error) {
      console.error(error);
    } finally {
      setReportIsLoading(false);
    }
  };

  const handleDownloadPdf = useCallback(() => {
    console.log("report", report);
    console.log("pdfRef", pdfRef.current);

    if (!report) return;
    if (!pdfRef.current) return;

    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    });

    doc.html(pdfRef.current, {
      callback: function (doc) {
        doc.save("relatorio.pdf");
      },
      x: 10,
      y: 10,
      width: 450,
      windowWidth: pdfRef.current.scrollWidth,
      autoPaging: true,
    });
  }, [report]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Relatório IA <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80%] max-w-[90%] sm:max-h-[80%] sm:max-w-[450px]">
        {hasPremiumPlan ? (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Use inteligência artificial para gerar um relatório com
                informações sobre suas finanças.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="prose max-h-[450px] text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
              <Markdown className="h-60 max-h-[50%] sm:h-auto sm:max-h-none">
                {report}
              </Markdown>
            </ScrollArea>
            {/* Div fora da tela pra gerar PDF */}
            <div
              style={{
                position: "absolute",
                left: "-9999px",
                top: 0,
              }}
            >
              <div
                ref={pdfRef}
                style={{
                  width: "400px",
                  minHeight: "100px",
                  padding: "16px",
                  color: "#000",
                  backgroundColor: "#fff",
                  fontSize: "10px",
                  lineHeight: "1.6",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                <Markdown>{report}</Markdown>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button
                onClick={handleGenerateReportClick}
                disabled={reportIsLoading}
                className="mb-3 mt-3 sm:m-0"
              >
                {reportIsLoading && <Loader2Icon className="animate-spin" />}
                Gerar Relatório
              </Button>
              {report !== null && (
                <Button onClick={handleDownloadPdf}>
                  <DownloadIcon />
                  Baixar relatório
                </Button>
              )}
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Você precisa de um plano premium para gerar relatórios com IA.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button asChild>
                <Link href="/subscription">Assinar plano Premium</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiReportButton;
