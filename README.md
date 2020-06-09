# iSujou

Aplicativo web e mobile com intuito de realizar a ligação entre empregados domésticos e proprietários de imóveis, facilitando a comunicação e fechamento de contratos para limpeza.

## Tecnologias
- .NET Core 3.1
- React (v16.13 ou superior)
- SQL Server Express (v14.0 ou superior)

## Getting Started
Antes de tudo, é necessário ter [Node](https://nodejs.org/en/download/) instalado (versão 12.13 ou superior) e o [npm](https://www.npmjs.com/get-npm) (versão 6.14 ou superior), para poder executar os comandos a seguir. Ao instalar o .NET Core, o .NET Core CLI deve vir instalado junto, caso não venha, é possível obtê-lo na página oficial da [Microsoft](https://dotnet.microsoft.com/download/dotnet-core) (seguir a versão sugerida nas tecnologias).

É possível verificar as versões com as seguintes linhas de comando:
```
dotnet --version
node -v
npm -v
```

### Compilando o projeto (Backend)
Abra a pasta `./CODIGO-FONTE/backend/iSujou.Api` no Powershell ou Promp de comando. Depois, execute o comando `dotnet build` para compilar os fontes, caso não tenha nenhum problema, execute `dotnet run`. Desta forma, o backend da aplicação já estará rodando. Neste ponto, a base de dados (vazia) com as tabelas do projeto também terá sido criada. A aplicação também pode ser compilada e executada pelo Visual Studio (verificar versões compatíveis com .NET Core 3.1), onde uma janela do navegador padrão irá abrir com uma página do Swagger.

### Iniciando o projeto (frontend)
Abra a pasta `./CODIGO-FONTE/frontend/app` no Powershell ou Promp de comando. Execute o comando `npm install` para instalar os pacotes da aplicação, na primeira vez que este comando é executado, ele pode demorar. Após a instalação, o comando `npm start` deve ser executado, pois ele é responsável por fazer a aplicação rodar.

#### Possíveis problemas
Por padrão, o backend rodará na url `http://localhost:8080/` e o frontend `http://localhost:3000/`, problemas podem acontecer caso estas portas já estejam ocupadas por outro serviço.


## Informações
### Alunos
- Alan Felipe Jantz 
- Matheus Mahnke

### Matéria
Projeto de Software II, 2020/01.

### Instituição
Fundação Universidade Regional de Blumenau ([FURB](http://www.furb.br/))

## License
[MIT](https://choosealicense.com/licenses/mit/)
