export interface Appliance {
  id: string;          // UUID gerado via crypto.randomUUID()
  name: string;        // Nome do aparelho
  powerWatts: number;  // Potência máxima em Watts
  voltage: 110 | 220 | 'BIVOLT'; // Tensão de operação do aparelho
  currentAmps: number; // Corrente calculada em Amperes
  isOn: boolean;       // Estado ligado/desligado
  status?: 'normal' | 'burned' | 'weak'; // Estado físico simulado
}
