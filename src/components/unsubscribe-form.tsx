"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { unsubscribeAction } from "@/actions/unsubscribe";
import { initialUnsubscribeState } from "@/lib/unsubscribe-state";
import { Button } from "@/components/ui/button";

// Abmeldung erst nach Klick auf den Button (POST): Würde schon das Öffnen des
// Links abmelden, könnten Mail-Scanner und Link-Vorschauen Nutzer:innen ohne
// ihr Zutun abmelden.
export function UnsubscribeForm({
  email,
  token,
  encodedEmail,
}: {
  email: string;
  token: string;
  encodedEmail: string;
}) {
  const t = useTranslations("Unsubscribe");
  const [state, formAction, pending] = useActionState(unsubscribeAction, initialUnsubscribeState);

  if (state.status === "success") {
    return (
      <div role="status">
        <CheckCircle2 className="size-8 text-bewilligt-700" aria-hidden="true" />
        <h1 className="mt-4 text-title text-foreground">{t("successTitle")}</h1>
        <p className="mt-4 text-paragraph-large text-muted-foreground">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form action={formAction}>
      <h1 className="text-title text-foreground">{t("title")}</h1>
      <p className="mt-4 text-paragraph-large text-muted-foreground">{t("lead", { email })}</p>

      {state.status === "error" && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
          <div>
            <p className="text-paragraph-regular font-medium text-foreground">{t("errorTitle")}</p>
            <p className="mt-1 text-paragraph-small text-muted-foreground">{t("errorBody")}</p>
          </div>
        </div>
      )}

      <input type="hidden" name="e" value={encodedEmail} />
      <input type="hidden" name="t" value={token} />

      <Button type="submit" size="lg" className="mt-8 h-12 rounded-full px-6 text-base" disabled={pending}>
        {pending ? t("pending") : t("confirm")}
      </Button>
    </form>
  );
}
