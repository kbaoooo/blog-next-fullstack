# 🍪 Cookie Authentication Flow Explanation

## **1. Tại sao không cần gửi cookies manually?**

```typescript
// ❌ KHÔNG cần làm thế này:
fetch("/api/auth/me", {
  headers: {
    Cookie: "session=abc123", // Browser tự động làm
  },
});

// ✅ Browser tự động gửi cookies:
fetch("/api/auth/me"); // Cookie header tự động được thêm
```

## **2. Cơ chế hoạt động:**

### **Login Flow:**

```
1. User login → Server validates
2. Server: Set-Cookie: session=abc123; HttpOnly; Secure
3. Browser automatically stores cookie
4. All subsequent requests include: Cookie: session=abc123
```

### **Server-side cookies() function:**

```typescript
// Server side - Next.js cookies() function
const cookieStore = cookies(); // Gets from request headers
const sessionCookie = cookieStore.get("session");
// Returns { name: "session", value: "abc123" }
```

## **3. HTTP Headers in Action:**

### **Request từ Browser:**

```http
GET /api/auth/me HTTP/1.1
Host: localhost:3000
Cookie: session=abc123; theme=dark; lang=vi
User-Agent: Mozilla/5.0...
```

### **Response từ Server:**

```http
HTTP/1.1 200 OK
Set-Cookie: session=new-session-id; HttpOnly; Secure; SameSite=Lax
Content-Type: application/json

{"user": {"id": "...", "email": "..."}}
```

## **4. Axios Configuration:**

```typescript
const apiClient = axios.create({
  withCredentials: true, // ✅ Critical: Include cookies in requests
  baseURL: "http://localhost:3000",
});

// Now axios automatically:
// 1. Sends cookies with every request
// 2. Stores new cookies from Set-Cookie headers
// 3. Handles cookie domain/path restrictions
```

## **5. Session Service Flow:**

```typescript
// When SessionService.getCurrentSession() is called:
export class SessionService {
  static async getCurrentSession() {
    // 1. Get cookies from incoming request
    const cookieStore = cookies(); // Next.js server function
    const sessionCookie = cookieStore.get("session");

    // 2. sessionCookie = { name: "session", value: "abc123" }

    // 3. Query database
    const session = await prisma.session.findUnique({
      where: { sessionId: sessionCookie.value }, // "abc123"
    });

    return session;
  }
}
```

## **6. Complete Flow Diagram:**

```
┌─────────────────┐                    ┌─────────────────┐
│     Browser     │                    │     Server      │
│                 │                    │                 │
│  Login Form     │ ──── POST ────────► │  Server Action  │
│                 │                    │  validates      │
│                 │ ◄─── Response ───── │  credentials    │
│  Cookie stored  │   Set-Cookie:       │                 │
│  automatically  │   session=abc123    │                 │
│                 │                     │                 │
│  Later request  │ ──── GET ─────────► │  cookies()      │
│  Cookie: abc123 │                    │  gets "abc123"  │
│                 │ ◄─── User data ──── │  from header    │
└─────────────────┘                    └─────────────────┘
```

## **7. Trong AuthProvider:**

```typescript
// Browser context
const refreshUser = async () => {
  // This request automatically includes cookies
  const user = await AuthApiService.getCurrentUser();

  // axios sends: Cookie: session=abc123
  // server gets: cookies().get("session") = "abc123"
  // server validates session in database
  // server returns user data
};
```

## **🔒 Security Benefits:**

1. **HttpOnly** - JavaScript không thể access cookie
2. **Secure** - Chỉ gửi qua HTTPS trong production
3. **SameSite** - Bảo vệ khỏi CSRF attacks
4. **Automatic** - Browser handle tất cả cookie logic

Cookies được browser quản lý hoàn toàn tự động - không cần manual handling!
