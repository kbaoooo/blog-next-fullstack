export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4">
        {children}
      </div>
  );
}