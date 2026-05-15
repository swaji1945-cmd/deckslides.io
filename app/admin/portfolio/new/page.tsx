import AdminBar from "../../components/AdminBar";
import PortfolioEditor from "../Editor";

export default function NewPortfolioItem() {
  return (
    <>
      <AdminBar active="portfolio" />
      <div className="admin-main">
        <PortfolioEditor />
      </div>
    </>
  );
}
