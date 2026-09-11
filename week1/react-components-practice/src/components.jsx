import { useState } from "react";


export function Header() {
  return (
    <header className="header">
      <h1>React Components Practice</h1>

      <nav>
        <a href="#home">Home</a>
        <a href="#cards">Cards</a>
        <a href="#form">Form</a>
      </nav>
    </header>
  );
}


export function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 React Components Practice</p>
    </footer>
  );
}

export function Button({ text, onClick }) {
  return (
    <button className="custom-button" onClick={onClick}>
      {text}
    </button>
  );
}


export function Card({ title, description, category }) {
  return (
    <div className="card">
      <span className="category">{category}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}


export function Form() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (name.trim() === "") {
      setMessage("Please enter your name.");
      return;
    }

    setMessage(`Hello, ${name}! Your form was submitted.`);
  }

  return (
    <section className="form-section" id="form">
      <h2>Simple Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <Button text="Submit" onClick={() => {}} />
      </form>

      {message && <p className="message">{message}</p>}
    </section>
  );
}
