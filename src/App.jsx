import React from "react";
import { nanoid } from "nanoid";

function App() {
  //estos son los states
  const [tarea, setTarea] = React.useState("");
  const [tareas, setTareas] = React.useState([]);
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [id, setId] = React.useState("");
  const [error, setError] = React.useState(null);

  const agregarTarea = (evento) => {
    evento.preventDefault();
    if (!tarea.trim()) {
      console.log("Elemento vacío");
      setError("Escribe algo por favor...");
      return;
    }
    console.log("tarea");

    setTareas([...tareas, { id: nanoid(), nombreTarea: tarea }]);

    setTarea("");
    setError(null);
  };

  const eliminarTarea = (id) => {
    //console.log(id);
    const arrayFiltrado = tareas.filter((item) => item.id !== id);
    setTareas(arrayFiltrado);
  };

  const editarTarea = (item) => {
    //console.log(item);
    setModoEdicion(true);
    setTarea(item.nombreTarea);
    setId(item.id);
  };
  // este editarTareas es para que una vez que pase lo que se editara al input, guarde la edicion en la lista de tareas
  const editarTareas = (evento) => {
    evento.preventDefault();
    if (!tarea.trim()) {
      console.log("Elemento vacío");
      setError("Escribe algo por favor...");
      return;
    }

    const arrayEditado = tareas.map((item) =>
      item.id === id ? { id: id, nombreTarea: tarea } : item
    );
    setTareas(arrayEditado);
    setModoEdicion(false);
    setTarea("");
    setId("");
    setError(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">No hay tareas</li>
            ) : (
              tareas.map((item) => (
                <li key="{item.id}" className="list-group-item">
                  <span className="lead">{item.nombreTarea}</span>
                  <button
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => eliminarTarea(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-right"
                    onClick={() => editarTarea(item)}
                  >
                    Editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {/* Este if ternario cambia formulario de agregar a editar */}
            {modoEdicion ? "Editar tarea" : "Agregar Tarea"}
          </h4>
          <form onSubmit={modoEdicion ? editarTareas : agregarTarea}>
            {error ? <span className="text-danger">{error}</span> : null}

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese tarea"
              onChange={(evento) => setTarea(evento.target.value)}
              value={tarea}
            />
            {/* if ternario con logica booleana en JS */}
            {modoEdicion ? (
              <button className="btn btn-warning btn-block" type="submit">
                Editar
              </button>
            ) : (
              <button className="btn btn-dark btn-block" type="submit">
                Agregar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
