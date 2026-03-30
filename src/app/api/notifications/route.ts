import { NextRequest, NextResponse } from "next/server";

// ── Types ───────────────────────────────────────────────────────────

interface Notification {
  id: string;
  type:
    | "payment"
    | "milestone"
    | "inspection"
    | "permit"
    | "defect"
    | "escrow"
    | "artisan"
    | "material"
    | "system";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl: string | null;
  metadata: Record<string, string | number>;
}

// ── Mock Data ───────────────────────────────────────────────────────

const notifications: Notification[] = [
  {
    id: "notif-001",
    type: "escrow",
    title: "Escrow Payment Received",
    message: "NGN 15,000,000 deposited into escrow for Royal Gardens Estate Phase 2. Funds are now held pending milestone verification.",
    read: false,
    createdAt: "2026-03-30T08:15:00.000Z",
    actionUrl: "/escrow/esc-001",
    metadata: { projectId: "esc-001", amount: 1500000000 },
  },
  {
    id: "notif-002",
    type: "milestone",
    title: "Milestone Completed: Roofing & MEP Rough-in",
    message: "Engr. Fatima Abdullahi has marked the Roofing & MEP Rough-in milestone as complete for Royal Gardens Estate Phase 2. Awaiting inspection approval.",
    read: false,
    createdAt: "2026-03-29T16:30:00.000Z",
    actionUrl: "/projects/PRJ-001/milestones",
    metadata: { projectId: "PRJ-001", milestoneIndex: 2 },
  },
  {
    id: "notif-003",
    type: "inspection",
    title: "Inspection Scheduled",
    message: "Structural inspection for Jabi Luxury Villas Block Work is scheduled for April 2, 2026. Inspector: Engr. Musa Ibrahim.",
    read: false,
    createdAt: "2026-03-29T14:00:00.000Z",
    actionUrl: "/inspections/INS-047",
    metadata: { projectId: "PRJ-003", inspectorName: "Engr. Musa Ibrahim" },
  },
  {
    id: "notif-004",
    type: "defect",
    title: "Defect Reported: Electrical Non-Compliance",
    message: "A critical defect has been logged for Banana Island Residences - earth bonding incomplete on 3rd floor. Remediation required within 14 days.",
    read: false,
    createdAt: "2026-03-28T11:45:00.000Z",
    actionUrl: "/defects/DEF-023",
    metadata: { projectId: "PRJ-004", severity: "critical" },
  },
  {
    id: "notif-005",
    type: "permit",
    title: "Permit Expiring Soon",
    message: "Environmental Impact Assessment permit for Wuse Zone 5 Office Complex expires on April 15, 2026. Renewal recommended within 7 days.",
    read: false,
    createdAt: "2026-03-28T09:00:00.000Z",
    actionUrl: "/permits/PRM-012",
    metadata: { permitNumber: "NESREA/EIA/2024/0892", daysRemaining: 16 },
  },
  {
    id: "notif-006",
    type: "material",
    title: "Cement Price Alert",
    message: "Dangote 3X Cement has increased to NGN 7,500/bag in Lagos (up 10.3% from last quarter). Consider locking in bulk procurement rates.",
    read: true,
    createdAt: "2026-03-27T15:20:00.000Z",
    actionUrl: "/market/prices?material=cement",
    metadata: { previousPrice: 6800, newPrice: 7500 },
  },
  {
    id: "notif-007",
    type: "payment",
    title: "Milestone Disbursement Processed",
    message: "NGN 12,400,000 has been released to Aliyu Construction Group for Jabi Luxury Villas - Site Clearing & Foundation milestone.",
    read: true,
    createdAt: "2026-03-27T10:00:00.000Z",
    actionUrl: "/escrow/esc-003/transactions",
    metadata: { amount: 1240000000, recipientCode: "RCP_mock_aliyu_001" },
  },
  {
    id: "notif-008",
    type: "artisan",
    title: "New Artisan Verification",
    message: "Electrician Chidi Eze (Lagos) has submitted credentials for verification. COREN registration and 12 years experience claimed.",
    read: true,
    createdAt: "2026-03-26T13:30:00.000Z",
    actionUrl: "/artisans/ART-089",
    metadata: { artisanId: "ART-089", trade: "Electrician" },
  },
  {
    id: "notif-009",
    type: "system",
    title: "Weekly Progress Report Ready",
    message: "Your weekly construction progress report for March 20-26, 2026 is ready for review. 3 projects updated, 1 milestone completed.",
    read: true,
    createdAt: "2026-03-26T07:00:00.000Z",
    actionUrl: "/reports?type=project-summary",
    metadata: { reportWeek: "2026-W13" },
  },
  {
    id: "notif-010",
    type: "inspection",
    title: "Inspection Passed",
    message: "Structural integrity inspection for Royal Gardens Estate Phase 2 columns passed. All 32 columns meet NIS 87:2004 standards.",
    read: true,
    createdAt: "2026-03-20T17:00:00.000Z",
    actionUrl: "/inspections/INS-045",
    metadata: { projectId: "PRJ-001", result: "passed" },
  },
  {
    id: "notif-011",
    type: "escrow",
    title: "Transfer Failed - Retry Required",
    message: "Disbursement of NGN 5,600,000 to Nnamdi Okoro Developments failed. Reason: Account number mismatch. Please verify bank details and retry.",
    read: true,
    createdAt: "2026-03-19T14:15:00.000Z",
    actionUrl: "/escrow/esc-002/transactions",
    metadata: { amount: 560000000, errorCode: "ACCOUNT_MISMATCH" },
  },
  {
    id: "notif-012",
    type: "permit",
    title: "Permit Application Approved",
    message: "Building Plan Approval for Lekki Sunrise Terraces has been granted by LASPPPA. Permit number: LASPPPA/2026/BPA/0293.",
    read: true,
    createdAt: "2026-03-18T11:00:00.000Z",
    actionUrl: "/permits/PRM-015",
    metadata: { permitNumber: "LASPPPA/2026/BPA/0293" },
  },
  {
    id: "notif-013",
    type: "material",
    title: "Iron Rod Price Drop",
    message: "12mm High Yield Iron Rod dropped to NGN 400,000/tonne in Abuja (down from NGN 420,000). Good time to procure for upcoming projects.",
    read: true,
    createdAt: "2026-03-17T08:45:00.000Z",
    actionUrl: "/market/prices?material=iron+rod&city=Abuja",
    metadata: { previousPrice: 420000, newPrice: 400000 },
  },
  {
    id: "notif-014",
    type: "milestone",
    title: "Milestone Overdue",
    message: "Block Work & Columns milestone for Jabi Luxury Villas is 5 days past the target date. Current progress: 78%. Contractor has been notified.",
    read: true,
    createdAt: "2026-03-15T09:30:00.000Z",
    actionUrl: "/projects/PRJ-003/milestones",
    metadata: { projectId: "PRJ-003", daysOverdue: 5 },
  },
  {
    id: "notif-015",
    type: "system",
    title: "Platform Maintenance Completed",
    message: "BuildNG platform maintenance completed successfully. New features: bulk material price comparison, improved escrow dashboard, and PDF report export.",
    read: true,
    createdAt: "2026-03-14T06:00:00.000Z",
    actionUrl: null,
    metadata: { maintenanceId: "MAINT-2026-03" },
  },
];

