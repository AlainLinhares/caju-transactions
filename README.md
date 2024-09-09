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
   Para o cenário proposto acredito que duas soluções poderiam ser consideradas: 
- A primeira opção seria o uso do Redis (a partir de locks de memória) principalmente por ter uma baixa latência e uma capacidade de gerenciamento automático de expiração de chaves. O que influencia positivamente para o tempo de resposta requerido. 
- A segunda opção seria implementar um objeto typescript para gerenciar locks em memória como por exemplo, o uso da biblioteca mutex.
