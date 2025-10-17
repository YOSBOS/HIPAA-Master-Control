/**
 * Authentication Type Definitions
 * User authentication and authorization type definitions
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tenantId: string;
  permissions: string[];
  profile?: UserProfile;
  preferences: UserPreferences;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  status: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
}

export interface UserProfile {
  avatar?: string;
  phone?: string;
  department?: string;
  title?: string;
  bio?: string;
  timezone: string;
  language: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
    push: boolean;
  };
  dashboard: {
    layout: string;
    widgets: string[];
  };
  privacy: {
    showOnlineStatus: boolean;
    allowDirectMessages: boolean;
  };
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  tenantId: string;
  isSystemRole: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

export interface AuthSession {
  id: string;
  userId: string;
  tenantId: string;
  token: string;
  refreshToken: string;
  expiresAt: Date;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  lastActivityAt: Date;
  isActive: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
  tenantId?: string;
  rememberMe?: boolean;
  twoFactorCode?: string;
}

export interface LoginResponse {
  user: User;
  session: AuthSession;
  permissions: string[];
  tenant: {
    id: string;
    name: string;
    domain: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  tenantId?: string;
  invitationToken?: string;
}

export interface PasswordResetRequest {
  email: string;
  tenantId?: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface TwoFactorVerify {
  code: string;
  backupCode?: string;
}

export interface UserInvitation {
  id: string;
  email: string;
  role: string;
  tenantId: string;
  invitedBy: string;
  invitedAt: Date;
  expiresAt: Date;
  status: 'Pending' | 'Accepted' | 'Expired' | 'Cancelled';
  token: string;
}

export interface AuthEvent {
  id: string;
  userId: string;
  tenantId: string;
  type: 'Login' | 'Logout' | 'PasswordChange' | 'TwoFactorEnabled' | 'TwoFactorDisabled' | 'AccountLocked' | 'AccountUnlocked';
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

export interface SecurityPolicy {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  rules: SecurityRule[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SecurityRule {
  id: string;
  type: 'Password' | 'Session' | 'IP' | 'RateLimit' | 'TwoFactor';
  conditions: Record<string, any>;
  actions: string[];
  priority: number;
}

export interface FailedLoginAttempt {
  id: string;
  email: string;
  tenantId?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  reason: 'InvalidPassword' | 'AccountLocked' | 'AccountSuspended' | 'TwoFactorFailed';
}

export interface AccountLockout {
  id: string;
  userId: string;
  tenantId: string;
  reason: 'FailedLogins' | 'SuspiciousActivity' | 'AdminAction';
  lockedAt: Date;
  lockedUntil?: Date;
  lockedBy?: string;
  unlockToken?: string;
}

export interface SSOProvider {
  id: string;
  tenantId: string;
  name: string;
  type: 'SAML' | 'OAuth' | 'OpenID Connect';
  configuration: Record<string, any>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SSOConfiguration {
  id: string;
  tenantId: string;
  providerId: string;
  settings: {
    autoProvision: boolean;
    defaultRole: string;
    attributeMapping: Record<string, string>;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  secret: string;
  userId: string;
  tenantId: string;
  permissions: string[];
  lastUsed?: Date;
  expiresAt?: Date;
  createdAt: Date;
  isActive: boolean;
}

export interface AuthContext {
  user: User | null;
  session: AuthSession | null;
  tenant: {
    id: string;
    name: string;
    domain: string;
  } | null;
  permissions: string[];
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthProvider {
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  register: (data: RegisterRequest) => Promise<User>;
  resetPassword: (data: PasswordResetRequest) => Promise<void>;
  confirmPasswordReset: (data: PasswordResetConfirm) => Promise<void>;
  changePassword: (data: ChangePasswordRequest) => Promise<void>;
  setupTwoFactor: () => Promise<TwoFactorSetup>;
  verifyTwoFactor: (data: TwoFactorVerify) => Promise<void>;
  disableTwoFactor: (data: TwoFactorVerify) => Promise<void>;
  refreshSession: () => Promise<AuthSession>;
  getCurrentUser: () => Promise<User>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}
