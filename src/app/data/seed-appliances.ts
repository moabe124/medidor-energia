import { Appliance } from '../models/appliance.model';

export const SEED_APPLIANCES: Appliance[] = [
  { id: crypto.randomUUID(), name: 'Chuveiro Elétrico (Futuro)',  powerWatts: 5500, currentAmps: 5500 / 220, isOn: false },
  { id: crypto.randomUUID(), name: 'Carro BYD (Recarga)',         powerWatts: 2400, currentAmps: 2400 / 220, isOn: false },
  { id: crypto.randomUUID(), name: 'Ar-condicionado 22k',         powerWatts: 2200, currentAmps: 2200 / 220, isOn: false },
  { id: crypto.randomUUID(), name: 'Air Fryer',                   powerWatts: 1800, currentAmps: 1800 / 220, isOn: false },
  { id: crypto.randomUUID(), name: 'Lava-louças (Futuro)',        powerWatts: 1500, currentAmps: 1500 / 220, isOn: false },
  { id: crypto.randomUUID(), name: 'Computador Moabe',            powerWatts: 800,  currentAmps: 800  / 220, isOn: true  },
  { id: crypto.randomUUID(), name: 'Máquina de Lavar',            powerWatts: 500,  currentAmps: 500  / 220, isOn: false },
  { id: crypto.randomUUID(), name: 'Computador Tassi',            powerWatts: 400,  currentAmps: 400  / 220, isOn: true  },
  { id: crypto.randomUUID(), name: 'Geladeira',                   powerWatts: 212,  currentAmps: 212  / 220, isOn: true  },
  { id: crypto.randomUUID(), name: 'Xbox / PS5',                  powerWatts: 210,  currentAmps: 210  / 220, isOn: false },
  { id: crypto.randomUUID(), name: 'TV',                          powerWatts: 155,  currentAmps: 155  / 220, isOn: false },
  { id: crypto.randomUUID(), name: 'Iluminação (Geral)',          powerWatts: 100,  currentAmps: 100  / 220, isOn: true  },
  { id: crypto.randomUUID(), name: 'Roteador (Fonte 12V)',        powerWatts: 24,   currentAmps: 24   / 220, isOn: true  },
];
