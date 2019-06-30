import React, { useState, Fragment } from "react";
import Modal from "./Components/Modal/Modal";
import NavBar from "./Components/NavBar/NavBar";
import "./App.css";
import Home from "./Components/Home/Home";

const data = [
  {
    overline: "Flash",
    title: "Force",
    description:
      "The sacral chakra is all about our connection and ability to accept others and new experiences.",
    image: "https://images.unsplash.com/photo-1516526995003-435ccce2be97?w=800"
  },
  {
    overline: "Flash",
    title: "Peur",
    description:
      "The sacral chakra is all about our connection and ability to accept others and new experiences.",
    image: "https://images.unsplash.com/photo-1504021624863-054aa77f753f?w=800"
  },

  {
    overline: "Temporelles",
    title: "Terrestre",
    description:
      "The sacral chakra is all about our connection and ability to accept others and new experiences.",
    image:
      "https://images.unsplash.com/photo-1539131729610-2b4d9cf62e2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2125&q=80"
  }
];

const questions = [
  {
    number: 1,
    image:
      "https://images.unsplash.com/photo-1453738773917-9c3eff1db985?w=1000",
    text: "Is your voice loud and clear?"
  },
  {
    number: 2,
    image:
      "https://images.unsplash.com/photo-1525120334885-38cc03a6ec77?w=1000",
    text: "Are you withdrawn or lonely, or do you keep people at a distance?"
  },
  {
    number: 3,
    image:
      "https://images.unsplash.com/photo-1516544820488-4a99efa70a58?w=1000",
    text: "Do you regularly avoid particular situations?"
  },
  {
    number: 4,
    image:
      "https://images.unsplash.com/photo-1536602012356-86c345795580?w=1000",
    text: "Do you have visions or premonitions?"
  },
  {
    number: 5,
    image:
      "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=1000",
    text: "Are you good at thinking in words, symbols and concepts?"
  }
];

function App() {
  const [isVisible, setVisibility] = useState(false);
  const runQuiz = () => {
    setVisibility(true);
  };

  const quitQuiz = () => {
    console.log("quit");
    setVisibility(false);
  };

  return (
    <Fragment>
      <NavBar title="Forces" />
      <Home cards={data} runQuiz={runQuiz} />
      <div className={isVisible ? "" : "d-none"}>
        <Modal questions={questions} quitQuiz={quitQuiz} />
      </div>
    </Fragment>
  );
}

export default App;
