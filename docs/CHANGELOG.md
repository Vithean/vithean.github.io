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