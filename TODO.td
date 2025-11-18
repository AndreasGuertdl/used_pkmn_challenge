//Not Done
popup para confirmar para o usuario se o pokemon foi adicionado ou nao
    -tratar os erros também
ao clicar em um Pokemon ja registrado, aparecer detalhes guardados em Db (impedindo de adicionar o msm pokemon n vezes)
consertar o algoritmo de puxar os dados da PokeApi para que ele puxe de 25 em 25 ao inves de esperar todos os 150 na promessa
adicionar funcionalidade de adicionar times inteiros para a mesma run
    - tela que deixa voce inputar nomes/id, ele acha no array o pokemon
    - 1 só campo de jogo
    - 1 só campo de numero da run
    - 1 só campo de data para a run

//Done
implementar mudanca visual no card se o pkmn ja esta na tabela
fazer com que a mudanca ocorra na hora, ao inves de ter que recarregar a pagina
criar o popup com mais informações do Pokemon
criar a tabela (não está funcionando)
conseguir fazer com que o programa ache a tabela (não está funcionando)
adicionar paginas para pokemons da 1 até 3 geração

entender porque ao iniciar o servidor ele crasha(SQLITE_CONSTRAINT: UNIQUE constraint failed: Used_Pokemon.id)
entender porque ao tentar adicionar outro pokemon ele crasha (mesmo erro acima)
    -Quando voce mesmo esta gerando o proprio ID, nao é recomendado definir o ID como chave unica primaria
    -Entretanto, o problema é que ele adiciona novamente os pokemons que voce já adicionou naquela sessao toda vez que voce vai adicionar um pokemon novo,
    por isso estava crashando
    -Foi so consertar o Event Handler do sendButton para que ele delete o evento anterior

//Couldn't Implement
criar outra tabela para jogos
fazer com que o input para adicionar o jogo puxe os dados da tabela
    - versao free da extensao mysql nao deixa criar mais de 1 tabela por conexao (max 3 conexoes)

//Future Ideas:
Make this my "pokemon corner", which entails having a bunch of functionalities like:
team building: you can put pokemon in slots (6 total) and your teams type coverage will be shown to you (atk. and def. wise)
ev counter
challenge list (mono type, nuzlocke, etc.)