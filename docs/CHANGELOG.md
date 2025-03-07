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
## **v1.2.0.25022401 (March 07, 2025)**

**Part 4: Over more features**
1. Enable Sale Settings for Standard/Basic Subscription Package
2. Enable Printing Credit Note Accounting Form
3. Bill List: Add Memo column and allow to export

**Part 3: Performance improvement**
1. Debit Note: Fix issue Debit Note Journal contains null text 
2. Journal: Prevent posting imbalance journal (revalidate total debt/credit on posting
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
- Add toolstip info(help icon)  in column Last Reconciliation Period and Last Reconciliation Balance

2. [Support] Bank Reconciliation  Improvement
 In Start Reconciliation Screen -- Bank Reconciliation Information
- Add tools tip info for Opening balance per bank field
- Refresh the opening balance per bank value if the user modifies or redoes the bank reconciliation. 
The opening balance value is retrieved from the ending balance per bank of the previous bank reconciliation period for the related bank account, including drafted or pending approval transactions. (Previous feature: retrieved only from approved bank reconciliations.)

- When user start reconcile or draft the bank reconciliation, Opening balance per bank and Started Date  are retreived from the latest reconcile transaction for the selected bank account (Chart of Accounts), including drafted or pending approval transactions. (Previous feature: retrieved only from latest approved bank reconciliations.).

3. Invoice List - Print Invoice
- Now user can Print Invoice from every approved invoice entryImprovement

4. Add Type column of related List Module
-  Item List: Add Item Type column and allow to filter by Item type
-  Bill List: Add Bill Type column and allow user to filter by Bill Type
-  Invoice List: Add Invoice Type column and allow user to filter by Invoice Type
-  Credit Note List: Add Credit Note Type column adn allow user to filter by Credit Note Type

5. Payment Voucher/Receipt Template Change Request
-  Add new Reference No field which display at the half right side in same line as Payment Method at the right side

---
## **v1.2.0.24121101 - December 17th, 2024**

**Improvement**

- Receipt Printing: Now user can print Reciept from Invoice List (from Paid Invoice'entry actions) and from Paid Invoice View page
- Payment Voucher Printing: Now user can print Payment Voucher from Bill List (from Paid Bill'entry actions) and Paid Bill View
- Bank Reconciliation: Allow user to filter by Bank Account Number and Ending Balance
- Collection List: Add column Collection Type and allow user to fitler by collection Type
- Payment List: Add column Payment Type and allow user to filter by payment type
- Add Help Menu (Near Notification Menu/Bell icon)

---

## **v1.1.x - December 6th, 2024**
### **Fixes**
- Resolved an issue where Bank Reconciliation did not display the latest reconciliation information for related bank accounts.

### **Improvements**
#### **Invoice Template**
- Formatted phone numbers for both company and customer fields.
- Adjusted the logo print position.
- Aligned the exchange rate display.
- Enabled configuration for displaying the exchange rate in the footer.

#### **Invoice/Bill List Page**
- Added a "Paid Status" column to display statuses: unpaid, fully paid, or partially paid (for approved invoices/bills only).
- Added an "Outstanding Amount" column.

#### **General Improvements**
- Enhanced system security (Phase 2).
- Improved accounting posting processes (Phase 1).

---

## **v1.1.x - November 22nd, 2024**
### **Fixes**
1. Corrected rounding differences as outlined in `Feedback documents` (remaining point 7 in LOG-I).

### **Improvements**
- Enabled print functionality for Payment Vouchers.
- Enhanced app security (Phase 1).
- Improved add-on subscription management:
  - Allowed users to add or subtract add-on quantities during plan upgrades/renewals.
  - Enabled reactivation of previously disabled add-on users, provided the company has sufficient add-on quantities.

---

## **v1.1.x - October 31st, 2024**
### **Reports**
#### **Trial Balance Report**
- Applied retained earnings.
- Corrected Profit & Loss account balances to accumulate only for the relevant fiscal year.

#### **Invoice Template Customization**
- **Form Header**:  
  - Added a "Header Style" option to toggle between justified and centered header displays.  
  - Enabled configuration to change the separator between English (En) and Khmer (Kh) labels (use "/" or a new line).
- **Table**:  
  - Allowed column width adjustments.  
- **Form Footer**:  
  - Added an option to configure additional remarks below the memo section.

---

### **Print Features**
#### **Journal Voucher Printout/Accounting Form**
- Enabled printing of single or multiple journal vouchers from both Journal View and Journal List View.
- Allowed customization of field information before printing.
- Added the option to save as a generic template.

#### **Receipt Printout/Accounting Form**
- Enabled printing of single or multiple receipts from both Collection View and List View.
- Allowed customization of field information before printing.
- Added the option to save as a generic template.

---

### **Other Improvements**
- **Bank Reconciliation**:  
  - Enabled transaction refresh on view/edit.  
  - Improved reconciliation performance.  
- **Reports**:  
  - Enhanced query performance for Balance Sheet, Profit & Loss, and General Ledger reports.  
- **Roles**:  
  - Prevented users from disabling the Super Admin role.  
- **Chart of Accounts**:  
  - Prevented deletion of accounts linked to Fixed Asset Classification.  
- **Goods Receipt**:  
  - Set the default goods receipt date to the most recent transaction date.  
  - Prevented approval of later transactions before earlier transactions.
