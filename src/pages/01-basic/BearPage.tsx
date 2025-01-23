import { useShallow } from "zustand/shallow";
import { WhiteCard } from "../../components";
import { useBearStore } from "../../stores";

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBear />
        <PolarBear />
        <PandaBear />
        <BearsDisplay />
      </div>
    </>
  );
};

const BlackBear = () => {
  const blackBears = useBearStore((state) => state.blackBears);
  const increaseBlackBears = useBearStore((state) => state.increaseBlackBears);

  return (
    <WhiteCard centered>
      <h2 className="mb-2">Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button
          className="py-1 px-4 mx-2"
          onClick={() => increaseBlackBears(-1)}
        >
          -1
        </button>
        <span className="font-bold text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button
          className="py-1 px-4 mx-2"
          onClick={() => increaseBlackBears(1)}
        >
          {" "}
          +1
        </button>
      </div>
    </WhiteCard>
  );
};

const PolarBear = () => {
  const polarBears = useBearStore((state) => state.polarBears);
  const increasePolarBears = useBearStore((state) => state.increasePolarBears);

  return (
    <WhiteCard centered>
      <h2 className="mb-2">Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button
          className="py-1 px-4 mx-2"
          onClick={() => increasePolarBears(-1)}
        >
          -1
        </button>
        <span className="font-bold text-3xl mx-2 lg:mx-10"> {polarBears} </span>
        <button
          className="py-1 px-4 mx-2"
          onClick={() => increasePolarBears(1)}
        >
          {" "}
          +1
        </button>
      </div>
    </WhiteCard>
  );
};

const PandaBear = () => {
  const pandaBears = useBearStore((state) => state.pandaBears);
  const increasePandaBears = useBearStore((state) => state.increasePandaBears);

  // ! No es recomendado
  // const { pandaBears, increasePandaBears } = useBearStore((state) => state);

  return (
    <WhiteCard centered>
      <h2 className="mb-2">Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button
          className="py-1 px-4 mx-2"
          onClick={() => increasePandaBears(-1)}
        >
          -1
        </button>
        <span className="font-bold text-3xl mx-2 lg:mx-10"> {pandaBears} </span>
        <button
          className="py-1 px-4 mx-2"
          onClick={() => increasePandaBears(1)}
        >
          {" "}
          +1
        </button>
      </div>
    </WhiteCard>
  );
};

export const BearsDisplay = () => {
  // Esta función vuelve a esparcir el estado de los osos (state.bears)
  // técnicamente cambia el estado, sus valores siguen siendo los mismos
  const doNothing = useBearStore((state) => state.doNothing);

  // Al usar useShallow, se evita que se vuelva a renderizar el componente
  // si los valores de los osos no han cambiado
  const bears = useBearStore(useShallow((state) => state.bears));
  // const bears = useBearStore((state) => state.bears);

  const addBear = useBearStore((state) => state.addBear);
  const clearBears = useBearStore((state) => state.clearBears);

  return (
    <WhiteCard>
      <h2 className="mb-2">Osos</h2>
      <div className="flex gap-2">
        <button onClick={doNothing}>?</button>
        <button onClick={addBear}>+</button>
        <button onClick={clearBears}>[]</button>
      </div>
      <pre>{JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  );
};
