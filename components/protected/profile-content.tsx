"use client";

import {
  changePasswordAction,
  updateProfileAction,
} from "@/app/actions/profile-actions";
import { ChangePasswordSchema, UpdateProfileSchema } from "@/schemas";
import { StudentProfile } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BadgeCheck,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Pencil,
  Phone,
  Shield,
  User,
  UserCircle,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const InfoField = ({
  label,
  value,
  isCode,
}: {
  label: string;
  value?: string | number;
  isCode?: boolean;
}) => (
  <div>
    <label className="block section-label mb-1 md:mb-1.5">{label}</label>
    <div
      className={`${isCode ? "font-mono text-[10px] md:text-xs bg-[rgb(var(--slate-50))] px-2.5 py-1.5 border border-[rgb(var(--slate-200))] rounded w-fit" : "text-sm md:text-base font-medium"} text-[rgb(var(--slate-800))]`}
    >
      {value || "-"}
    </div>
  </div>
);

// Personal Information Component
const PersonalInfo = ({
  student,
  onEditClick,
}: {
  student?: StudentProfile;
  onEditClick: () => void;
}) => (
  <div className="space-y-5 md:space-y-6 animate-in fade-in duration-200">
    {/* Section Label */}
    <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-[rgb(var(--slate-100))]">
      <div className="flex items-center gap-2">
        <span className="text-[10px] md:text-[11px] font-medium text-[rgb(var(--brand-primary))] uppercase tracking-wide">
          Academic Credentials
        </span>
        <span className="text-[rgb(var(--slate-300))]">|</span>
        <span className="text-[9px] md:text-[10px] text-[rgb(var(--slate-400))]">
          SUST EEE Verified
        </span>
      </div>
      <button
        onClick={onEditClick}
        className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-[rgb(var(--brand-primary))] hover:bg-[rgb(var(--brand-primary))]/10 rounded-lg transition-colors"
      >
        <Pencil size={12} />
        Edit
      </button>
    </div>

    {/* Info Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      <InfoField label="First Name" value={student?.first_name} />
      <InfoField label="Last Name" value={student?.last_name} />
      <InfoField
        label="Registration Number"
        value={student?.registration_number}
      />
      <InfoField label="Academic Session" value={student?.session} />
      <InfoField
        label="RFID Identifier"
        value={student?.rfid}
        isCode
      />
      <InfoField label="Institutional Email" value={student?.email} />
      <InfoField label="Contact Number" value={student?.phone_number} />
    </div>
  </div>
);

// Security Component with password visibility toggle and react-hook-form
const SecuritySection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ChangePasswordSchema>) => {
    setIsLoading(true);
    try {
      const result = await changePasswordAction({
        old_password: data.currentPassword,
        new_password: data.newPassword,
        confirm_password: data.confirmPassword,
      });

      if (result.success) {
        toast.success("Password Updated", {
          description: result.message,
        });
        form.reset();
      } else {
        toast.error("Update Failed", {
          description: result.message,
        });
      }
    } catch (err: any) {
      toast.error("Update Failed", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-5 animate-in fade-in duration-200">
      {/* Section Label */}
      <div className="flex items-center gap-2 pb-3 md:pb-4 border-b border-[rgb(var(--slate-100))]">
        <Lock size={12} className="text-[rgb(var(--slate-400))]" />
        <span className="text-[10px] md:text-[11px] font-medium text-[rgb(var(--slate-600))] uppercase tracking-wide">
          Change Password
        </span>
      </div>

      {/* Password Form */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 md:space-y-4"
      >
        <div className="relative">
          <label className="block section-label mb-1.5">Current Password</label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--slate-400))]"
            />
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter current password"
              {...form.register("currentPassword")}
              className="premium-input text-sm pr-12"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgb(var(--slate-400))] hover:text-[rgb(var(--slate-600))] transition-colors"
            >
              {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {form.formState.errors.currentPassword && (
            <p className="text-[10px] text-[rgb(var(--danger))] mt-1">
              {form.formState.errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label className="block section-label mb-1.5">New Password</label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--slate-400))]"
            />
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              {...form.register("newPassword")}
              className="premium-input text-sm pr-12"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgb(var(--slate-400))] hover:text-[rgb(var(--slate-600))] transition-colors"
            >
              {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {form.formState.errors.newPassword && (
            <p className="text-[10px] text-[rgb(var(--danger))] mt-1">
              {form.formState.errors.newPassword.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label className="block section-label mb-1.5">Confirm Password</label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--slate-400))]"
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              {...form.register("confirmPassword")}
              className="premium-input text-sm pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgb(var(--slate-400))] hover:text-[rgb(var(--slate-600))] transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {form.formState.errors.confirmPassword && (
            <p className="text-[10px] text-[rgb(var(--danger))] mt-1">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-2.5 md:py-3 text-[10px] md:text-xs disabled:opacity-50"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

// Edit Profile Modal
const EditProfileModal = ({
  isOpen,
  onClose,
  student,
}: {
  isOpen: boolean;
  onClose: () => void;
  student?: StudentProfile;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    },
  });

  // Reset form when student data changes or modal opens
  useEffect(() => {
    if (student && isOpen) {
      form.reset({
        first_name: student.first_name || "",
        last_name: student.last_name || "",
        email: student.email || "",
        phone_number: student.phone_number || "",
      });
    }
  }, [student, isOpen, form]);

  const onSubmit = async (data: z.infer<typeof UpdateProfileSchema>) => {
    setIsLoading(true);
    try {
      const result = await updateProfileAction(data);
      if (result.success) {
        toast.success("Profile Updated", {
          description: result.message,
        });
        onClose();
      } else {
        toast.error("Update Failed", {
          description: result.message,
        });
      }
    } catch (err: any) {
      toast.error("Update Failed", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgb(var(--slate-100))]">
          <div className="flex items-center gap-2">
            <User size={16} className="text-[rgb(var(--brand-primary))]" />
            <h2 className="text-sm font-semibold text-[rgb(var(--slate-800))]">
              Edit Profile
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[rgb(var(--slate-100))] transition-colors"
          >
            <X size={18} className="text-[rgb(var(--slate-500))]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block section-label mb-1.5">First Name</label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--slate-400))]"
                />
                <input
                  type="text"
                  placeholder="First name"
                  {...form.register("first_name")}
                  className="premium-input text-sm pl-10"
                />
              </div>
              {form.formState.errors.first_name && (
                <p className="text-[10px] text-[rgb(var(--danger))] mt-1">
                  {form.formState.errors.first_name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block section-label mb-1.5">Last Name</label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--slate-400))]"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  {...form.register("last_name")}
                  className="premium-input text-sm pl-10"
                />
              </div>
              {form.formState.errors.last_name && (
                <p className="text-[10px] text-[rgb(var(--danger))] mt-1">
                  {form.formState.errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block section-label mb-1.5">Email</label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--slate-400))]"
              />
              <input
                type="email"
                placeholder="Email address"
                {...form.register("email")}
                className="premium-input text-sm pl-10"
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-[10px] text-[rgb(var(--danger))] mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block section-label mb-1.5">Phone Number</label>
            <div className="relative">
              <Phone
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--slate-400))]"
              />
              <input
                type="text"
                placeholder="Phone number"
                {...form.register("phone_number")}
                className="premium-input text-sm pl-10"
              />
            </div>
            {form.formState.errors.phone_number && (
              <p className="text-[10px] text-[rgb(var(--danger))] mt-1">
                {form.formState.errors.phone_number.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-[10px] md:text-xs font-medium text-[rgb(var(--slate-600))] bg-[rgb(var(--slate-100))] hover:bg-[rgb(var(--slate-200))] rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 btn-primary py-2.5 text-[10px] md:text-xs disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ProfileContentProps {
  student: StudentProfile;
}

export function ProfileContent({ student }: ProfileContentProps) {
  const [activeTab, setActiveTab] = useState("info");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-300">
      {/* Page Header - Always visible */}
      <header className="pb-4 md:pb-5 border-b border-[rgb(var(--slate-200))]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <UserCircle
                size={18}
                className="text-[rgb(var(--slate-700))] md:w-5 md:h-5"
              />
              <span className="section-label">Account Settings</span>
            </div>
            <h1 className="page-title">Student Profile</h1>
          </div>
          <div className="flex items-center gap-1.5 text-[rgb(var(--success))]">
            <BadgeCheck size={14} />
            <span className="text-[10px] md:text-[11px] font-medium">
              Verified Account
            </span>
          </div>
        </div>
      </header>
    
      {/* Desktop: Two Column Layout */}
      <div className="hidden md:grid md:grid-cols-2 gap-5 lg:gap-6">
        {/* Personal Information Card */}
        <div className="card-interactive overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[rgb(var(--slate-100))] bg-[rgb(var(--slate-50))]/50">
            <User size={14} className="text-[rgb(var(--brand-primary))]" />
            <span className="text-xs font-semibold text-[rgb(var(--slate-700))]">
              Personal Information
            </span>
          </div>
          <div className="p-5">
            <PersonalInfo
              student={student}
              onEditClick={() => setIsEditModalOpen(true)}
            />
          </div>
        </div>

        {/* Security Card */}
        <div className="card-interactive overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[rgb(var(--slate-100))] bg-[rgb(var(--slate-50))]/50">
            <Shield size={14} className="text-[rgb(var(--brand-primary))]" />
            <span className="text-xs font-semibold text-[rgb(var(--slate-700))]">
              Security
            </span>
          </div>
          <div className="p-5">
            <SecuritySection />
          </div>
        </div>
      </div>

      {/* Mobile: Tab Layout */}
      <div className="md:hidden">
        <div className="card-interactive overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[rgb(var(--slate-100))] bg-[rgb(var(--slate-50))]/50">
            <button
              onClick={() => setActiveTab("info")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-[10px] font-semibold border-b-2 transition-all ${
                activeTab === "info"
                  ? "border-[rgb(var(--brand-primary))] text-[rgb(var(--brand-primary))] bg-white"
                  : "border-transparent text-[rgb(var(--slate-500))] hover:text-[rgb(var(--slate-700))]"
              }`}
            >
              <User size={14} />
              <span>Personal Info</span>
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-[10px] font-semibold border-b-2 transition-all ${
                activeTab === "security"
                  ? "border-[rgb(var(--brand-primary))] text-[rgb(var(--brand-primary))] bg-white"
                  : "border-transparent text-[rgb(var(--slate-500))] hover:text-[rgb(var(--slate-700))]"
              }`}
            >
              <Shield size={14} />
              <span>Security</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === "info" ? (
              <PersonalInfo
                student={student}
                onEditClick={() => setIsEditModalOpen(true)}
              />
            ) : (
              <SecuritySection />
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        student={student}
      />
    </div>
  );
}
