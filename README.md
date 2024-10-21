# Caju Transactions
### Aplicação criada para a etapa do desafio técnico (Desenvolvedor Backend)
- Aplicação foi desenvolvida usando node, nestjs, typescript
- As features do desafio estão disponibilizadas nesse link - [Features](https://caju.notion.site/Desafio-T-cnico-para-fazer-em-casa-218d49808fe14a4189c3ca664857de72) 

#### Pontos a serem considerados em algumas regras de negócio
 - No body da requisição foi adicionado a propriedade *totalAmount* (obrigatória) tal qual a propriedade *amount*. Segue abaixo exemplo:
 > {
 >   "mcc": "5411",
 >   "amount": 30,
 >   "totalAmount": 50
 > }


### L4. Questão aberta
###### Transações simultâneas: dado que o mesmo cartão de crédito pode ser utilizado em diferentes serviços online, existe uma pequena mas existente probabilidade de ocorrerem duas transações ao mesmo tempo. O que você faria para garantir que apenas uma transação por conta fosse processada em um determinado momento? Esteja ciente do fato de que todas as solicitações de transação são síncronas e devem ser processadas rapidamente (menos de 100 ms), ou a transação atingirá o timeout.
   Para lidar com transações simultâneas de forma eficaz, garantindo que apenas uma transação por conta seja processada a qualquer momento, alguns cenários podem ser considerados: 
- Bloqueio em Memória (Mutex) : Usar um mutex (bloqueio) em memória para controlar o acesso às transações por conta. Quando uma transação é iniciada, bloqueamos o acesso para outras transações na mesma conta até que a transação em andamento seja concluída.
- Uso de uma Fila de Mensagens: Implementar uma fila de mensagens (como por exemplo, Kafka) onde cada transação é enfileirada. Um consumidor processa as transações na ordem em que foram recebidas, garantindo que apenas uma transação por conta seja processada de cada vez.
- Controle de Concorrência em Banco de Dados: Usar um banco de dados para gerenciar transações e aplicar um nível de isolamento que permita bloqueios de registros. Isso pode ser feito utilizando transações do banco de dados com um nível de isolamento que evite conflitos.
- Solução Híbrida: Uma abordagem híbrida pode ser implementada, combinando mutex em memória para transações rápidas e um sistema de fila para balancear cargas em situações de alta concorrência.
