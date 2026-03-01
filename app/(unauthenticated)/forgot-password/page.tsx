import { AuthCard } from '@/components/auth/auth-card';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Access | SUST EEE',
  description: 'Recover access to your academic portal account via your SUST email.',
  openGraph: {
    title: 'Reset Access | SUST EEE',
    description: 'Recover access to your academic portal account.',
  }
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset Access"
      subtitle="Check your SUST email for instructions."
      showBack={true}
      backHref="/login"
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
