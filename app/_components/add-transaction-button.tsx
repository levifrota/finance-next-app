"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface AddTransacitionButtonProps {
  userCanAddTransaction?: boolean;
}

const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransacitionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const width = useWindowSize();

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {width ? (
              <Button
                className="rounded-full"
                onClick={() => setDialogIsOpen(true)}
                disabled={!userCanAddTransaction}
                aria-label="Adicionar Transação"
                aria-description="Adicione uma despesa, um investimento ou depósito"
              >
                <ArrowDownUpIcon />
                Adicionar Transação
              </Button>
            ) : (
              <Button
                className="fixed bottom-[10%] right-[5%] z-10 rounded-full shadow-sm"
                onClick={() => setDialogIsOpen(true)}
                disabled={!userCanAddTransaction}
                aria-label="Adicionar Transação"
                aria-description="Adicione uma despesa, um investimento ou depósito"
              >
                <ArrowDownUpIcon />
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction &&
              "Você atingiu o limite de transações. Atualize seu plano para ter transações ilimitadas."}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;
const useWindowSize = () => {
  return window.innerWidth > 768;
};
