import React, {useState, useEffect, useContext, useRef} from 'react';
import {DataContext} from '../config/DataContext';
import { useTreeContext } from '../utils/TreeProvider';
import {API_ENDPOINT, API_BASE_URL} from '../config/config';
import { useFilters } from '../context/filters';
import { toast } from 'react-toastify';


function CaracteristicasEspecificas() {
  const [selectedFilters, setSelectedFilters] = useState({
    dap: '',
    idade: '',
    altura: '',
  });

  const data = useContext(DataContext);
 
  const {trees, setVisibleExtent, setVisibleTrees, visibleTrees, setTrees, treesCached} = useTreeContext();
  

  const [uniqueDap, setUniqueDap] = useState([]);
  const [uniqueIdade, setUniqueIdade] = useState([]);
  const [uniqueAltura, setUniqueAltura] = useState([]);
  const [uniqueLocalizacao, setUniqueLocalizacao] = useState([]);


  const [filteredData, setFilteredData] = useState([]);

  const initialTreeDataRef = useRef([]);

  // const fetchTreeData = async () => {
  //   try {
  //     const response = await fetch(API_ENDPOINT);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch tree data');
  //     }
  //     const data = await response.json();
  //     const treesWithFullImageURLs = data.trees.map((tree) => ({
  //       ...tree,
  //       Fotos: tree.Fotos.map((photo) => `${API_BASE_URL}/${photo}`),
  //     }));
  //     setVisibleTrees(treesWithFullImageURLs);
  //     initialTreeDataRef.current = treesWithFullImageURLs;
  //   } catch (error) {
  //     console.error('Error fetching tree data:', error);
  //   }
  // };

  

  // Function to fetch data and set initial state
  useEffect(() => {
    if (treesCached) {
      const dapValues = [
        ...new Set(treesCached.map((item) => item.DAP_v2)),
      ].sort((a, b) => a - b);
      const idadeValues = [
        ...new Set(treesCached.map((item) => item.idade_apro_v2)),
      ].sort();
      const alturaValues = [
        ...new Set(treesCached.map((item) => item.Altura_v2)),
      ].sort((a, b) => a - b);

      setUniqueDap(dapValues);
      setUniqueIdade(idadeValues);
      setUniqueAltura(alturaValues);
    } 
    // else {
    //   fetch(API_ENDPOINT)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       const dapValues = [
    //         ...new Set(data.trees.map((item) => item.DAP_v2)),
    //       ].sort((a, b) => a - b);
    //       const idadeValues = [
    //         ...new Set(data.trees.map((item) => item.idade_apro_v2)),
    //       ].sort();
    //       const alturaValues = [
    //         ...new Set(data.trees.map((item) => item.Altura_v2)),
    //       ].sort((a, b) => a - b);

    //       setUniqueDap(dapValues);
    //       setUniqueIdade(idadeValues);
    //       setUniqueAltura(alturaValues);
    //     })
    //     .catch((error) => {
    //       console.error('Error fetching tree data:', error);
    //     });
    // }
    // fetchTreeData()
  }, []); // Ensure useEffect runs when 'data' changes

  const handleFilterChange = (filterType, value) => {
    // console.log('Selected filter', selectedFilters)
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleApplyFilters = () => {
    const filtered = treesCached.filter((tree) => {
      return (
        (selectedFilters.dap === '' || tree.DAP_v2 === Number(selectedFilters.dap)) &&
        (selectedFilters.idade === '' || tree.idade_apro_v2 === selectedFilters.idade) &&
        (selectedFilters.altura === '' || tree.Altura_v2 === Number(selectedFilters.altura)) 
      );
    });
    
    // console.log('Filtered', filtered)
    // console.log('selectedFilters dap', selectedFilters.dap)
    // console.log('TREES', trees)
    if(filtered.length === 0){
      toast.error('Essa pesquisa não existe. Por favor, clique em Reset')
    }
    setTrees(filtered);
    setVisibleTrees(filtered)
  }

  const handleResetFilters = () => {
    setSelectedFilters({
      dap: '',
      idade: '',
      altura: '',
    });

    setFilteredData(initialTreeDataRef.current);
    setVisibleTrees(initialTreeDataRef.current);
    setTrees(initialTreeDataRef.current);
    // console.log('Initial', initialTreeDataRef)
    // console.log('Trees', trees)


  }

  function generateOptions(values) {
    return values.map((value, index) => (
      <option key={index} value={value}>
        {value}
      </option>
    ));
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">
        Selecione o Filtro Pretendido
      </h2>

      <div className="mb-0">
        <h3 className="text-lg font-semibold">DAP (cm):</h3>
        <select
          value={selectedFilters.dap}
          onChange={(e) => handleFilterChange('dap', e.target.value)}
          className="mb-2 w-full"
        >
          <option value="">- Tudo -</option>
          {generateOptions(uniqueDap)}
        </select>
      </div>

      <div className="mb-0">
        <h3 className="text-lg font-semibold">Idade:</h3>
        <select
          value={selectedFilters.idade}
          onChange={(e) => handleFilterChange('idade', e.target.value)}
          className="mb-2 w-full"
        >
          <option value="">- Tudo -</option>
          {generateOptions(uniqueIdade)}
        </select>
      </div>

      <div className="mb-0">
        <h3 className="text-lg font-semibold">Altura:</h3>
        <select
          value={selectedFilters.altura}
          onChange={(e) => handleFilterChange('altura', e.target.value)}
          className="mb-2 w-full"
        >
          <option value="">- Tudo -</option>
          {generateOptions(uniqueAltura)}
        </select>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={() =>  handleApplyFilters()}
          className="border bg-blue-500 text-white px-4 py-2 mr-2 rounded-lg hover:brightness-50 font-semibold"
        >
          Aplicar
        </button>
        <button
          onClick={() => handleResetFilters()}
          className="border bg-white px-4 py-2 rounded-lg hover:brightness-50 font-semibold"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default CaracteristicasEspecificas;
