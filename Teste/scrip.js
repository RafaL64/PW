function insertItem(item, index) { 
    let tr = document.createElement('tr') 
   
    tr.innerHTML = ` 
      <td>${item.nome}</td> 
      <td>${item.funcao}</td> 
      <td>R$ ${item.salario}</td> 
      <td class="acao"> 
        <button onclick="editItem(${index})"><i class='bx bx-edit' 
  ></i></button> 
      </td> 
      <td class="acao"> 
        <button onclick="deleteItem(${index})"><i class='bx bx
  trash'></i></button> 
      </td> 
    ` 
    tbody.appendChild(tr) 
  } 
   
  btnSalvar.onclick = async e => { 
     
    if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') { 
      return 
    } 
   
    e.preventDefault(); 
   
    try { 
      if (id !== undefined && itens[id]?.id) { 
        // UPDATE 
        await fetch(`${API_BASE}/${itens[id].id}`, { 
          method: 'PUT', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ 
            nome: sNome.value, 
            funcao: sFuncao.value, 
            salario: sSalario.value 
          }) 
        }); 
      } else { 
        // CREATE 
        await fetch(API_BASE, { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ 
            nome: sNome.value, 
            funcao: sFuncao.value, 
            salario: sSalario.value 
          })
        }); 
    } 
    modal.classList.remove('active'); 
    loadItens(); 
    id = undefined; 
  } catch (error) { 
    console.error('Erro ao salvar:', error); 
    alert('Erro ao salvar. Verifique se servidor está rodando.'); 
  } 
} 
 
async function loadItens() { 
  itens = await getItensBD(); 
  tbody.innerHTML = ''; 
  itens.forEach((item, index) => { 
    insertItem(item, index); 
  }); 
} 
 
// Carrega ao iniciar 
loadItens(); 
 
const API_BASE = 'http://localhost:3000/api/funcionarios'; 
 
const getItensBD = async () => { 
  try { 
    const response = await fetch(API_BASE); 
    if (!response.ok) throw new Error('Erro ao carregar'); 
    return await response.json(); 
  } catch (error) { 
    console.error('Erro API:', error); 
    return []; 
  } 
}; 
 
const setItensBD = () => {}; // Não mais necessário 
 
loadItens() 