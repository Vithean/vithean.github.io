# About

> As cloud base system, the release and update would happen regularly base on feedback and issue found.

# I. User Manual Revisions

## December 5th, 2025
- Simplify user manual for public
- Transform to Web Document

# II. System Release Notes
> Some release notes will be added here for users' information

## v1.1.x - December 6th, 2024

- Fix issue on Bank Reconciliation does not show the latest reconcilation info of related bank account
- Improvement on Invoice Template
  - Formatted phone number (company and customer)
  - Adjust logo print position
  - Align exchange rate
  - Allow configure display exchange rate at footer

- Improvement on Invoice/Bill List Page
  - Add Paid Status column which display unpaid, fully paid or partially paid (for only approved invoices/Bills)
  - Add Outstanding Amount column 
  
- Security improvement(2)
- Improvement on accounting posting(1)

## v1.1.x - November 22nd, 2024

1. Apply correction on 2024-11-08-Test Log-Acc Form-JV OR PV & Others-v1.xlsx — Remaining point 7 in LOG-I  Rounding different
2. Enable print Payment Voucher 
3. Improvement on App Security (V1)
4. Improvement on User Add-ons Subscription Management
. Allow user to add/substract add-ons user qty on Upgrade/Renew plan
. In User Main List, allow user to re-activate previous disabled add-ons user in case Company has enough user add-ons qty.

## v1.1.x - October 31st, 2024
1. Trial Balance Report
  * Apply Retained Earning
  * Correct balance of Profit& Loss accounts to accumulate only in report fiscal year related. 
2. Invoice Template Customization
  * Form Header: Add Header Style which allow user to switch the display or Invoice Header between Justified or Center display.
  * Form Header: Allow user to configure change separator (use / or indent to new line) between En label and Kh label.
  * Table: Allow user to adjust column width
  * Form Footer:  Allow user to configure additional remarks info below memo

3. Journal Voucher Printout/Accounting Form
  * Allow user to print one or multiple Journal Voucher from Journal View and Journal List View
  * Allow user to customize some fields information before print
  * Allow Save as Generic Template 

4. Receipt Printout/Accounting Form
  * Allow user to print one or multiple receipt from Collection View and List View
  * Allow user to customize some fields information before print
  * Allow Save Generic Template 


5. Other Improvement
  * [Support] Bank Reconciliation: refresh transaction in book on view/edit
  * Bank Reconciliation performance improvement
  * Report Balance Sheet/ Profit and Loss/ General Ledger: improve query performance
  * Role: prevent user disable super admin role
  * Chart of Account: prevent user delete account that linked to Fixed Asset Classification
  * New Goods Receipt: set default goods receipt date to the latest added goods receipt transaction date.
  * Goods Receipt: Prevent user approve later transaction before earlier transaction.