import { AuthLayout } from "@/layout/auth-layout";

export default function SigninLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthLayout image='/assets/bg/signup-bg.jpg'>
            {children}
        </AuthLayout>
    );
}