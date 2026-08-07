# Medidor de Energia Residencial — Contexto do Projeto

> **Leia este arquivo antes de fazer qualquer alteração no projeto.**
> Ele descreve a arquitetura, convenções e fluxo de dados para agilizar o entendimento.

## O que é

Simulador web que permite ao usuário cadastrar aparelhos elétricos da casa, ligar/desligar cada um, e visualizar em tempo real se o consumo total ultrapassa a capacidade da fiação elétrica (disjuntor). O objetivo é responder: **"minha rede elétrica aguenta tudo isso ligado ao mesmo tempo?"**

## Stack

| Item | Versão |
|------|--------|
| Angular | 22 (standalone components, signals) |
| TypeScript | ~6.0 |
| SCSS | Vanilla (sem Tailwind) |
| Node | 22+ |
| Package manager | npm |

## Estrutura de pastas

```
src/app/
├── pages/                    ← Páginas (lazy-loaded)
│   ├── landing/              ← Landing page (rota "/")
│   └── medidor/              ← Tela de medição (rota "/medidor")
├── components/               ← Componentes reutilizáveis
│   ├── header/               ← Dashboard com gauge SVG circular
│   ├── appliance-card/       ← Card individual de aparelho
│   ├── appliance-list/       ← Lista/grid de aparelhos + modal
│   └── appliance-form/       ← Modal de adicionar/editar aparelho
├── services/
│   └── appliance.service.ts  ← Estado global (signals), CRUD, persistência
├── models/
│   └── appliance.model.ts    ← Interface Appliance
├── constants/
│   └── electrical.constants.ts ← VOLTAGE, MAX_AMPS, SAFE_THRESHOLD
├── data/
│   └── seed-appliances.ts    ← Dados iniciais pré-carregados
├── app.routes.ts             ← Rotas (lazy loading)
├── app.config.ts             ← Providers (router)
├── app.ts / app.html / app.scss ← Root (só router-outlet)
```

## Modelo de Dados

```typescript
interface Appliance {
  id: string;          // crypto.randomUUID()
  name: string;        // "Chuveiro Elétrico"
  powerWatts: number;  // 5500
  currentAmps: number; // powerWatts / VOLTAGE (calculado)
  isOn: boolean;       // estado ligado/desligado
}
```

## Constantes Elétricas

| Constante | Valor | Significado |
|-----------|-------|-------------|
| `VOLTAGE` | 220 | Tensão da rede (volts) |
| `MAX_AMPS` | 41 | Capacidade máxima da fiação (amperes) |
| `SAFE_THRESHOLD` | 32 | Até 32A = seguro (verde) |

**Faixas de status:**
- `safe` → corrente ≤ 32A (verde)
- `warning` → corrente > 32A e ≤ 41A (amarelo)
- `overload` → corrente > 41A (vermelho, sobrecarga)

## Fluxo de Dados (Signals)

O `ApplianceService` é o **single source of truth**. Tudo é reativo via Angular Signals:

```
_appliances (signal privado)
  ├── appliances (readonly)
  ├── sortedAppliances (computed: ordenado por potência desc)
  ├── totalCurrentAmps (computed: soma amps dos ligados)
  ├── totalPowerWatts (computed: soma watts dos ligados)
  ├── loadStatus (computed: 'safe' | 'warning' | 'overload')
  └── usagePercent (computed: 0-100%)
```

**Persistência:** auto-save no `localStorage` via `effect()` (chave: `medidor-energia-appliances`).

## Rotas

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | `LandingComponent` | Landing page com hero e CTA |
| `/medidor` | `MedidorComponent` | Dashboard de medição |
| `**` | redirect → `/` | Fallback |

Todas as rotas usam **lazy loading** (`loadComponent`).

## Design System (CSS Custom Properties)

Definido em `src/styles.scss`. Tema **dark mode** com a fonte **Inter**:

- **Backgrounds:** `--bg-primary` (quase preto), `--bg-secondary`, `--bg-elevated`, `--bg-card`
- **Textos:** `--text-primary`, `--text-secondary`, `--text-muted`
- **Cores de status:** `--accent-green` (safe), `--accent-yellow` (warning), `--accent-red` (overload)
- **Bordas:** `--border-subtle`, `--border-card`
- **Raios:** `--radius-sm` (8px), `--radius-md` (12px), `--radius-lg` (16px)
- **Transição padrão:** `--transition` (0.3s cubic-bezier)

## Convenções de Código

- **Standalone components** (sem NgModules)
- **Signal inputs/outputs** (`input()`, `output()`) — não usa `@Input()/@Output()`
- **BEM naming** no SCSS com `&__` nesting
- **Computed signals** para dados derivados (nunca getters)
- **Imports do CommonModule** quando usa `ngClass`, `ngIf`, pipes etc.
- **SCSS por componente** (encapsulado via ViewEncapsulation padrão)

## Comandos

```bash
npm start       # Dev server (ng serve)
npm run build   # Build de produção
npm test        # Testes unitários
```
