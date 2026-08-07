# ⚡ Medidor de Energia Residencial

> Single Page Application (SPA) para monitoramento e gestão em tempo real do consumo elétrico residencial em **220V**, desenvolvida com **Angular 22.1**, **Signals**, **Signal Forms** e persistência via **localStorage**.

---

## 🚀 Sobre o Projeto

O **Medidor de Energia** é um painel interativo que permite ao usuário cadastrar e controlar a carga de seus eletrodomésticos em tempo real. A aplicação calcula automaticamente a corrente total exigida pela fiação da casa e alerta visualmente contra sobrecargas elétricas.

### 💡 Principais Destaques

- **Dashboard HUD Lâmpada Gigante**: Mostra a corrente total ($A$) e potência ($W$) com iluminação neon reativa ao estado da fiação.
- **Moldura de Status Luminosa (Ambient Viewport Glow)**: Borda luminosa em toda a janela que reflete a cor do status (Verde, Amarelo ou Vermelho Pulsante) mesmo ao rolar a página para baixo.
- **Gestão de Aparelhos (CRUD Completo)**: Cadastro, edição e exclusão de aparelhos com cálculo automático de corrente.
- **Ordenação Estável**: Aparelhos ordenados por potência (W) que não saltam de posição ao serem ligados/desligados.
- **Persistência Local**: Salva automaticamente todas as alterações no `localStorage` sob a chave `'medidor-energia-appliances'`.

---

## ⚡ Regras de Negócio & Fórmulas

As seguintes constantes elétricas são utilizadas para os cálculos:

| Constante | Valor | Descrição |
|---|---|---|
| **Tensão de Rede ($V$)** | `220 V` | Padrão da fiação residencial |
| **Capacidade Máxima ($I_{máx}$)** | `41 A` | Limite de corrente do cabo |
| **Potência Máxima Teórica** | `~9.020 W` | $41 \text{ A} \times 220 \text{ V}$ |

### Cálculo da Corrente ($I$)

$$I = \frac{P}{220}$$

- **Corrente Individual**: `currentAmps = powerWatts / 220`
- **Corrente Total**: Soma da corrente dos aparelhos ativos (`isOn === true`).
- **Potência Total**: Soma da potência em Watts dos aparelhos ativos (`isOn === true`).

### Sistema de Tráfego de Carga (Traffic Light)

| Faixa de Corrente | Status | Cor / Glow | Comportamento Visual |
|---|---|---|---|
| $I \le 32 \text{ A}$ | 🟢 **Seguro** | Verde Neon | Operação normal da fiação |
| $32 \text{ A} < I \le 41 \text{ A}$ | 🟡 **Atenção** | Amarelo Neon | Carga próxima ao limite do cabo |
| $I > 41 \text{ A}$ | 🔴 **Sobrecarga** | Vermelho Pulsante | Animação de pulso contínuo na lâmpada e na borda da tela |

---

## 🛠️ Tecnologias Utilizadas

- **Angular 22.1** (Standalone Components, Signals, Zoneless, OnPush Default)
- **Signal Forms** (`@angular/forms/signals` com `form()`, `required()`, `min()`, `max()`)
- **Dependency Injection**: `@Injectable({ providedIn: 'root' })` com `inject()`
- **Estilização**: SCSS, Dark Mode nativo, Glassmorphism, CSS Custom Properties e Animações `@keyframes`.
- **TypeScript 6** & **Node.js 24+**

---

## 📁 Estrutura de Pastas

```
src/
├── app/
│   ├── models/
│   │   └── appliance.model.ts          # Interface Appliance
│   ├── constants/
│   │   └── electrical.constants.ts     # VOLTAGE (220V), MAX_AMPS (41A), thresholds
│   ├── data/
│   │   └── seed-appliances.ts          # Lista inicial de 13 aparelhos seed
│   ├── services/
│   │   └── appliance.service.ts        # Serviço de estado reativo com Signals e localStorage
│   ├── components/
│   │   ├── header/                     # Dashboard Lâmpada Gigante (HUD)
│   │   ├── appliance-card/             # Card individual do aparelho
│   │   ├── appliance-list/             # Container Grid responsivo + FAB
│   │   └── appliance-form/             # Modal com Signal Forms
│   ├── app.ts / app.html / app.scss    # Layout principal + Ambient Viewport Glow
│   └── app.config.ts
├── styles.scss                         # Reset CSS, variáveis globais e animações
└── index.html
```

---

## 🔧 Como Executar o Projeto Localmente

### Pré-requisitos

- **Node.js**: `22+` (ou v24)
- **Angular CLI**: `22+`

### Passo a Passo

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/SEU_USUARIO/medidor-energia.git
   cd medidor-energia
   ```

2. **Instalar as dependências**:
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm start
   ```

4. **Acessar no navegador**:
   Abra [http://localhost:4200/](http://localhost:4200/)

### Compilar para Produção

```bash
npm run build
```
Os arquivos otimizados serão gerados na pasta `dist/medidor-energia`.

---

## 📜 Licença

Este projeto está sob a licença MIT. Desenvolvido para medição e controle de carga elétrica residencial.
