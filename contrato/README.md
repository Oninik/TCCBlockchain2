 TCCBlockchain
 ========
 #Explicação das Funções

Código de um Smart Contract para realizar votações online utilizando blockchain.
Atualmente com as seguintes funções:

createVotacao(nomeDaVotacao, opcoesDeVoto, participantesDaVotacao, DataDeInicio, DataDoFim)

    - Cria uma votação, definindo o nome dela, quais são as opções para voto, o cpf das pessoas que podem votar, e as datas de começo e fim da votação. Sendo que não é possivel criar a votação se ela tiver menos de 2 opções de voto (não teria para que votar), se tiver menos de 2 pessoas que podem votar(não teria para que votar), e se a data de fim da votação fosse antes da data de inicio.
    
readVotacao(nomeDaVotacao)

    - Retorna os dados de uma votação a partir de seu nome.
    
votacaoExists(nome da votacao)

    - Checa se a votação com o nome inserido existe, retorna true ou false.
    
updateVotacao(nomeDaVotação, novaOpcaoDeVoto, novoParticipante, novaDataDeInicio, novaDataDeFim)

    - Função para atualizar dados da votação, a partir do nome da votação inserido, modifica ela. No caso, podendo adicionar uma nova opção de voto, um novo participante, uma nova data de inicio da votação e uma nova data de fim dela. Esses campos podem ser atualizados em uma chamada da votação ou em vários.
    
UpDeleteVotacao(nomeDaVotacao, opcaoDeletada, participanteDeletado)

    - Função para retirar uma opção de voto ou um participante da votação, os dois campos podem ser modificados, mas apenas um por vez de cada campo pode ser removido.
    
deleteVotacao(nomeDaVotacao)

    - Função para deletar completamente a votação com o nome inserido.
    
Votar(nomeDaVotacao, cpf da pessoa votando, voto da pessoa)

    - Função para o votante realizar seu voto, pega o nome da votacao que a pessoa quer votar, checa se ela tem permissao para votar, e checa se o voto da pessoa é valido(a opção existe). Cada cpf inserido na votação durante sua criação só pode votar uma vez.
