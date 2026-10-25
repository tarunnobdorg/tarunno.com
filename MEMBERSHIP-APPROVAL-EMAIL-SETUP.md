# Membership approval email setup

The membership approval welcome email is sent by the installable spreadsheet `onEdit` trigger in `codegs/Code.gs`. Updating website files alone does not install this trigger or grant Google Mail permissions.

1. Open the Google Sheet connected to Tarunno and open **Extensions → Apps Script**.
2. Replace/update the project code with the updated `codegs/Code.gs` contents (keep any deployment-specific settings intact).
3. In the function dropdown, select `installMembershipApprovalTrigger` and click **Run**.
4. Review and authorize the requested spreadsheet and email permissions using the Google account that owns the script.
5. Ensure the `Members` sheet has `status`, `email`, `language`, `membershipNumber`, and `approvedAt` header columns. Run `setupTarunnoSheets` only if you know it is safe for your current sheet; it adds missing columns but does not overwrite existing rows.
6. Test with a new membership request and a valid email. Change that row's `status` cell to `approved` manually. The trigger should assign a membership number, change status to `active`, and send the welcome email. Check **Apps Script → Executions** if it does not arrive, and check Spam.

Important: installable triggers do not run when a script changes a cell programmatically; approval must be made by editing the status cell in the Sheet unless the admin workflow explicitly calls the email function. Existing rows with a membership number are intentionally not re-issued a number/email.
