
# PTO Manager Pro 🚀

Enterprise-grade Paid Time Off management system optimized for Microsoft Teams integration.

## 🛠 Features
- **Automated Accruals**: Calculates 1.54 hours per week automatically.
- **Anniversary Resets**: Handles year-over-year balance resets based on hire date.
- **Manager Portal**: Assign roles and approve requests.
- **Daily Digest**: One-click summary email for Eleanor (Ops Director).

## 👔 Manager Setup
To promote an employee to Manager status:
1. Log in as a current Manager (or use the role switcher for setup).
2. Go to the **Manager Portal**.
3. Locate the **Team Management** sidebar.
4. Click the role badge next to an employee's name to toggle them between **Employee** and **Manager**.

## 📧 Daily Digest (eleanor@flccmail.com)
The system is configured to report daily attendance to the Operations Director.
- **Manual Trigger**: Click "Send Daily Digest to Eleanor" in the Manager Portal. Gemini will draft a professional summary based on current "Approved" absences for today.
- **Automation Note**: To make this 100% automated at 8 AM daily without manual clicks, the system must be connected to a backend cron service (e.g., Vercel Cron) via an API provider like Resend.

## 🔒 Privacy & Data Visibility
The application is designed with strict visibility boundaries:
- **Employees**: Can ONLY see their own requests and balances.
- **Managers**: Can see ALL organization requests and manage team roles.
- **Teams**: Can see a general "Who's Away" list (names only).

## 🚀 Deployment (Vercel)
1. Push this code to a **GitHub** repository.
2. Connect the repository to **Vercel**.
3. Add the following **Environment Variable** in Vercel:
   - `API_KEY`: Your Google Gemini API Key.
