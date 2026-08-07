import { Appliance } from '../app/models/appliance.model';

export const environment = {
  production: true,
  seedAppliances: [
    { id: crypto.randomUUID(), name: 'Chuveiro Elétrico',  powerWatts: 5500, voltage: 220, currentAmps: 5500 / 220, isOn: false },
    { id: crypto.randomUUID(), name: 'Ar-condicionado',    powerWatts: 2200, voltage: 220, currentAmps: 2200 / 220, isOn: false },
    { id: crypto.randomUUID(), name: 'Air Fryer',          powerWatts: 1800, voltage: 110, currentAmps: 1800 / 110, isOn: false },
    { id: crypto.randomUUID(), name: 'Lava-louças',        powerWatts: 1500, voltage: 220, currentAmps: 1500 / 220, isOn: false },
    { id: crypto.randomUUID(), name: 'Micro-ondas',        powerWatts: 1200, voltage: 110, currentAmps: 1200 / 110, isOn: false },
    { id: crypto.randomUUID(), name: 'Máquina de Lavar',   powerWatts: 500,  voltage: 110, currentAmps: 500  / 110, isOn: false },
    { id: crypto.randomUUID(), name: 'Computador Desktop', powerWatts: 400,  voltage: 'BIVOLT', currentAmps: 0, isOn: true  },
    { id: crypto.randomUUID(), name: 'Geladeira',          powerWatts: 212,  voltage: 110, currentAmps: 212  / 110, isOn: true  },
    { id: crypto.randomUUID(), name: 'Videogame',          powerWatts: 210,  voltage: 'BIVOLT', currentAmps: 0, isOn: false },
    { id: crypto.randomUUID(), name: 'TV',                 powerWatts: 155,  voltage: 'BIVOLT', currentAmps: 0, isOn: false },
    { id: crypto.randomUUID(), name: 'Iluminação (Geral)', powerWatts: 100,  voltage: 'BIVOLT', currentAmps: 0, isOn: true  },
    { id: crypto.randomUUID(), name: 'Roteador Wi-Fi',     powerWatts: 24,   voltage: 'BIVOLT', currentAmps: 0, isOn: true  },
  ] as Appliance[]
};
