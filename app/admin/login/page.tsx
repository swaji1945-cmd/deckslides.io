import LoginForm from "./LoginForm";

type SearchParams = Promise<{ next?: string }>;

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const { next } = await searchParams;
  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <img src="/images/logo.svg" alt="pitchdeck" width={160} height={32} />
        </div>
        <h1 className="admin-login-title">Admin</h1>
        <p className="admin-login-sub">Enter the studio password to continue.</p>
        <LoginForm next={next || "/admin"} />
      </div>
    </div>
  );
}
