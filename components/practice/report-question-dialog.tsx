"use client";

import { useState, useTransition } from "react";
import { Flag, Warning } from "@phosphor-icons/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { reportPracticeQuestion } from "@/app/practice/actions";
import type { OptionKey } from "@/lib/types/practice";

interface ReportQuestionDialogProps {
  questionId: string;
  currentCorrect: OptionKey;
}

/**
 * Small dialog letting a student flag a question they think is wrong.
 * Captures reason and (optionally) the answer they consider correct.
 */
export function ReportQuestionDialog({
  questionId,
  currentCorrect,
}: ReportQuestionDialogProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [proposed, setProposed] = useState<OptionKey | "">("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const submit = () => {
    const trimmed = reason.trim();
    if (!trimmed) {
      setError("Cuéntanos brevemente qué está mal.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await reportPracticeQuestion({
        questionId,
        reason: trimmed,
        proposedCorrect: proposed || null,
      });
      if (result.error) {
        toast.error("No se pudo enviar el reporte", {
          description: result.error,
        });
        return;
      }
      toast.success("Gracias, reporte enviado");
      setReason("");
      setProposed("");
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="ghost" size="xs" />}>
        <Flag />
        Reportar
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-heading">
            Reportar esta pregunta
          </DialogTitle>
          <DialogDescription>
            Explícanos qué está mal (respuesta incorrecta, ambigüedad, error
            tipográfico, etc.). Un docente lo revisará.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">¿Qué está mal?</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows={4}
              placeholder="Ej. La respuesta marcada como correcta es la C, pero debería ser la B porque…"
              maxLength={2000}
              disabled={pending}
            />
            <p className="text-xs text-muted-foreground">
              La respuesta actualmente marcada como correcta es{" "}
              <span className="font-mono font-semibold">
                {currentCorrect}
              </span>
              .
            </p>
          </div>

          <div className="space-y-2">
            <Label>Si conoces la respuesta correcta, márcala (opcional)</Label>
            <RadioGroup
              value={proposed}
              onValueChange={(value) => setProposed(value as OptionKey)}
              className="grid grid-cols-4 gap-2"
              disabled={pending}
            >
              {(["A", "B", "C", "D"] as OptionKey[]).map((key) => {
                const isSelected = proposed === key;
                return (
                  <label
                    key={key}
                    htmlFor={`proposed-${key}`}
                    className={cn(
                      "flex h-9 cursor-pointer items-center justify-center border px-2 font-mono text-sm transition-colors",
                      isSelected
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-secondary/40 hover:bg-secondary"
                    )}
                  >
                    <RadioGroupItem
                      id={`proposed-${key}`}
                      value={key}
                      className="sr-only"
                    />
                    {key}
                  </label>
                );
              })}
            </RadioGroup>
          </div>

          {error ? (
            <Alert variant="destructive">
              <Warning />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" disabled={pending}>
                Cancelar
              </Button>
            }
          />
          <Button onClick={submit} disabled={pending}>
            {pending ? "Enviando..." : "Enviar reporte"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
