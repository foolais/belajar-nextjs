import Menu from "../menu";
import { withAuth } from "../with-auth";

function Header() {
  return <Menu />;
}

export default withAuth(Header);
