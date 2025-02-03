export const calculRendementBrut = (
  loyerAnnuel: number,
  prixAchat: number,
  fraisNotaire: number,
  travaux: number
): number => {
  const investissementTotal = prixAchat + fraisNotaire + travaux;
  return (loyerAnnuel / investissementTotal) * 100;
};

export const calculRendementNetCharges = (
  loyerAnnuel: number,
  taxeFonciere: number,
  assurancePNO: number,
  charges: number,
  prixAchat: number,
  fraisNotaire: number,
  travaux: number
): number => {
  const investissementTotal = prixAchat + fraisNotaire + travaux;
  const revenuNet = loyerAnnuel - taxeFonciere - assurancePNO - charges;
  return (revenuNet / investissementTotal) * 100;
};

export const calculRendementNetImpot = (
  loyerAnnuel: number,
  taxeFonciere: number,
  assurancePNO: number,
  charges: number,
  impots: number,
  prixAchat: number,
  fraisNotaire: number,
  travaux: number
): number => {
  const investissementTotal = prixAchat + fraisNotaire + travaux;
  const revenuNetImpot = loyerAnnuel - taxeFonciere - assurancePNO - charges - impots;
  return (revenuNetImpot / investissementTotal) * 100;
};

export const calculMensualitePret = (
  montantPret: number,
  tauxAnnuel: number,
  dureeAnnees: number
): number => {
  const tauxMensuel = tauxAnnuel / 12 / 100;
  const nombreMensualites = dureeAnnees * 12;
  return (
    (montantPret * tauxMensuel * Math.pow(1 + tauxMensuel, nombreMensualites)) /
    (Math.pow(1 + tauxMensuel, nombreMensualites) - 1)
  );
};

export const calculCashFlows = (
  loyerMensuel: number,
  mensualitePret: number,
  chargesMensuelles: number,
  impotsMensuels: number
) => {
  const cashFlowBrut = loyerMensuel - mensualitePret;
  const cashFlowNet = cashFlowBrut - chargesMensuelles;
  const cashFlowNetImpots = cashFlowNet - impotsMensuels;

  return {
    cashFlowBrut,
    cashFlowNet,
    cashFlowNetImpots,
  };
};