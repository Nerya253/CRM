import { Obj } from "../data/MyObj";
import "../components/ViewModeChooser.css";
import Card from "../components/Card";

export function Table() {
  return (
    <div className="tableWrapper">
      <table className="table">
        <thead>
          <tr>
            {Object.keys(Obj[0]).map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Obj.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val, idx) => (
                <td key={idx}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Grid() {
  return (
    <div className="gridContainer">
      {Obj.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </div>
  );
}
