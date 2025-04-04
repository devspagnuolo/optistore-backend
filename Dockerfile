# Use uma imagem base que inclui o usuário 'node'
FROM node:18-bullseye

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências para o contêiner
COPY package.json package-lock.json ./

# Instale as dependências como o usuário 'node'
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Ajuste as permissões dos arquivos, se necessário
# RUN chmod -R 755 /app

# Compile o projeto
RUN npm run build

# Exponha a porta em que a aplicação será executada
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]