import { AuthCard } from '@/components/auth/auth-card';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { authService } from '@/services';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finalize Reset | SUST EEE',
  description: 'Set a new secure password for your account.',
  openGraph: {
    title: 'Finalize Reset | SUST EEE',
    description: 'Secure your account with a new master password.',
  }
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ResetPasswordPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const token = params.token as string | undefined;

    let verificationData = null;
    let isTokenInvalid = false;

  if (token) {
    try {
        verificationData = await authService.verifyResetToken(token);
    } catch {
        isTokenInvalid = true;
    }
  }

  return (
    <AuthCard
      title="Finalize Reset"
      subtitle="Secure your account with a new master password."
    >
      <ResetPasswordForm 
        token={token}
        verificationData={verificationData}
        isTokenInvalid={isTokenInvalid}
      />
    </AuthCard>
  );
}
