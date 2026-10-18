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


## Membership sheet + branded email patch
- Membership form now submits with action `registerMember`, so new requests are written to `Members`, not `Volunteers`.
- The Apps Script creates a branded HTML receipt email for membership requests and donor registrations when an optional valid email is supplied.
- After copying the Apps Script into the Google Sheet project, run `setupTarunnoSheets()` once and `installMembershipApprovalTrigger()` once (authorize both), then deploy a new Web App version.
- To approve a member, set that row's `status` cell in `Members` to exactly `approved`. The simple spreadsheet `onEdit` handler assigns a monthly `T-YYYYMMNN` membership number and sends the welcome email. Example: `T-20261001`. This handler runs only for direct spreadsheet edits; if approval is later performed through an Admin Panel/API, that workflow must call equivalent server-side logic.
- IMPORTANT: the included `admin/index.html` is only an API diagnostic dashboard; it does not currently provide a secure approve button. Approve from the Members sheet for now. The email sender is the Google account that owns/runs the Apps Script, with `wearetarunno@gmail.com` as reply-to; set up that account/verified send-as alias if you require that exact From address.
- Test with a dummy member record before public launch. Existing Volunteers rows are not moved or deleted.


## Latest UI update (2026-10)
- Blood donor results stay empty until the search form is submitted.
- The donor registration CTA is positioned near the finder heading and opens the hidden registration form.
- Removed the specified donor privacy/helper paragraphs from the visible Blood page.
- Home page membership and donor buttons are spaced to either side to keep the central banner logo visible.
- Header styling now uses subtle Tetulia mountain/tea-garden inspired green shapes.
- About page includes Founder, Advisors, and Executive Committee sections. These sections display active records from the `Members` sheet when their `category` or `role` contains the corresponding label.

### Important limitation
The current `admin/index.html` is still an API diagnostic dashboard, not a secure content editor. Add/edit/remove actions require a secured Apps Script backend and an admin authentication mechanism; do not expose unrestricted write/delete endpoints on a public deployment.


## Donation and team editor setup
1. Open the Apps Script project attached to the Tarunno Database spreadsheet.
2. Replace the existing script with `codegs/New Text Document.txt`, save it, then run `setupTarunnoSheets()` once.
3. In Apps Script → Project Settings → Script properties, add `TARUNNO_ADMIN_KEY` with a long, private key. Never publish this key.
4. Deploy a new Web App version using the same intended execution/access settings.
5. Open `admin/index.html`, enter the admin key, and save donation methods or team profiles. The editor currently accepts public photo URLs; direct photo upload requires a separate image hosting endpoint.
6. Existing bKash and Rocket numbers on `donation.html` are the previously supplied values. Add Nagad and bank details through the editor after setup.
