# API-Gestão de Usuários
Esta API tem a função de cadastrar e administrar usuários, junto dela há um site simples que utiliza suas funcionalidades exceto recuperação de senha por conta da necessidade de envios de emails
## EndPoints
### GET/users
EndPoint responsável por mostrar todos os usuários
#### Parametros
Nenhum
#### Resultados
##### 200
A consulta foi realizada
##### 403
Houve um problema na autenticação de requisição: Token inválido

### GET/users/:id
EndPoint responsável por mostrar um usuário de acordo com seu ID
#### Parametros
id
####Resultados
##### 200
A consulta foi realizada
##### 406
Houve um problema na autenticação de requisição: ID Inválido

### POST/user
EndPoint responsável por realizar o cadastro do usuário
#### Parametros
name, email, Password
#### Resultados
##### 200
Usuário cadastrado
##### 406
Houve um problema na autenticação de requisição: Credenciais inválidas
##### 406
Houve um problema na autenticação de requisição: Credencial de email já usada

### POST/login
EndPoint responsável por realizar o login do usuário
#### Parametros
email, Password
#### Resultados
##### 200
Login realizado, token de autenticação gerado de acordo com o nível de usuário
##### 406
Houve um problema na autenticação de requisição: Credenciais inválidas

### DELETE/user/:id
Endpoint responsável por deletar um usuário baseado em um ID
#### Parametros
id
#### Resultados
##### 200
Usuário deletado
##### 406
Houve um problema na autenticação de requisição: Credencial inválida
##### 403
Houve um problema na autenticação de requisição: Token inválido 

### PUT/user/name/:id
Endpoint responsável por alterar o nome de um usuário existente
#### Parametros
id, name
#### Resultados
##### 200
Nome de usuário alterado
##### 406
Houve um problema na autenticação de requisição: Credencial inválida
##### 403
Houve um problema na autenticação de requisição: Token inválido 

### PUT/user/email/:id
Endpoint responsável por alterar o email de um usuário existente
#### Parametros
id, email
#### Resultados
##### 200
Email de usuário alterado
##### 406
Houve um problema na autenticação de requisição: Credencial inválida
##### 403
Houve um problema na autenticação de requisição: Email já existente
##### 403
Houve um problema na autenticação de requisição: Token inválido 

### PUT/user/role/:id
Endpoint responsável por alterar o cargo de um usuário existente
#### Parametros
id, role
#### Resultados
##### 200
Cargo de usuário alterado
##### 406
Houve um problema na autenticação de requisição: Credencial inválida
##### 403
Houve um problema na autenticação de requisição: Token inválido 

