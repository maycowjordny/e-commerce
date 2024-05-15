import { AuthLayout } from "@/layout/auth-layout";

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthLayout image='/assets/bg/signup-bg.jpg'>
            {children}
        </AuthLayout>
    );
}