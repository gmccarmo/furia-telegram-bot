# 🤖 Telegram Bot FURIoso

Bot para Telegram feito em **Node.js** que fornece informações atualizadas sobre o time **FURIA** no cenário competitivo de **Counter-Strike 2** (CS2), usando dados do [HLTV](https://www.hltv.org).

---

## 📦 Tecnologias utilizadas

- Node.js
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
- [hltv](https://www.npmjs.com/package/hltv)
- [moment](https://momentjs.com/) (para manipulação de datas)

---

## 📁 Estrutura de pastas

```
projeto-furioso/
│
├── bot/
│   ├── index.js                    # Arquivo principal do bot
│   └── node_modules/                # Pasta gerada automaticamente contendo as dependências do projeto
│
├── services/
│   └── furiaService.js              # Arquivo de serviços que realiza as consultas sobre o time FURIA
│
├── package.json                     # Arquivo de configuração de dependências do projeto
└── package-lock.json                # Arquivo gerado automaticamente que garante a consistência das versões das dependências

```

---

## ⚙️ Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/projeto-furioso.git
   cd projeto-furioso
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Insira seu token de bot do Telegram no `index.js`:
   ```js
   const token = 'SEU_TOKEN_AQUI';
   ```

4. Inicie o bot:
   ```bash
   node bot/index.js
   ```

---

## 💬 Funcionalidades

O bot oferece um menu interativo com botões inline para consultar:

- 📊 **Posição da FURIA no ranking mundial**
- 👥 **Lineup atual** (jogadores e técnico)
- 📉 **Últimas partidas disputadas**
- 🗞️ **Próximos campeonatos confirmados**
- 😶‍🌫️ **Encerrar a conversa**

---

## 🧠 Lógica do Bot

- O bot pergunta o nome do usuário para personalização.
- Após isso, apresenta opções com **botões inline**.
- Todas as informações são obtidas por meio do pacote `hltv`.

---

## 📤 Exemplo de saída

```text
🗞️ Próximos campeonatos da FURIA:

🏆 IEM Dallas 2025 
📅 19/05/2025 - 25/05/2025 
🚩 Dallas, TX, US 
💵 $1,000,000

🏆 BLAST.tv Austin Major 
📅 07/06/2025 - 10/06/2025 
🚩 Austin, TX, US 
💵 Não informado
```

---

## 🔐 Segurança

> **Atenção:** o token do bot está em texto no código para fins de teste. Para uso em produção, utilize variáveis de ambiente.

---

## 📄 Licença

Este projeto é livre para uso educacional e pessoal. Distribuições públicas devem referenciar o projeto original.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Basta abrir uma issue ou um pull request com sugestões e melhorias.
