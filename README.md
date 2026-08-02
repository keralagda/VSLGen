# 📦 VONIXX Shipping Label Generator (VSLGen)

VONIXX VSLGen is a **Metadata-Driven Runtime** and registry-first logistics operating system designed to build, compile, preview, and print shipping labels without hardcoded business rules, carrier capabilities, or document layouts.

Built on the **VONIXX Registry-Driven Architecture (VRA)**, VSLGen separates label templates from runtime state, composing layouts on the fly from self-describing, extensible schemas.

---

## 🚀 Key Features

*   **Registry-Driven Runtime (VRA)**: Driven by 12 core registries (Shipping, Geography, UI, Workflow, Validation, and Templates) matching VONIXX OS Foundational Doctrines.
*   **Wired Template Layouts**: Standardized UPS, FedEx, and USPS layout definitions with barcode, QR, shipper details, consignee details, shipment matrix grids, fragile instructions, and branding footers.
*   **High-Resolution Exports**: Download labels instantly as high-resolution PNGs or exact-dimension `4" x 6"` portrait PDFs using `html2canvas` and `jsPDF`.
*   **Thermal Printer Spooling**: Spool labels directly to thermal label printers using a popup print frame that preserves stylesheet formatting and CSS metrics.
*   **Autofill Size Presets**: Predefined box size dimensions loaded dynamically from packaging registries (`Small Box`, `Medium Box`, `Large Box`) to instantly populate shipment measurements.
*   **Dynamic Geographical Autocomplete**: Dynamic state and city lists resolved from geo-registries on country switch (with search datalist suggestion support).
*   **Universal Randomizer**: A metadata-driven random data generator that populates carrier details, COD parameters, and addresses dynamically.

---

## 🛠️ Architecture Overview

The system compiles static registries into a unified store database accessed by the execution engines:

```
[Registry Modules] (*.ts) ──> [RegistryLoader] ──> [RegistryCompiler]
                                                      │
                                                      ▼
[Live Preview] <── [LabelPreview] <── [RegistryStore] (Compiled DB)
```

### Core Execution Engines
*   `RegistryResolver`: Resolves dropdown options, defaults, and autocomplete options dynamically.
*   `RegistryValidator`: Diagnoses schema compliance at launch.
*   `CommandEngine`: Processes command strings.
*   `WorkflowEngine`: Orchestrates logistics processing steps.

---

## 💻 Tech Stack

*   **Frontend Core**: React 19, TypeScript
*   **Build Tooling**: Vite, ESBuild
*   **State Management**: Zustand (with persistent storage sync)
*   **Form Validation**: React-Hook-Form, Zod Schema resolver
*   **Export Helpers**: `html2canvas` (canvas capture), `jspdf` (PDF builder)

---

## 🏃 Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/keralagda/VSLGen.git
cd VSLGen
npm install
```

### 2. Launch Development Server
```bash
npm run dev
```
Open http://localhost:3000 in your browser to view the dashboard!

### 3. Verify Code Quality & Build
```bash
# Run linting check (0 warnings allowed)
npm run lint

# Compile production package
npm run build
```

---

## 🛡️ License

Private repository. Configured for VONIXX Shipping Logistics ecosystem.
