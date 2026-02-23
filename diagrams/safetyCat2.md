# Processus d'évaluation externe : Vue d'ensemble

Cliquez sur les boîtes ci-dessous pour accéder au détail de chaque étape.

```mermaid
flowchart LR
    %% Noeuds principaux
    ID_TSI[1. Catégories TSI & NoBo]
    ID_CSM[2. Catégories CSM, CENELEC, AR & Eval. externes]
   

    %% Styles et liens
    style ID_TSI fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#01579b
    style ID_CSM fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#e65100

    ID_TSI --> ID_CSM

    %% Interactions (Liens cliquables vers les ancres du document)
    click ID_TSI href "#1-tsi" "Voir le détail TSI"
    click ID_CSM href "#2-csm-cen" "Voir le détail CSM"
```

> **Navigation rapide** : [1. Détail TSI](#1-tsi) | [2. Détail CSM & EN 50126](#2-csm-cen) 

---

## <a id="1-tsi"></a>1. Catégorie TSI et NoBo

[Retour en haut](#processus-dévaluation-externe--vue-densemble)

```mermaid
flowchart TB
    %% =================================================================================
    %% CHECKLIST VERTICALE DES SOUS-SYSTEMES (Ex-Partie 3 intégrée ici)
    %% =================================================================================
    START(["DÉBUT : Identification TSI"]) --> CHECK_INF{"Infrastructure (INF) ?"}

    %% 1. INFRASTRUCTURE
    CHECK_INF -->|Oui| Q_TSI_INF{"TSI INF, PRM, SRT ?"}
    Q_TSI_INF -->|Non / Hors Scope| T_INF_M1["[TSI-1] Non applicable"]:::tsi_m1
    Q_TSI_INF -->|Oui| Q_P_INF{"Paramètre modifié ?"}
    
    Q_P_INF -->|Non| T_INF_0["[TSI0] Impact mineur"]:::tsi_0
    Q_P_INF -->|Oui| ADD_INF["[TSI1] + TSI INF / PRM / SRT (NoBo)"]:::tsi_1
    
    ADD_INF --> CHECK_CCSG
    T_INF_M1 --> CHECK_CCSG
    T_INF_0 --> CHECK_CCSG
    CHECK_INF -->|Non| CHECK_CCSG

    %% 2. CCS SOL
    CHECK_CCSG{"CCS Sol (CCSG) ?"}
    CHECK_CCSG -->|Oui| Q_TSI_CCSG{"TSI CCS ?"}
    Q_TSI_CCSG -->|Non / Hors Scope| T_CCSG_M1["[TSI-1] Non applicable"]:::tsi_m1
    Q_TSI_CCSG -->|Oui| Q_P_CCSG{"Paramètre modifié ?"}
    
    Q_P_CCSG -->|Non| T_CCSG_0["[TSI0] Impact mineur"]:::tsi_0
    Q_P_CCSG -->|Oui| ADD_CCSG["[TSI1] + TSI CCS (NoBo)"]:::tsi_1
    
    ADD_CCSG --> CHECK_CCSA
    T_CCSG_M1 --> CHECK_CCSA
    T_CCSG_0 --> CHECK_CCSA
    CHECK_CCSG -->|Non| CHECK_CCSA

    %% 3. CCS BORD
    CHECK_CCSA{"CCS Bord (CCSA) ?"}
    CHECK_CCSA -->|Oui| Q_TSI_CCSA{"TSI CCS ?"}
    Q_TSI_CCSA -->|Non / Hors Scope| T_CCSA_M1["[TSI-1] Non applicable"]:::tsi_m1
    Q_TSI_CCSA -->|Oui| Q_P_CCSA{"Paramètre modifié ?"}
    
    Q_P_CCSA -->|Non| T_CCSA_0["[TSI0] Impact mineur"]:::tsi_0
    Q_P_CCSA -->|Oui| ADD_CCSA["[TSI1] + TSI CCS (NoBo)"]:::tsi_1
    
    ADD_CCSA --> CHECK_ENE
    T_CCSA_M1 --> CHECK_ENE
    T_CCSA_0 --> CHECK_ENE
    CHECK_CCSA -->|Non| CHECK_ENE

    %% 4. ENERGIE
    CHECK_ENE{"Energie (ENE) ?"}
    CHECK_ENE -->|Oui| Q_TSI_ENE{"TSI ENE, SRT ?"}
    Q_TSI_ENE -->|Non / Hors Scope| T_ENE_M1["[TSI-1] Non applicable"]:::tsi_m1
    Q_TSI_ENE -->|Oui| Q_P_ENE{"Paramètre modifié ?"}

    Q_P_ENE -->|Non| T_ENE_0["[TSI0] Impact mineur"]:::tsi_0
    Q_P_ENE -->|Oui| ADD_ENE["[TSI1] + TSI ENE / SRT (NoBo)"]:::tsi_1

    ADD_ENE --> CHECK_RST
    T_ENE_M1 --> CHECK_RST
    T_ENE_0 --> CHECK_RST
    CHECK_ENE -->|Non| CHECK_RST

    %% 5. MATERIEL ROULANT
    CHECK_RST{"Matériel Roulant (RST) ?"}
    CHECK_RST -->|Oui| Q_TSI_RST{"TSI LOC&PAS, WAG... ?"}
    Q_TSI_RST -->|Non / Hors Scope| T_RST_M1["[TSI-1] Non applicable"]:::tsi_m1
    Q_TSI_RST -->|Oui| Q_P_RST{"Paramètre modifié ?"}

    Q_P_RST -->|Non| T_RST_0["[TSI0] Impact mineur"]:::tsi_0
    Q_P_RST -->|Oui| ADD_RST["[TSI1] + TSI LOC&PAS... (NoBo)"]:::tsi_1

    ADD_RST --> CHECK_OPE
    T_RST_M1 --> CHECK_OPE
    T_RST_0 --> CHECK_OPE
    CHECK_RST -->|Non| CHECK_OPE

    %% 6. EXPLOITATION
    CHECK_OPE{"Exploitation (OPE) ?"}
    CHECK_OPE -->|Oui| Q_TSI_OPE{"TSI OPE, PRM ?"}
    Q_TSI_OPE -->|Non / Hors Scope| T_OPE_M1["[TSI-1] Non applicable"]:::tsi_m1
    Q_TSI_OPE -->|Oui| Q_P_OPE{"Paramètre modifié ?"}

    Q_P_OPE -->|Non| T_OPE_0["[TSI0] Impact mineur"]:::tsi_0
    Q_P_OPE -->|Oui| ADD_OPE["[TSI1] + TSI OPE / PRM (NoBo)"]:::tsi_1

    ADD_OPE --> CHECK_MNT
    T_OPE_M1 --> CHECK_MNT
    T_OPE_0 --> CHECK_MNT
    CHECK_OPE -->|Non| CHECK_MNT

    %% 7. ENTRETIEN
    CHECK_MNT{"Entretien (MNT) ?"}
    CHECK_MNT -->|Oui| Q_TSI_MNT{"TSI OPE/INF (Maint) ?"}
    Q_TSI_MNT -->|Non / Hors Scope| T_MNT_M1["[TSI-1] Non applicable"]:::tsi_m1
    Q_TSI_MNT -->|Oui| Q_P_MNT{"Paramètre modifié ?"}

    Q_P_MNT -->|Non| T_MNT_0["[TSI0] Impact mineur"]:::tsi_0
    Q_P_MNT -->|Oui| ADD_MNT["[TSI1] + TSI ... (NoBo)"]:::tsi_1

    ADD_MNT --> CHECK_TEL
    T_MNT_M1 --> CHECK_TEL
    T_MNT_0 --> CHECK_TEL
    CHECK_MNT -->|Non| CHECK_TEL

    %% 8. APPLICATIONS TELEMATIQUES
    CHECK_TEL{"App. Télématiques (TEL) ?"}
    CHECK_TEL -->|Oui| Q_TSI_TEL{"TSI TAF, TAP ?"}
    Q_TSI_TEL -->|Non / Hors Scope| T_TEL_M1["[TSI-1] Non applicable"]:::tsi_m1
    Q_TSI_TEL -->|Oui| Q_P_TEL{"Paramètre modifié ?"}
    
    Q_P_TEL -->|Non| T_TEL_0["[TSI0] Impact mineur"]:::tsi_0
    Q_P_TEL -->|Oui| ADD_TEL["[TSI1] + TSI TAF / TAP (NoBo)"]:::tsi_1

    ADD_TEL --> END([Fin Analyse TSI])
    T_TEL_M1 --> END
    T_TEL_0 --> END
    CHECK_TEL -->|Non| END

    %% Styles
    classDef tsi_1 fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef tsi_0 fill:#fff3cd,stroke:#e65100,stroke-width:1px;
    classDef tsi_m1 fill:#e8f5e9,stroke:#2e7d32,stroke-width:1px;
```

## Définition des catégories et impacts

### Catégories TSI (Interopérabilité)

| ID | Définition | Impact évaluation |
| :--- | :--- | :--- |
| **TSI-1** | Changement hors périmètre des TSI | Pas de NoBo |
| **TSI0** | Changement n’affectant aucun paramètre réglementé par les TSI | NoBo |
| **TSI1** | Changement affectant au moins un paramètre réglementé par les TSI | NoBo |


---

## <a id="2-csm-cen"></a>2. Catégories CSM, CENELEC, AR & Eval. externes

[Retour en haut](#processus-dévaluation-externe--vue-densemble)

```mermaid
flowchart TB

    %% =========================
    %% 1. FILTRES INITIAUX
    %% =========================
    START(["DÉBUT Analyse Sécurité"]) --> Q_SUBST{"Substitution ? (Maintenance)"}
    Q_SUBST -->|Oui| END_SUBST["CAT1 / CEN1 (Ni AsBo, ni ISA)"]:::ok

    Q_SUBST -->|Non| Q_SAFE{"Relatif à la sécurité ?"}
    Q_SAFE -->|Non| END_SAFE["CAT0 / CEN0 (Ni AsBo, ni ISA)"]:::ok

    %% =========================
    %% 2. DÉTERMINATION DE LA CATÉGORIE CSM
    %% =========================
    Q_SAFE -->|Oui| Q_CTX{"Déploiement dans le SFU ?"}

    %% BRANCHE A : HORS SFU ou SANS DÉPLOIEMENT
    Q_CTX -->|Non| RES_CAT_M1("CAT-1 (Pas d'AsBo)"):::note
    
    %% BRANCHE B : DANS LE SFU
    Q_CTX -->|Oui| Q_UNCHANGED{"Système inchangé ?"}

    Q_UNCHANGED -->|Oui| RES_CAT2_UNCH("CAT2 (Pas d'AsBo)"):::note
    Q_UNCHANGED -->|Non| Q_SIGNIF{"Impact sécurité significatif ?"}

    Q_SIGNIF -->|Non| RES_CAT2_MOD("CAT2 (Pas d'AsBo)"):::note
    Q_SIGNIF -->|Oui| Q_AMES{"AMES requise ? (Autorisation NSA)"}

    Q_AMES -->|Non| RES_CAT3("CAT3 (AsBo)"):::warn
    Q_AMES -->|Oui| RES_CAT4("CAT4 (AsBo & NSA)"):::risk

    %% =========================
    %% 3. ETCS ASBO CHECK
    %% =========================
    RES_CAT_M1 --> CHECK_ETCS
    RES_CAT2_UNCH --> CHECK_ETCS
    RES_CAT2_MOD --> CHECK_ETCS
    RES_CAT3 --> CHECK_ETCS
    RES_CAT4 --> CHECK_ETCS
    
    CHECK_ETCS{"TSI CCS 2023 (ETCS) ?"}
    CHECK_ETCS -->|Oui| FORCE_ASBO["+ CSM RA (AsBo) - Obligatoire"]:::risk
    CHECK_ETCS -->|Non| NEXT_CEN((Suite))
    FORCE_ASBO --> NEXT_CEN

    %% =========================
    %% 4. CATÉGORISATION CENELEC
    %% =========================
    NEXT_CEN --> Q_NATURE{"Nature du Système ?"}

    %% CAS LEGACY
    Q_NATURE -->|Legacy| RES_CEN_M1["CEN-1 (Pas d'ISA)"]:::ok

    %% CAS CERTIFIÉ / NOUVEAU
    Q_NATURE -->|"Certifié ou Nouveau"| Q_CYCLE{"Impact sur Cycle de Vie ?"}

    Q_CYCLE -->|Mineur| RES_CEN2["CEN2 (Pas d'ISA)"]:::note
    Q_CYCLE -->|Majeur| RES_CEN3["CEN3 (ISA REQUIS)"]:::risk

    %% =========================
    %% 5. IDENTIFICATION REFERENTIEL TECHNIQUE (HW/SW)
    %% =========================
    RES_CEN_M1 --> Q_SIG_HW
    RES_CEN2 --> Q_SIG_HW
    RES_CEN3 --> Q_SIG_HW

    Q_SIG_HW{"Matériel Signalisation ?"}
    Q_SIG_HW -->|Oui| ADD_50129["+ EN 50129"]:::cen    
    Q_SIG_HW -->|Non| NEXT_SW((Suite))
    ADD_50129 --> NEXT_SW

    NEXT_SW --> Q_SW{"Logiciel (SW) ?"}
    Q_SW -->|Oui| ADD_50128["+ EN 50128"]:::cen
    Q_SW -->|Non| END([Fin Référentiel Sécurité])
    ADD_50128 --> END

    %% =========================
    %% LEGENDES & STYLES
    %% =========================
    classDef ok fill:#cfc,stroke:#090,stroke-width:2px;
    classDef note fill:#eef,stroke:#00d,stroke-width:2px;
    classDef warn fill:#ffeba1,stroke:#d90,stroke-width:2px;
    classDef risk fill:#fbb,stroke:#d00,stroke-width:4px;
    classDef cen fill:#f3e5f5,stroke:#4a148c,stroke-width:2px;
```




---

## Définition des catégories et impacts

### Catégories CSM (Sécurité)

| ID | Définition | Impact évaluation |
| :--- | :--- | :--- |
| **CAT-1** | Changement hors périmètre de la CSM | Pas d’AsBo |
| **CAT0** | Changement non relatif à la sécurité | Pas d’AsBo |
| **CAT1** | Substitution dans le cadre d'un entretien | Pas d’AsBo |
| **CAT2** | Changement relatif à la sécurité avec impact non-significatif | Pas d’AsBo (sauf si TSI CCS 2023 est applicable) |
| **CAT3** | Changement relatif à la sécurité avec impact significatif sans autorisation de mise en service par la NSA | AsBo |
| **CAT4** | Changement relatif à la sécurité avec impact significatif et avec autorisation de mise en service par la NSA | AsBo & NSA AMES |

### Catégories EN 50126 (CENELEC)

| ID | Définition | Impact évaluation |
| :--- | :--- | :--- |
| **CEN-1** | Changement hors périmètre de EN 50126 | Pas d’ISA |
| **CEN0** | Changement non relatif à la sécurité | Pas d’ISA |
| **CEN1** | Substitution dans le cadre d'un entretien | Pas d’ISA |
| **CEN2** | Changement nécessistant aucunes ou des preuves de sécurité mineures | Pas d’ISA |
| **CEN3** | Changement nécessistant des preuves de sécurité significatives | ISA |


---

