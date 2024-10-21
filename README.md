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


### Questão aberta
###### Transações simultâneas: dado que o mesmo cartão de crédito pode ser utilizado em diferentes serviços online, existe uma pequena mas existente probabilidade de ocorrerem duas transações ao mesmo tempo. O que você faria para garantir que apenas uma transação por conta fosse processada em um determinado momento? Esteja ciente do fato de que todas as solicitações de transação são síncronas e devem ser processadas rapidamente (menos de 100 ms), ou a transação atingirá o timeout.
   Para lidar com transações simultâneas de forma eficaz, garantindo que apenas uma transação por conta seja processada a qualquer momento, alguns cenários podem ser considerados: 
- Bloqueio em Memória (Mutex). 
- Uso de uma Fila de Mensagens
- Controle de Concorrência em Banco de Dados
- Solução Híbrida: uma abordagem híbrida pode ser implementada, combinando mutex em memória para transações rápidas e um sistema de fila para balancear cargas em situações de alta concorrência.
