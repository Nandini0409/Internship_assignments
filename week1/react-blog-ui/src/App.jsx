import { useState } from "react";
import Header from "./components/Header";
import BlogCard from "./components/BlogCard";
import posts from "./data/posts";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(posts.map((post) => post.category)),
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <Header />

      <main className="main-container">
        <section className="hero-section">
          <p className="section-label">EXPLORE ARTICLES</p>
          <h2>Learn something new every day.</h2>
          <p>
            Browse articles about React, JavaScript, web development,
            backend technologies, and learning.
          </p>
        </section>

        <section className="controls-section">
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </section>

        <section className="posts-section">
          <div className="posts-heading">
            <h2>Latest Posts</h2>
            <span>{filteredPosts.length} posts found</span>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="posts-grid">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No posts found</h3>
              <p>Try searching with a different keyword or category.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 Ideas, Code & Learning</p>
      </footer>
    </div>
  );
}

export default App;