// ── GET Handler ─────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const readFilter = url.searchParams.get("read"); // "true", "false", or null
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
    const perPage = Math.min(
      50,
      Math.max(1, parseInt(url.searchParams.get("perPage") || "20", 10))
    );

    let filtered = [...notifications];

    if (type) {
      filtered = filtered.filter((n) => n.type === type);
    }

    if (readFilter === "true") {
      filtered = filtered.filter((n) => n.read);
    } else if (readFilter === "false") {
      filtered = filtered.filter((n) => !n.read);
    }

    // Sort by date descending (newest first)
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const clampedPage = Math.min(page, totalPages);
    const startIndex = (clampedPage - 1) * perPage;
    const paginated = filtered.slice(startIndex, startIndex + perPage);

    const unreadCount = notifications.filter((n) => !n.read).length;

    return NextResponse.json({
      success: true,
      data: {
        notifications: paginated,
        unreadCount,
      },
      meta: {
        page: clampedPage,
        perPage,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("[Notifications API] GET Error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch notifications" } },
      { status: 500 }
    );
  }
}

// ── PATCH Handler (Mark as Read) ────────────────────────────────────

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const { notificationIds, markAllRead } = body as {
      notificationIds?: string[];
      markAllRead?: boolean;
    };

    if (markAllRead) {
      let updatedCount = 0;
      for (const notification of notifications) {
        if (!notification.read) {
          notification.read = true;
          updatedCount++;
        }
      }

      return NextResponse.json({
        success: true,
        data: {
          message: `Marked ${updatedCount} notifications as read`,
          updatedCount,
          unreadCount: 0,
        },
      });
    }

    if (!notificationIds || !Array.isArray(notificationIds) || notificationIds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Provide notificationIds array or set markAllRead to true",
            code: "VALIDATION_ERROR",
          },
        },
        { status: 400 }
      );
    }

    let updatedCount = 0;
    const notFound: string[] = [];

    for (const id of notificationIds) {
      const notification = notifications.find((n) => n.id === id);
      if (notification) {
        if (!notification.read) {
          notification.read = true;
          updatedCount++;
        }
      } else {
        notFound.push(id);
      }
    }

    const unreadCount = notifications.filter((n) => !n.read).length;

    return NextResponse.json({
      success: true,
      data: {
        message: `Marked ${updatedCount} notifications as read`,
        updatedCount,
        unreadCount,
        ...(notFound.length > 0 && { notFound }),
      },
    });
  } catch (error) {
    console.error("[Notifications API] PATCH Error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to update notifications" } },
      { status: 500 }
    );
  }
}
