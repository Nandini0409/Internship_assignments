function BlogCard({ post }) {
  return (
    <article className="blog-card">
      <div className="blog-card-content">
        <span className="post-category">{post.category}</span>

        <h2>{post.title}</h2>

        <p className="post-description">{post.description}</p>

        <div className="post-meta">
          <span>{post.author}</span>
          <span>{post.date}</span>
        </div>

        <button className="read-button">Read More</button>
      </div>
    </article>
  );
}

export default BlogCard;