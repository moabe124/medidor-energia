import { Appliance } from '../app/models/appliance.model';

export const environment = {
  production: false,
  seedAppliances: [
    { id: crypto.randomUUID(), name: 'Chuveiro Elétrico (Futuro)',  powerWatts: 5500, voltage: 220, currentAmps: 5500 / 220, isOn: false },
    { id: crypto.randomUUID(), name: 'Carro BYD (Recarga)',         powerWatts: 2400, voltage: 220, currentAmps: 2400 / 220, isOn: false },
    { id: crypto.randomUUID(), name: 'Ar-condicionado 22k',         powerWatts: 2200, voltage: 220, currentAmps: 2200 / 220, isOn: false },
    { id: crypto.randomUUID(), name: 'Air Fryer',                   powerWatts: 1800, voltage: 110, currentAmps: 1800 / 110, isOn: false },
    { id: crypto.randomUUID(), name: 'Lava-louças (Futuro)',        powerWatts: 1500, voltage: 220, currentAmps: 1500 / 220, isOn: false },
    { id: crypto.randomUUID(), name: 'Computador Moabe',            powerWatts: 800,  voltage: 'BIVOLT', currentAmps: 0, isOn: true  },
    { id: crypto.randomUUID(), name: 'Máquina de Lavar',            powerWatts: 500,  voltage: 110, currentAmps: 500  / 110, isOn: false },
    { id: crypto.randomUUID(), name: 'Computador Tassi',            powerWatts: 400,  voltage: 'BIVOLT', currentAmps: 0, isOn: true  },
    { id: crypto.randomUUID(), name: 'Geladeira',                   powerWatts: 212,  voltage: 110, currentAmps: 212  / 110, isOn: true  },
    { id: crypto.randomUUID(), name: 'Xbox / PS5',                  powerWatts: 210,  voltage: 'BIVOLT', currentAmps: 0, isOn: false },
    { id: crypto.randomUUID(), name: 'TV',                          powerWatts: 155,  voltage: 'BIVOLT', currentAmps: 0, isOn: false },
    { id: crypto.randomUUID(), name: 'Iluminação (Geral)',          powerWatts: 100,  voltage: 'BIVOLT', currentAmps: 0, isOn: true  },
    { id: crypto.randomUUID(), name: 'Roteador (Fonte 12V)',        powerWatts: 24,   voltage: 'BIVOLT', currentAmps: 0, isOn: true  },
  ] as Appliance[]
};
