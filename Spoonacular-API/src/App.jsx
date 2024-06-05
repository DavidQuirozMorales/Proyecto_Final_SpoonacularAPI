import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar.jsx';
import CategoryButtons from './components/CategoryButtons.jsx';
import RecipeModal from './components/RecipeModal.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';

function App() {
  // Estado para almacenar las recetas
  const [recetas, setRecetas] = useState([]);
  // Estado para almacenar la categoría seleccionada
  const [categoria, setCategoria] = useState(null);
  // Estado para almacenar la receta seleccionada para mostrar en el modal
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  // Estado para controlar la apertura y cierre del modal
  const [modalOpen, setModalOpen] = useState(false);

  // Efecto que se ejecuta al cargar la página para obtener recetas aleatorias
  useEffect(() => {
    obtenerRecetasAleatorias();
  }, []);

  // Efecto que se ejecuta al cargar la página para cargar recetas guardadas en el localStorage
  useEffect(() => {
    const recetasGuardadas = localStorage.getItem('recetas');
    if (recetasGuardadas) {
      setRecetas(JSON.parse(recetasGuardadas));
    }
  }, []);

  // Efecto que se ejecuta cuando cambia el estado de las recetas para guardarlas en el localStorage
  useEffect(() => {
    localStorage.setItem('recetas', JSON.stringify(recetas));
  }, [recetas]);

  // Función para obtener recetas aleatorias
  const obtenerRecetasAleatorias = async () => {
    try {
      const respuesta = await axios.get('https://api.spoonacular.com/recipes/random', {
        params: {
          apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
          number: 30, // Obtener un máximo de 30 recetas aleatorias
        },
      });
      setRecetas(respuesta.data.recipes);
    } catch (error) {
      console.error('Error al obtener recetas aleatorias:', error);
      Swal.fire('Error', 'No se pudo obtener las recetas aleatorias', 'error');
    }
  };

  // Función para obtener recetas por palabra clave
  const obtenerRecetas = async (palabraClave) => {
    // Código para obtener recetas por palabra clave
  };

  // Función para obtener comidas típicas por país
  const obtenerComidasTipicas = async (pais) => {
    // Código para obtener comidas típicas por país
  };

  // Función para seleccionar una categoría de comidas típicas
  const seleccionarCategoria = (categoria) => {
    // Código para seleccionar una categoría de comidas típicas
  };

  // Función para limpiar la búsqueda y obtener recetas aleatorias
  const limpiarBusqueda = () => {
    obtenerRecetasAleatorias();
    setCategoria(null);
  };

  // Función para abrir el modal con los detalles de una receta
  const abrirModal = async (id) => {
    // Código para abrir el modal con los detalles de una receta
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container">
      {/* Encabezado */}
      <h1 className="my-4">Spoonaculicious</h1>
      {/* Barra de búsqueda */}
      <SearchBar onSearch={obtenerRecetas} onClear={limpiarBusqueda} />
      {/* Botones de categorías */}
      <CategoryButtons onCategorySelect={seleccionarCategoria} />
      {/* Lista de recetas */}
      <div className="row">
        {recetas.map((receta) => (
          <div className="col-md-4" key={receta.id}>
            <div className="card mb-4">
              <img src={receta.image} className="card-img-top" alt={receta.title} />
              <div className="card-body">
                <h5 className="card-title">{receta.title}</h5>
                <button onClick={() => abrirModal(receta.id)} className="btn btn-primary">Ver receta</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal para mostrar los detalles de una receta */}
      <RecipeModal isOpen={modalOpen} closeModal={cerrarModal} recipe={selectedRecipe} />
    </div>
  );
}

export default App;
