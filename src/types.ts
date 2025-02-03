export interface InvestmentInputs {
  prixAchat: number;
  fraisNotaire: number;
  montantTravaux: number;
  loyerMensuel: number;
  taxeFonciere: number;
  chargesCopro: number;
  assurancePNO: number;
  autresCharges: number;
  montantPret: number;
  dureePret: number;
  tauxPret: number;
  tauxImposition: number;
}

export type CalculMode = 'brut' | 'net' | 'netImpots';