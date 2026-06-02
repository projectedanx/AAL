## CI/CD Pipeline Cartograph

> AST-to-YAML Reverse Trace complete.
> Temporal Flow: Left → Right = Commit → Production.
> ⚠️ No automated CI/CD pipelines detected. All operations are manual execution.

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer
    participant LOC as Local Environment
    participant VITE as Vite Build

    Dev->>LOC: npm install
    Dev->>LOC: npx tsx src/*.test.ts

    rect rgb(254, 243, 199)
        Note over LOC: ⚠️ MANUAL TEST VALIDATION
        Note over LOC: No automated gate guards commit.
        LOC->>LOC: Test Execution (Dialectical Synthesis Engine)
    end

    Dev->>VITE: npm run build

    rect rgb(209, 250, 229)
        Note over VITE: Artifact Generation
        VITE->>VITE: tsc && vite build
        VITE-->>Dev: dist/ folder created
    end

    Note over LOC,VITE: ⚠️ MISSING DEPLOYMENT LINK: Deployment to production<br/>requires undocumented manual intervention.
```
