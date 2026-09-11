import { useState } from "react";

import {Header, Footer, Card, Button, Form} from "./components";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const cards = [
    {
      id: 1,
      title: "Reusable Components",
      description: "Components help us divide a React application into smaller parts.",
      category: "React",
    },
    {
      id: 2,
      title: "Props",
      description: "Props allow data to be passed from a parent component to a child component.",
      category: "Concept",
    },
    {
      id: 3,
      title: "State",
      description: "State allows a component to manage changing information.",
      category: "React",
    },
  ];

  function handleButtonClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <Header />

      <main className="container" id="home">
        <section className="intro">
          <h2>Learning React Components</h2>
          <p>
            This project demonstrates reusable components, props, state,
            and dynamic rendering in React.
          </p>

          <Button
            text={`Clicked ${count} times`}
            onClick={handleButtonClick}
          />
        </section>

        <section className="cards-section" id="cards">
          <h2>Concept Cards</h2>

          <div className="cards-grid">
            {cards.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                description={card.description}
                category={card.category}
              />
            ))}
          </div>
        </section>

        <Form />
      </main>

      <Footer />
    </div>
  );
}

export default App;