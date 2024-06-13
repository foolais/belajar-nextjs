export function withAuth(Component) {
  return function (props) {
    const isLogin = true;

    if (!isLogin) return <div>Anda Belum Login</div>;

    return <Component {...props} />;
  };
}
