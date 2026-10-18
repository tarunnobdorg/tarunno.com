# তারুণ্য (Tarunno) Website — Updated

## Branding and pages
- Bengali wordmark: **তা** (green) + **রু** (red) + **ণ্য** (green)
- Slogan: **চলো এগিয়ে যাই** with green/red/green colors
- Homepage hero shows only the two calls to action over the existing GitHub banner: Become a member and Become a blood donor.
- Shared responsive header and detailed footer on all pages.
- Only two registration forms: Membership request and Blood donor registration. Both open only after the corresponding CTA is clicked.
- Blood donor search filters by blood group, district (64 districts), and the district's police station/upazila list.

## GitHub Pages upload
Upload the contents of this folder to the repository root and replace the corresponding files. Keep `assets/images/` and its subfolders. Existing local image paths used:
- `assets/images/logo/logo.png`
- `assets/images/banners/banner.png`
- `assets/images/programs/`
- `assets/images/projects/`
- `assets/images/blood/`

## Important API note
The donor search needs the Apps Script API to return approved donor records from the `Donors` sheet. Membership and donor forms use the configured Apps Script URL. Verify the live Apps Script `doPost` handler and spreadsheet headers before collecting real submissions. Uploaded membership photos are resized in the browser and sent as data URLs; the Apps Script endpoint must store them or the photo data will only be part of the request.


## Blood donor search and email confirmation update

1. Upload the website files in this package to the repository, replacing the matching files.
2. Open the Google Apps Script editor attached to the Tarunno spreadsheet. Replace the old script with `codegs/New Text Document.txt` (rename it to `Code.gs` if convenient).
3. Run `setupTarunnoSheets()` once to append the new `email`, `gender`, `dateOfBirth`, `address`, and other missing headers without deleting existing data.
4. Deploy > Manage deployments > Edit the Web App deployment, select a new version, and deploy. The script owner/deployer must authorize email sending when prompted. Confirmation emails are sent only when the applicant provides a valid optional email; sender is the Google account that owns the Apps Script deployment (reply-to is wearetarunno@gmail.com).
5. The donor API now reads the actual `BloodDonors` sheet (also accepts the legacy `Donors` query alias). Only approved/active/verified donors who gave contact consent are shown. Existing donor phone numbers missing the leading zero are normalized for display/dialing; new submissions are stored with a leading zero.

Note: if the Apps Script web app is deployed under a different Google account, the welcome email will be sent from that account unless `wearetarunno@gmail.com` is configured as a verified send-as alias.
