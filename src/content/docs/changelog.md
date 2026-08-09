---
title: "What's New"
description: "What's new and what's better in Vithean, month by month — new features, improvements and changes to how the system works, written for the people who use it."
---

Vithean is a cloud system, so improvements reach you automatically — there is
nothing to download or install. This page records what changed and when, month by
month, in plain terms.

:::tip[Looking for how to do something?]
This page covers *what changed*. For step-by-step instructions, use the sidebar or
the search box at the top of the page (<kbd>Ctrl</kbd> + <kbd>K</kbd>).
:::

---

## 2026

### July 2026

**New**

- **Import debit notes.** Debit notes can now be brought in from a file the same
  way as invoices and bills, instead of being entered one at a time.

**Improved**

- **Names on journal entry lines.** Each line of a manual journal can now carry a
  name, so you can see who a line relates to without opening the transaction.
- **Fixed assets.** The depreciation start date can now be changed on assets that
  allow it, so a correction no longer means recreating the asset.

### June 2026

**Improved**

- **Goods Receipt import.** The import dialog now links to the import template
  for general-type receipts, so you can download the correct file without leaving
  the screen.
- **Inventory reports.** The prepared date shown on screen and the one in the
  exported file now always match.

### May 2026

**Improved**

- **A/R and A/P Aging reports now include debit notes.** Aging figures reflect
  debit note transactions alongside invoices and bills, so outstanding balances
  are complete.
- **General Ledger includes debit notes.** Debit note entries appear in the
  General Ledger report.
- **Goods Issue numbering.** Goods Issue now has a default document prefix in
  Advance Setting, so numbering works without extra configuration.

### April 2026

**New**

- **Pay your subscription manually.** A manual payment route was added alongside
  the existing options, making renewals easier for businesses that pay by transfer.

**Improved**

- **Inventory Movement by Items report.** Your report header settings now carry
  through to the exported file.
- **Goods Issue and Goods Receipt** refinements following the March release.

### March 2026

**New**

- **Goods Issue and Goods Receipt (General).** You can now record stock moving in
  and out on its own, without a bill or an invoice behind it — for opening stock,
  write-offs, internal use, samples and adjustments. This completes inventory
  movement alongside the existing purchase and sales flows.

**Improved**

- **Item Profitability report** is now sorted by item code, so it lines up with
  your item list.

### January 2026

**Improved**

- **Subscription payments.** Settlement details for subscription payments are now
  visible, so you can confirm what has been paid and when.

---

## 2025

### December 2025

**Improved**

- **Larger manual journals.** Journals with more than 50 entry lines can now be
  posted — useful for payroll allocations, month-end accruals and opening
  balances.

*Manual:* the user manual was simplified for public use and published as a web
document on 5 December 2025.

### November 2025

**Improved**

- **Invoice import.** The invoice import template now includes a Template column,
  so imported invoices can be assigned their print template as they come in.
- **Customer list.** A Notes column was added and can be exported.
- **Exports in Khmer.** Exported lists now show the local (Khmer) name where one
  is recorded, instead of falling back to English.

### October 2025

**Improved**

- **E-invoicing.** Refinements to the e-invoice module following the July release,
  including how status updates are received from CamInv.

### July 2025

**New — Cambodia e-invoicing (CamInv)**

Vithean connects directly to **CamInv**, Cambodia's e-invoicing system. E-invoicing
is handled inside your accounting rather than as a separate task in a separate
tool. The integration covers:

- **Connecting your CamInv account** to Vithean, with connection details and
  history visible, and the ability to disconnect
- **CamInv customer records** — maintain the counterparties you exchange documents
  with
- **Sending documents** — invoices, credit notes and debit notes go to CamInv from
  the transaction you already recorded
- **Accepting or rejecting** documents sent to you
- **Status tracking** — see where each document stands, with a full status history
- **Official copies** — download the CamInv XML and PDF for your records
- **Permissions** — control which users can view and export e-invoice documents

**Improved**

- **Void transactions in journal reports** now show their description, so it is
  clear why an entry was voided.

### June 2025

**New**

- **Release information in the app.** You can see what changed in the current
  release from inside Vithean.

### May 2025

**New**

