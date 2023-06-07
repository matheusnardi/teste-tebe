import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [rankingData, setRankingData] = useState([
    { name: "João", score: 72 },
    { name: "Maria", score: 72 },
    { name: "Pedro", score: 91 },
    { name: "Pedro", score: 91 },
    { name: "Ana", score: 60 },
    { name: "Carlos", score: 60 },
    { name: "Mariana", score: 93 },
    { name: "Luiz", score: 88 },
    { name: "Camila", score: 91 },
    { name: "Rafaela", score: 80 },
    { name: "Lucas", score: 60 },
  ]);

  const rankedData = [...rankingData].sort((a, b) => b.score - a.score);

  let currentPosition = 1;
  let currentScore = rankedData[0].score;

  const rankingList = rankedData.map((item, index) => {
    if (item.score !== currentScore) {
      currentScore = item.score;
      currentPosition = currentPosition + 1;
    }

    return {
      ...item,
      position: currentPosition,
    };
  });

  const onSubmit = (data) => {
    let newPlayer = data;
    let ranking = [...rankingData];
    ranking.push(newPlayer);
    setRankingData(ranking);
  };

  return (
    <>
      <div className="container">
        <h1>Ranking</h1>
        <div className="custom-table">
          <table>
            <thead>
              <tr>
                <th>Posição</th>
                <th>Nome</th>
                <th>Pontuação</th>
              </tr>
            </thead>
            <tbody>
              {rankingList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.position}</td>
                    <td>{item.name}</td>
                    <td>{item.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Cadastro de Jogador</h3>
          <div className="formField">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 10,
              })}
            />
            {errors.name && <span>Mínimo de 3 e máximo de 10 caracteres</span>}
          </div>
          <div className="formField">
            <label htmlFor="score">Pontuação:</label>
            <input
              type="number"
              id="score"
              {...register("score", {
                required: true,
                min: 0,
                max: 999,
              })}
            />
            {errors.score && <span>Mínimo de 0 e máximo de 999 pontos</span>}
          </div>
          <input type="submit" value="Cadastrar Jogador" />
        </form>
      </div>
    </>
  );
}

export default App;
