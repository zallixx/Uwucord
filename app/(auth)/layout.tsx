import React from 'react';

function AuthLayout({
    children,
}: {
    readonly children: Readonly<React.ReactNode>;
}) {
    return (
        <div className="h-full flex items-center justify-center">
            {children}
        </div>
    );
}

export default AuthLayout;
