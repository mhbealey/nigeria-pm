// ── BuildNG Notification Service ─────────────────────────────────────
// In-app notification system. In production, this would persist to the
// database and optionally fan out to SMS (Termii) and email channels.

export type NotificationType =
  | "escrow_payment"
  | "material_alert"
  | "inspection_scheduled"
  | "permit_update"
  | "defect_reported"
  | "artisan_matched"
  | "warranty_expiring";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data: Record<string, unknown>;
  read: boolean;
  createdAt: string;
  readAt: string | null;
}

// ── In-Memory Notification Store ─────────────────────────────────────

const notificationStore: Map<string, Notification> = new Map();

function generateNotificationId(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 8);
  return `ntf-${ts}-${rand}`;
}

// ── Send Notification ────────────────────────────────────────────────

export async function sendNotification(
  userId: string,
  type: NotificationType,
  title: string,
  message: string,
  data: Record<string, unknown> = {}
): Promise<Notification> {
  const notification: Notification = {
    id: generateNotificationId(),
    userId,
    type,
    title,
    message,
    data,
    read: false,
    createdAt: new Date().toISOString(),
    readAt: null,
  };

  notificationStore.set(notification.id, notification);

  console.log(
    `[Notification] Sent to ${userId}: [${type}] ${title}`
  );

  return notification;
}

// ── Get Notifications ────────────────────────────────────────────────

export interface GetNotificationsOptions {
  unreadOnly?: boolean;
  type?: NotificationType;
  limit?: number;
  offset?: number;
}

export async function getNotifications(
  userId: string,
  options: GetNotificationsOptions = {}
): Promise<{ notifications: Notification[]; total: number; unreadCount: number }> {
  const { unreadOnly = false, type, limit = 20, offset = 0 } = options;

  let userNotifications = Array.from(notificationStore.values())
    .filter((n) => n.userId === userId);

  if (unreadOnly) {
    userNotifications = userNotifications.filter((n) => !n.read);
  }

  if (type) {
    userNotifications = userNotifications.filter((n) => n.type === type);
  }

  // Sort by newest first
  userNotifications.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const total = userNotifications.length;
  const unreadCount = userNotifications.filter((n) => !n.read).length;
  const paginated = userNotifications.slice(offset, offset + limit);

  return { notifications: paginated, total, unreadCount };
}

// ── Mark As Read ─────────────────────────────────────────────────────

export async function markAsRead(
  notificationId: string
): Promise<Notification | null> {
  const notification = notificationStore.get(notificationId);

  if (!notification) {
    return null;
  }

  notification.read = true;
  notification.readAt = new Date().toISOString();
  notificationStore.set(notificationId, notification);

  return notification;
}

// ── Mark All As Read ─────────────────────────────────────────────────

export async function markAllAsRead(userId: string): Promise<number> {
  let count = 0;

  notificationStore.forEach((notification) => {
    if (notification.userId === userId && !notification.read) {
      notification.read = true;
      notification.readAt = new Date().toISOString();
      count++;
    }
  });

  return count;
}

// ── Delete Notification ──────────────────────────────────────────────

export async function deleteNotification(
  notificationId: string
): Promise<boolean> {
  return notificationStore.delete(notificationId);
}

// ── Batch Notification Helpers ───────────────────────────────────────

export async function notifyEscrowPayment(
  userId: string,
  projectTitle: string,
  amountKobo: number,
  milestoneTitle: string
): Promise<Notification> {
  const amountNaira = (amountKobo / 100).toLocaleString("en-NG");
  return sendNotification(
    userId,
    "escrow_payment",
    "Escrow Payment Received",
    `Payment of \u20A6${amountNaira} received for "${projectTitle}" - milestone: ${milestoneTitle}.`,
    { projectTitle, amountKobo, milestoneTitle }
  );
}

export async function notifyMaterialAlert(
  userId: string,
  materialName: string,
  changePercent: number,
  city: string
): Promise<Notification> {
  const direction = changePercent > 0 ? "increased" : "decreased";
  return sendNotification(
    userId,
    "material_alert",
    "Material Price Alert",
    `${materialName} price ${direction} by ${Math.abs(changePercent).toFixed(1)}% in ${city}. Review your procurement plan.`,
    { materialName, changePercent, city }
  );
}

export async function notifyInspectionScheduled(
  userId: string,
  projectTitle: string,
  inspectionDate: string,
  inspectorName: string
): Promise<Notification> {
  return sendNotification(
    userId,
    "inspection_scheduled",
    "Inspection Scheduled",
    `Inspection for "${projectTitle}" scheduled on ${inspectionDate} with ${inspectorName}.`,
    { projectTitle, inspectionDate, inspectorName }
  );
}

export async function notifyPermitUpdate(
  userId: string,
  permitType: string,
  status: string,
  applicationId: string
): Promise<Notification> {
  return sendNotification(
    userId,
    "permit_update",
    "Permit Application Update",
    `Your ${permitType} permit application status has changed to: ${status}.`,
    { permitType, status, applicationId }
  );
}

export async function notifyDefectReported(
  userId: string,
  projectTitle: string,
  defectTitle: string,
  severity: string
): Promise<Notification> {
  return sendNotification(
    userId,
    "defect_reported",
    `${severity} Defect Reported`,
    `A ${severity.toLowerCase()} defect "${defectTitle}" has been reported on "${projectTitle}".`,
    { projectTitle, defectTitle, severity }
  );
}

export async function notifyArtisanMatched(
  userId: string,
  projectTitle: string,
  skill: string,
  matchScore: number
): Promise<Notification> {
  return sendNotification(
    userId,
    "artisan_matched",
    "New Project Match",
    `You've been matched to "${projectTitle}" for ${skill} work (${matchScore}% match). Review and respond within 48 hours.`,
    { projectTitle, skill, matchScore }
  );
}

export async function notifyWarrantyExpiring(
  userId: string,
  projectTitle: string,
  daysUntilExpiry: number,
  warrantyType: string
): Promise<Notification> {
  return sendNotification(
    userId,
    "warranty_expiring",
    "Warranty Expiring Soon",
    `${warrantyType} warranty for "${projectTitle}" expires in ${daysUntilExpiry} days. Report any defects before expiry.`,
    { projectTitle, daysUntilExpiry, warrantyType }
  );
}

// ── Seed Notifications (for development) ─────────────────────────────

export async function seedNotifications(userId: string): Promise<void> {
  await notifyEscrowPayment(userId, "Lekki Duplex Phase 1", 1500000000, "Foundation Complete");
  await notifyMaterialAlert(userId, "Portland Cement (Dangote)", 8.5, "Lagos");
  await notifyInspectionScheduled(userId, "Ikoyi Terrace Houses", "2026-04-15", "Engr. Adebayo Ogundimu");
  await notifyPermitUpdate(userId, "Building Plan Approval", "APPROVED", "prm-a1b2-c3d4");
  await notifyDefectReported(userId, "Victoria Island Office Complex", "Roof membrane separation", "HIGH");
  await notifyArtisanMatched(userId, "Abuja Smart Estate Phase 2", "Tiling", 92);
  await notifyWarrantyExpiring(userId, "Surulere Apartments Block C", 30, "Structural");
}
