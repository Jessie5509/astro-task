import Itinerary from "./components/Itinerary";

const App = () => {
  return (
    <main>
      <section className="flex flex-row justify-center">
        <section>
          <Itinerary />
        </section>
      </section>
      <div>
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
    </main>
  );
};

export default App;
