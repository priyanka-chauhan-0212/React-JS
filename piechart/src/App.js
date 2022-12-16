// import logo from './logo.svg';
import './App.css';
// import Piechart from './Piechart';
import Linechart from './Linechart';
import Barchart from './Barchart'

function App() {
  return (
    <div className="App">
      <Barchart />
      <Linechart />
      {/* <Piechart /> */}
    </div>
  );
}

export default App;
