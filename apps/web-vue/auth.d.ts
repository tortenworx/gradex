declare module '#auth-utils' {
    interface User {
        id_number: string;
        first_name: string;
        middle_name: string;
        last_name: string;
        mobile_number: number;
        educational_email_address: string;
        personal_email_address: string;
        gender: string;
        role: string;
    }
    interface UserSession {
        user: User | UserType,
        secure: SecureSessionData,
        loggedInAt: Date
    }
    interface SecureSessionData {
        apiKey: string;
    }
}