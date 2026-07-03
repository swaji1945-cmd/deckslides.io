import AdminBar from "../../components/AdminBar";
import BlogEditor from "../Editor";

export default function NewBlogPost() {
  return (
    <>
      <AdminBar active="blog" />
      <div className="admin-main">
        <BlogEditor />
      </div>
    </>
  );
}
