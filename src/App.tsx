import React, { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';
import { InputField } from './components/InputField';
import { ResultCard } from './components/ResultCard';
import { ModeSelector } from './components/ModeSelector';
import {
  calculRendementBrut,
  calculRendementNetCharges,
  calculRendementNetImpot,
  calculMensualitePret,
  calculCashFlows,
} from './utils/calculations';
import type { InvestmentInputs, CalculMode } from './types';

function App() {
  const [mode, setMode] = useState<CalculMode>('brut');
  const [inputs, setInputs] = useState<InvestmentInputs>({
    prixAchat: 200000,
    fraisNotaire: 16000,
    montantTravaux: 10000,
    loyerMensuel: 1000,
    taxeFonciere: 1200,
    chargesCopro: 1200,
    assurancePNO: 200,
    autresCharges: 500,
    montantPret: 180000,
    dureePret: 20,
    tauxPret: 3.5,
    tauxImposition: 30,
  });

  const updateInput = (key: keyof InvestmentInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const results = useMemo(() => {
    const loyerAnnuel = inputs.loyerMensuel * 12;
    const chargesAnnuelles =
      inputs.taxeFonciere + inputs.chargesCopro + inputs.assurancePNO + inputs.autresCharges;
    const mensualitePret = calculMensualitePret(
      inputs.montantPret,
      inputs.tauxPret,
      inputs.dureePret
    );
    const impotsMensuels = (inputs.loyerMensuel * (inputs.tauxImposition / 100)) / 12;

    const rendementBrut = calculRendementBrut(
      loyerAnnuel,
      inputs.prixAchat,
      inputs.fraisNotaire,
      inputs.montantTravaux
    );

    const rendementNetCharges = calculRendementNetCharges(
      loyerAnnuel,
      inputs.taxeFonciere,
      inputs.assurancePNO,
      chargesAnnuelles,
      inputs.prixAchat,
      inputs.fraisNotaire,
      inputs.montantTravaux
    );

    const rendementNetImpot = calculRendementNetImpot(
      loyerAnnuel,
      inputs.taxeFonciere,
      inputs.assurancePNO,
      chargesAnnuelles,
      impotsMensuels * 12,
      inputs.prixAchat,
      inputs.fraisNotaire,
      inputs.montantTravaux
    );

    const cashFlows = calculCashFlows(
      inputs.loyerMensuel,
      mensualitePret,
      chargesAnnuelles / 12,
      impotsMensuels
    );

    return {
      rendementBrut,
      rendementNetCharges,
      rendementNetImpot,
      mensualitePret,
      ...cashFlows,
    };
  }, [inputs]);

  const renderResults = () => {
    switch (mode) {
      case 'brut':
        return (
          <>
            <ResultCard
              title="Rendement brut"
              value={results.rendementBrut}
              className="col-span-2"
            />
            <ResultCard
              title="Mensualité du prêt"
              value={results.mensualitePret}
              suffix="€"
              className="col-span-2"
            />
            <ResultCard
              title="Cashflow brut mensuel"
              value={results.cashFlowBrut}
              suffix="€"
              className="col-span-2"
            />
          </>
        );
      case 'net':
        return (
          <>
            <ResultCard
              title="Rendement net de charges"
              value={results.rendementNetCharges}
              className="col-span-2"
            />
            <ResultCard
              title="Mensualité du prêt"
              value={results.mensualitePret}
              suffix="€"
            />
            <ResultCard
              title="Charges mensuelles"
              value={(inputs.taxeFonciere + inputs.chargesCopro + inputs.assurancePNO + inputs.autresCharges) / 12}
              suffix="€"
            />
            <ResultCard
              title="Cashflow net mensuel"
              value={results.cashFlowNet}
              suffix="€"
              className="col-span-2"
            />
          </>
        );
      case 'netImpots':
        return (
          <>
            <ResultCard
              title="Rendement net d'impôt"
              value={results.rendementNetImpot}
              className="col-span-2"
            />
            <ResultCard
              title="Mensualité du prêt"
              value={results.mensualitePret}
              suffix="€"
            />
            <ResultCard
              title="Charges mensuelles totales"
              value={(inputs.taxeFonciere + inputs.chargesCopro + inputs.assurancePNO + inputs.autresCharges) / 12}
              suffix="€"
            />
            <ResultCard
              title="Impôts mensuels"
              value={(inputs.loyerMensuel * (inputs.tauxImposition / 100))}
              suffix="€"
              className="col-span-2"
            />
            <ResultCard
              title="Cashflow net d'impôts"
              value={results.cashFlowNetImpots}
              suffix="€"
              className="col-span-2"
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Calculator className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            Simulateur d'Investissement Locatif
          </h1>
          <p className="mt-2 text-gray-600">
            Calculez la rentabilité et le cashflow de votre investissement immobilier
          </p>
        </div>

        <ModeSelector mode={mode} onChange={setMode} className="mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Informations du bien</h2>
            <div className="space-y-4">
              <InputField
                label="Prix d'achat"
                value={inputs.prixAchat}
                onChange={(value) => updateInput('prixAchat', value)}
              />
              <InputField
                label="Frais de notaire"
                value={inputs.fraisNotaire}
                onChange={(value) => updateInput('fraisNotaire', value)}
              />
              <InputField
                label="Montant des travaux"
                value={inputs.montantTravaux}
                onChange={(value) => updateInput('montantTravaux', value)}
              />
              <InputField
                label="Loyer mensuel"
                value={inputs.loyerMensuel}
                onChange={(value) => updateInput('loyerMensuel', value)}
              />
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-6">Charges annuelles</h2>
            <div className="space-y-4">
              <InputField
                label="Taxe foncière"
                value={inputs.taxeFonciere}
                onChange={(value) => updateInput('taxeFonciere', value)}
              />
              <InputField
                label="Charges de copropriété"
                value={inputs.chargesCopro}
                onChange={(value) => updateInput('chargesCopro', value)}
              />
              <InputField
                label="Assurance PNO"
                value={inputs.assurancePNO}
                onChange={(value) => updateInput('assurancePNO', value)}
              />
              <InputField
                label="Autres charges"
                value={inputs.autresCharges}
                onChange={(value) => updateInput('autresCharges', value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Financement</h2>
            <div className="space-y-4">
              <InputField
                label="Montant du prêt"
                value={inputs.montantPret}
                onChange={(value) => updateInput('montantPret', value)}
              />
              <InputField
                label="Durée du prêt"
                value={inputs.dureePret}
                onChange={(value) => updateInput('dureePret', value)}
                suffix="ans"
              />
              <InputField
                label="Taux du prêt"
                value={inputs.tauxPret}
                onChange={(value) => updateInput('tauxPret', value)}
                suffix="%"
              />
              <InputField
                label="Taux d'imposition"
                value={inputs.tauxImposition}
                onChange={(value) => updateInput('tauxImposition', value)}
                suffix="%"
              />
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-6">Résultats</h2>
            <div className="grid grid-cols-2 gap-4">
              {renderResults()}
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Formules de calcul du Rendement</h2>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Rendement brut</span> = (Loyer annuel) / (Prix d'achat + Frais de notaire + Travaux) × 100</p>
              <p><span className="font-medium">Rendement net de charges</span> = (Loyer annuel - Taxe foncière - PNO - Charges) / (Prix d'achat + Frais de notaire + Travaux) × 100</p>
              <p><span className="font-medium">Rendement net d'impôt</span> = (Loyer annuel - Taxe foncière - PNO - Charges - Impôts) / (Prix d'achat + Frais de notaire + Travaux) × 100</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Formules de calcul du Cashflow</h2>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Cashflow</span> = Produits encaissés – Charges décaissées</p>
              <p><span className="font-medium">Cashflow brut</span> = Loyer - Mensualité de crédit</p>
              <p><span className="font-medium">Cashflow net</span> = Loyer - Mensualité de crédit - Charges</p>
              <p><span className="font-medium">Cashflow net d'impôts</span> = Loyer - Mensualité de crédit - Charges - Impôts</p>
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm py-4">
            © 2024 Développé par <a href="https://github.com/chedlybz" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">@chedlybz</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;