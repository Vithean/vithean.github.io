# **About**

> **As a cloud-based system, updates and releases occur regularly based on user feedback and identified issues.**

---

# **I. User Manual Revisions**

### **December 5th, 2025**
- Simplified the user manual for public use.
- Transformed the manual into a web document.

---

# **II. System Release Notes**

> **Release notes are provided to keep users informed about updates and improvements.**

---

## 📦 **Vithean Release Notes – Version 1.2.0 (April 2025)**

We’re excited to share the latest improvements in Vithean! This release brings new features, refinements, and important fixes to help streamline your accounting workflow.

### ✨ **New Features & Enhancements**

1. **Improved Ledger Access Control**
   * Restricted the "View General Ledger" tooltip when access is not applicable.

2. **Flexible Invoice Template Customization**
   * You can now rename exchange rate and signature labels in invoice templates.

3. **Smarter Manual Journals**
   * Added the ability to reverse imbalanced journal entries for easier corrections.

4. **Updated Invoice Print Layout**
   * Adjusted layout for clearer display of exchange rate and label formatting.

5. **Data Entry Enhancements**
   * Transaction numbers are now automatically trimmed of extra spaces before saving.

### 🛠️ **Bug Fixes**

6. **Export Issue Resolved**
   * Fixed an issue where exported reports occasionally showed duplicate data.

### ⚙️ **System Improvements**

7. **Clean System Logging**
   * Optimized internal logging to reduce unnecessary system warnings.

8. **Improved Error Handling**
   * Enhanced privacy by removing sensitive details from technical error messages.

---

## 🗓️ **Earlier Updates – March 2025**

### March 18, 2025
* **Chart of Accounts Flexibility**: You can now edit account codes and names, including system default ones.
* **Invoice Display Fix**: Improved formatting for KHR currency values on printouts.

### March 07, 2025

**Part 4: Over more features**
1. Enable Sale Settings for Standard/Basic Subscription Package
2. Enable Printing Credit Note Accounting Form
3. Bill List: Add Memo column and allow to export

**Part 3: Performance improvement**
1. Debit Note: Fix issue Debit Note Journal contains null text 
2. Journal: Prevent posting imbalance journal (revalidate total debt/credit on posting)
3. General Ledger Report: preventing over fetch data that lead to out of memory
4. Performance Improvement on accounting transaction posting 
5. Move reverse sale cost process into background task

**Part 2: Template and some Chart of Accounts improvement**
1. Commercial Invoice Template Customization and Printing: The new invoice template will not display the VAT information field, and the Unit Price will include VAT on the printed invoice.
2. Chart of Account: Prevent user delete account used in OPB drafted transaction.
3. Credit Note: Add field Billing Address (KH)

**Part 1: Open Balance Migration Improvement**
1. Opening Balance Migration Export: Split Chart of Accounts column info into 3 different columns
2. Improve Address Component
3. Remove Cache Refresh Permission from Permission UI

---

## **v1.2.0.25011601 - January 17th, 2025**
1. Add new Name Local column in each Master Data List View (Customer, Vendor, Item, Class, Warehouse, Job) and also allow to export this column.
2. Fix General Payment function value rounding issue

## **v1.2.0.25011401 - January 14th, 2025**
1. Add Payment Voucher 2 Template
2. Invoice Template Customization
   - Add VAT column in table column (Tax by entry)
   - Allow user to configure text alignment in each table column

## **v1.2.0.24122001 - December 23th, 2024**

**Improvement**
1. Bank Account List 
   - Add column Last Reconciliation Balance
   - Add tooltip info in column Last Reconciliation Period and Last Reconciliation Balance

2. Bank Reconciliation Improvement
   - Add tooltip for Opening balance per bank
   - Refresh opening balance per bank on change; include draft/pending transactions

3. Invoice List - Print Invoice
   - Print invoice from any approved entry

4. Add Type column of related List Module
   - Item List, Bill List, Invoice List, Credit Note List with type filters

5. Payment Voucher/Receipt Template Change
   - Add Reference No field beside Payment Method

---

## **v1.2.0.24121101 - December 17th, 2024**

**Improvement**
- Print Receipt from Invoice List or View Page
- Print Payment Voucher from Bill List or View Page
- Bank Reconciliation: Filter by Bank Account and Ending Balance
- Collection/Payment List: Filter by Type
- Added Help Menu near Notification icon

---

## **v1.1.x - December 6th, 2024**

### **Fixes**
- Fixed Bank Reconciliation latest record display issue

### **Improvements**
- Invoice Template: Phone formatting, logo, rate alignment, footer rate config
- Invoice/Bill List Page: Added Paid Status and Outstanding Amount columns
- General: Improved security and accounting posting process

---

## **v1.1.x - November 22nd, 2024**

### **Fixes**
- Corrected rounding issue (LOG-I point 7)

### **Improvements**
- Enabled Payment Voucher print
- Improved subscription handling (add-on quantity, reactivation)

---

## **v1.1.x - October 31st, 2024**

### **Reports**
#### **Trial Balance**
- Added retained earnings; improved P&L accumulation logic

#### **Invoice Customization**
- Header style, En/Kh separator, column width, footer remarks

### **Print Features**
- Journal Voucher & Receipt print: single/multiple, customizable, save as template

### **Other Improvements**
- Bank Reconciliation refresh
- Reporting performance for BS, P&L, GL
- Role and account deletion safeguards
- Goods Receipt default date and approval sequencing
