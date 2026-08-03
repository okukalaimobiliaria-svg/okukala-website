# Hygraph: models para Trabalhe Conosco e Portal do Investidor

Estas são as estruturas recomendadas para o projeto. O frontend já está preparado para consumir dados destes models via a API interna.

## 1) Model: Vaga

### Nome no Hygraph
- Display name: Vaga
- API ID: vagas

### Campos
- title (Single line text)
  - Required: Yes
  - Example: Consultor Imobiliário
- location (Single line text)
  - Required: Yes
  - Example: Luanda
- description (Rich text)
  - Required: Yes
  - Example: Descrição da vaga e contexto da função
- requirements (Single line text)
  - Required: No
  - Use uma requirement por linha. Exemplo:
    - Experiência comercial
    - Boa comunicação
    - Carta de condução
- image (Asset)
  - Required: No
  - Tipo: Single asset image
- slug (Single line text)
  - Required: No
  - Útil para URLs mais limpas
- isPublished (Boolean)
  - Required: No
  - Default: true

### Variáveis de ambiente recomendadas
- HYGRAPH_JOBS_MODEL=vagas
- HYGRAPH_JOBS_TITLE_FIELD=title
- HYGRAPH_JOBS_LOCATION_FIELD=location
- HYGRAPH_JOBS_DESCRIPTION_FIELD=description
- HYGRAPH_JOBS_REQUIREMENTS_FIELD=requirements

---

## 2) Model: Oportunidade de Investimento

### Nome no Hygraph
- Display name: Oportunidade de Investimento
- API ID: oportunidadesDeInvestimento

### Campos
- title (Single line text)
  - Required: Yes
  - Example: Residential
- description (Rich text)
  - Required: Yes
  - Example: Descrição da oportunidade para investidores
- image (Asset)
  - Required: No
  - Tipo: Single asset image
- slug (Single line text)
  - Required: No
- isPublished (Boolean)
  - Required: No
  - Default: true

### Variáveis de ambiente recomendadas
- HYGRAPH_INVESTMENT_MODEL=oportunidadesDeInvestimento
- HYGRAPH_INVESTMENT_TITLE_FIELD=title
- HYGRAPH_INVESTMENT_DESCRIPTION_FIELD=description

---

## 3) Recomendação prática no Hygraph

1. Criar o model Vaga
2. Criar o model Oportunidade de Investimento
3. Adicionar alguns registos de teste
4. Confirmar que os campos aparecem com os nomes exatos acima
5. Definir as variáveis de ambiente no .env.local

---

## 4) Exemplo de dados para testar

### Vaga
- title: Consultor Imobiliário
- location: Luanda
- description: Atuar na intermediação de compra e venda de imóveis.
- requirements:
  - Experiência comercial
  - Boa comunicação
  - Carta de condução

### Oportunidade de Investimento
- title: Residential
- description: Investimentos em habitação residencial de alta qualidade.