- **Download printable forms as PDF.** Accounting forms can be downloaded as a PDF
  with a print preview first, rather than going straight to the printer.

**Improved**

- **Files are named after the document.** A previewed or exported form now uses
  the document number as its filename — `INV000001.pdf` rather than a generic
  name — so saved files are findable later.
- **Cleaner download control.** The download button on printable templates was
  simplified to an icon.
- **Reference numbers tidy themselves.** Extra spaces are trimmed automatically
  when you save a transaction, so a stray space no longer creates a near-duplicate
  reference.
- **A/R and A/P Aging reports** now show customer and vendor credit amounts, giving
  a truer picture of what is really outstanding.

### April 2025

**Improved**

- **Invoice template labels.** The exchange rate and signature labels can be
  renamed to match how your business words them.
- **Correcting manual journals.** An imbalanced journal can now be reversed, so a
  mistake can be undone cleanly instead of worked around.
- **Clearer invoice printing.** The print layout was adjusted so the exchange rate
  and labels read more clearly.
- **General Ledger access.** The View General Ledger tooltip no longer appears
  where the option does not apply.

### March 2025

**New**

- **Sale Settings on Basic and Standard.** Sale settings are available on the
  Basic and Standard packages, not only on higher plans.
- **Print the Credit Note accounting form.**

**Improved**

- **Chart of accounts.** Account codes and names can be edited, including the
  system defaults, so your chart can match how your business reports.
- **KHR on printouts.** Khmer riel values are formatted correctly on printed
  documents.
- **Commercial invoice template.** The template omits the VAT information field
  and shows unit prices inclusive of VAT when printed.
- **Credit notes** gained a billing address field in Khmer.
- **Bill list** gained a Memo column, which can be exported.
- **Opening balance migration.** The export splits chart of accounts information
  into three separate columns, making the file easier to work with, and the
  address component was improved.

### January 2025

**New**

- **Payment Voucher 2 template** — a second voucher layout to choose from.

**Improved**

- **Local names across master data.** Customer, Vendor, Item, Class, Warehouse and
  Job lists all carry a local name column, and it can be exported — so your records
  can hold Khmer and English names side by side.
- **Invoice template.** A VAT column can be added to the table (tax by entry), and
  text alignment can be set per column.

---

## 2024

### December 2024

**New**

- **Print receipts from the invoice list** or the invoice view page.
- **Print payment vouchers from the bill list** or the bill view page.
- **Print an invoice from any approved entry**, not only at the point of issue.
- **Help menu** added beside the notification icon.

**Improved**

- **Bank account list** shows the last reconciliation balance, with tooltips
  explaining the reconciliation period and balance columns.
- **Bank reconciliation.** The opening balance per bank refreshes as things change
  and now includes draft and pending transactions, so the starting figure is right.
- **Filter by type.** Item, Bill, Invoice and Credit Note lists gained a Type
  column with filters, as did the Collection and Payment lists.
- **Bank reconciliation filters** by bank account and ending balance.
- **Payment vouchers and receipts** show a Reference No beside the payment method.
- **Invoice and bill lists** gained Paid Status and Outstanding Amount columns, so
  you can see what is still owed without opening each record.
- **Invoice template** improvements to phone formatting, logo, rate alignment and
  footer rate configuration.

### November 2024

**New**

- **Payment voucher printing.**

**Improved**

- **Subscriptions.** Add-on quantities and reactivation are handled more smoothly.

### October 2024

**New**

- **Journal voucher and receipt printing.** Print one or many at a time, customise
  the layout, and save it as a template for next time.

**Improved**

- **Trial Balance** now includes retained earnings, with improved Profit and Loss
  accumulation.
- **Invoice customisation.** Header style, Khmer/English separator, column width
  and footer remarks can all be set.
- **Goods receipt** uses a sensible default date, with clearer approval ordering.

---

## User manual updates

| Date | What changed |
|---|---|
| August 2026 | Added a [What is Vithean?](/about/) overview and expanded the [FAQ](/troubleshoot/faq/) from a single link to a full set of answers |
| December 2025 | Manual simplified for public use and published as a web document |

---

Something missing or unclear? Tell us at <contact@vithean.com> and we will fix the
page.
