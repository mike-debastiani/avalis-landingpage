// Liegt hier statt in src/actions/unsubscribe.ts, weil eine "use server"-Datei
// ausschliesslich async Functions exportieren darf, keine Konstanten.
export type UnsubscribeState = {
  status: "idle" | "success" | "error";
};

export const initialUnsubscribeState: UnsubscribeState = { status: "idle" };
