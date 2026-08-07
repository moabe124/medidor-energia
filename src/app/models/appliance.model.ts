export interface Appliance {
  id: string;          // UUID gerado via crypto.randomUUID()
  name: string;        // Nome do aparelho
  powerWatts: number;  // Potência máxima em Watts
  currentAmps: number; // Calculado: powerWatts / 220
  isOn: boolean;       // Estado ligado/desligado
}
