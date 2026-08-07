export interface Appliance {
  id: string;          // UUID gerado via crypto.randomUUID()
  name: string;        // Nome do aparelho
  powerWatts: number;  // Potência máxima em Watts
  voltage: 110 | 220;  // Tensão de operação do aparelho
  currentAmps: number; // Calculado: powerWatts / voltage
  isOn: boolean;       // Estado ligado/desligado
}
