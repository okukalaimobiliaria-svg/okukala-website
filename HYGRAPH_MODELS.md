# Manual de Treinamento do Hygraph – Gestão de Conteúdo do Website

## Objetivo

Este manual foi criado para que a equipa cliente consiga gerir de forma autónoma o conteúdo do website no Hygraph, sem depender do desenvolvimento para publicar:

- Blog
- Imóveis
- Vagas de Trabalho
- Oportunidades de Investimento

O objetivo é tornar o processo simples, rápido e seguro, com instruções baseadas no schema real usado no projeto.

---

## 1. Como entrar no Hygraph

1. Aceda ao Hygraph com a conta correta.
2. No menu lateral esquerdo, clique em Content.
3. Vai ver a lista de modelos de conteúdo do projeto.
4. Cada modelo representa um tipo de conteúdo que aparece no website.
5. Para gerir entradas, clique no modelo correspondente.

Os modelos relevantes para este website são:

- Blog
- Imoveis
- VagasTrabalhos
- PortalInvestimentos

> Importante: no código do projeto, os nomes podem aparecer com estas convenções exatas. Se os modelos estiverem com nomes diferentes no painel do cliente, o frontend vai precisar de ajustar as variáveis de ambiente ou o nome do model.

---

## 2. Regra principal: o website lê campos específicos

O frontend não lê qualquer campo ao acaso. Ele consulta campos com nomes exatos no Hygraph.

Se o nome de um campo estiver diferente do esperado, o conteúdo pode não aparecer no site.

### Exemplo real do projeto

#### Blog
O frontend procura este modelo e estes campos:

- model: blogs
- campos:
  - titulo
  - slug
  - resumo
  - dataDePublicacao
  - conteudo
  - imagemDeCapa
  - categoria
  - destacarNaPaginaInicial

#### Imóveis
O frontend procura este modelo e estes campos:

- model: imoveiss
- campos:
  - nomeDoImovel
  - slug
  - descricao
  - preco
  - tipoDeOferta
  - cidade
  - bairro
  - quantidadeDeQuartos
  - vagasNaGaragem
  - area
  - imagemDeDestaque
  - imagens
  - estadoDoImovel
  - caracteristicasPrincipais
  - oQueHaProximo
  - linkDoMapa
  - destacarNaPaginaInicial

#### Vagas
O frontend procura este modelo e estes campos:

- model: vagasTrabalhos
- campos:
  - nomeDaVaga
  - localizacao
  - descricao
  - requisitos
  - imagem
  - slug
  - exibir

#### Oportunidades de investimento
O frontend procura este modelo e estes campos:

- model: portalInvestimentos
- campos:
  - titulo
  - descricao
  - imagem
  - slug
  - exibir

---

## 3. Como criar um novo conteúdo

O processo é igual para todos os modelos:

1. Entrar no modelo correto.
2. Clicar em Create Entry ou Novo Registo.
3. Preencher os campos obrigatórios.
4. Guardar como rascunho se ainda não estiver pronto.
5. Publicar quando tudo estiver correto.

### Boas práticas

- Use títulos claros e profissionais.
- Sempre que possível, preencha o slug manualmente ou deixe ser gerado corretamente.
- Verifique se a imagem foi carregada e está visível.
- Antes de publicar, confirme se o conteúdo aparece no site corretamente.
- Não publique texto incompleto, sem imagem ou sem resumo.

---

## 4. Gestão do Blog

### 4.1 Modelo de conteúdo

O modelo do blog no projeto é `blogs`.

### 4.2 Campos que devem preencher

- titulo
  - Exemplo: "Como investir em imóveis em Angola"
  - Deve ser claro e profissional.

- slug
  - Exemplo: "como-investir-em-imoveis-em-angola"
  - Este campo define o URL do artigo.
  - Deve ser simples, em minúsculas e sem espaços.

- resumo
  - Resumo curto da publicação.
  - Pode ser usado na listagem do blog e na pré-visualização.
  - Exemplo: "Descubra os principais fatores a considerar antes de investir em imóveis em Luanda."

- dataDePublicacao
  - Data em que a publicação deve aparecer como recente.
  - Normalmente usa a data do artigo.

- conteudo
  - Este é o corpo principal do blog.
  - Deve ser preenchido em rich text, com texto organizado, títulos, listas e imagens.
  - O site lê o conteúdo em HTML/Markdown/texto.

- imagemDeCapa
  - Imagem principal do artigo.
  - Deve ser visualmente forte e com boa qualidade.

- categoria
  - Categoria do artigo, por exemplo: "Investimento", "Mercado", "Guia", "Notícias".

- destacarNaPaginaInicial
  - Opcional.
  - Se for verdadeiro, o artigo pode aparecer em destaques na home.

### 4.3 Exemplo real de entrada de Blog

- titulo: "Tudo o que precisa saber antes de comprar um imóvel em Luanda"
- slug: "tudo-o-que-precisa-saber-antes-de-comprar-um-imovel-em-luanda"
- resumo: "Guia prático para quem está a considerar comprar um imóvel em Angola."
- dataDePublicacao: 14/08/2026
- categoria: "Guia"
- imagemDeCapa: imagem do imóvel ou da propriedade
- conteudo: texto estruturado com paragrafos, listas e subtítulos
- destacarNaPaginaInicial: false

### 4.4 Como publicar um artigo do blog

1. Criar o artigo no modelo blogs.
2. Preencher titulo, slug, resumo e imagem.
3. Escrever o conteúdo no rich text.
4. Definir a categoria e a data.
5. Guardar.
6. Publicar.
7. Confirmar se a página do artigo abre com a URL correta.

---

## 5. Gestão de Imóveis

### 5.1 Modelo de conteúdo

O modelo principal usado no site é `imoveiss`.

### 5.2 Campos que devem preencher

- nomeDoImovel
  - Exemplo: "Apartamento em Luanda Centro"

- slug
  - Exemplo: "apartamento-em-luanda-centro"
  - Crítico para a página do imóvel.

- descricao
  - Descrição detalhada do imóvel em rich text.
  - Deve incluir características, localização, acabamento e contexto comercial.

- preco
  - Valor do imóvel.
  - O website usa este campo para mostrar o preço final.

- tipoDeOferta
  - Opções esperadas: "venda" ou "aluguel"
  - Este campo define se o imóvel aparece como venda ou arrendamento.

- cidade
  - Exemplo: "Luanda"

- bairro
  - Exemplo: "Talatona"

- quantidadeDeQuartos
  - Número de quartos.

- vagasNaGaragem
  - Número de vagas de garagem.

- area
  - Área útil do imóvel.

- imagemDeDestaque
  - Imagem principal da propriedade.

- imagens
  - Galeria de imagens do imóvel.

- estadoDoImovel
  - Pode ser: "novo", "usado", "emObras", "bomEstado"

- caracteristicasPrincipais
  - Lista das principais características do imóvel.
  - Pode ser texto livre ou lista de itens.

- oQueHaProximo
  - Descreve o que existe perto do imóvel.

- linkDoMapa
  - Link do Google Maps ou embed de localização.

- destacarNaPaginaInicial
  - Se estiver ativo, o imóvel pode aparecer em destaques da home.

### 5.3 Exemplo real de imóvel

- nomeDoImovel: "Casa T3 em Talatona"
- slug: "casa-t3-em-talatona"
- tipoDeOferta: "venda"
- preco: 85000000
- cidade: "Luanda"
- bairro: "Talatona"
- quantidadeDeQuartos: 3
- vagasNaGaragem: 2
- area: 180
- estadoDoImovel: "novo"
- destacarNaPaginaInicial: true
- descricao: descrição detalhada com acabamento, localização, áreas e atrativos
- imagemDeDestaque: imagem principal
- imagens: galeria com várias fotos
- caracteristicasPrincipais: "Piscina, Jardim, Segurança 24h, Ar Condicionado"
- oQueHaProximo: "Próximo a escolas, supermercados e zonas de lazer"
- linkDoMapa: "https://maps.google.com/..."

### 5.4 Como publicar um imóvel

1. Criar uma entrada no modelo imoveiss.
2. Preencher nome, slug, cidade, bairro e tipo de oferta.
3. Inserir preço, quartos, garagem, área e estado.
4. Carregar a imagem de destaque e a galeria.
5. Escrever a descrição completa.
6. Adicionar características e proximidades.
7. Guardar e publicar.
8. Verificar se a página do imóvel abre corretamente.

### 5.5 Dicas importantes

- O slug deve ser único.
- Se não existir `imagemDeDestaque`, o imóvel pode aparecer sem imagem ou mal apresentado.
- O campo `descricao` deve ser claro e comercial.
- Use nomes coerentes e profissionais.

---

## 6. Gestão de Vagas de Trabalho

### 6.1 Modelo de conteúdo

No projeto, o modelo usado pelo frontend é `vagasTrabalhos`.

### 6.2 Campos esperados

- nomeDaVaga
  - Exemplo: "Consultor Imobiliário"

- localizacao
  - Exemplo: "Luanda"

- descricao
  - Descrição da função e contexto da vaga.

- requisitos
  - Texto ou lista com requisitos.
  - O frontend faz split por linha ou ponto e vírgula.

- imagem
  - Imagem opcional da vaga ou do departamento.

- slug
  - Opcional, usado para URL ou referências internas.

- exibir
  - Boolean.
  - Se estiver ativo, aparece na página de Trabalhe Conosco.

### 6.3 Exemplo real de vaga

- nomeDaVaga: "Consultor Imobiliário"
- localizacao: "Luanda"
- descricao: "Atuar na prospecção e acompanhamento de clientes na compra e venda de imóveis."
- requisitos: "Experiência comercial; Boa comunicação; Carta de condução; Conhecimentos em imobiliário"
- imagem: imagem da área comercial
- slug: "consultor-imobiliario"
- exibir: true

### 6.4 Como publicar uma vaga

1. Criar entrada no modelo vagasTrabalhos.
2. Preencher nome da vaga e localização.
3. Escrever a descrição da função.
4. Inserir os requisitos em linhas ou separando por ponto e vírgula.
5. Carregar imagem se existir.
6. Confirmar que `exibir` está activo.
7. Publicar.

### 6.5 Observações

- O campo `requisitos` é muito importante para a apresentação na página.
- Se ficar vazio, a vaga pode aparecer mais pobre visualmente.
- O frontend usa a propriedade `exibir` para controlar se a vaga deve aparecer.

---

## 7. Gestão de Oportunidades de Investimento

### 7.1 Modelo de conteúdo

No projeto, o modelo usado é `portalInvestimentos`.

### 7.2 Campos esperados

- titulo
  - Nome da oportunidade.

- descricao
  - Descrição detalhada do investimento.

- imagem
  - Imagem de capa ou visual da oportunidade.

- slug
  - URL da oportunidade.

- exibir
  - Boolean.
  - Se estiver activo, a oportunidade aparece na página do investidor.

### 7.3 Exemplo real

- titulo: "Investimento em Residencial Premium"
- descricao: "Oportunidade para investidores em desenvolvimento residencial premium em Luanda."
- imagem: imagem da proposta
- slug: "investimento-em-residencial-premium"
- exibir: true

### 7.4 Como publicar uma oportunidade

1. Criar uma entrada no modelo portalInvestimentos.
2. Definir o título e o slug.
3. Escrever a descrição do projeto.
4. Carregar a imagem de destaque.
5. Activar o `exibir`.
6. Publicar.

---

## 8. Mapa de campos do projeto: o que a app espera

Abaixo está o alinhamento entre o campo visual do Hygraph e o nome esperada no código.

### Blog
- Model: blogs
- Campos usados no frontend:
  - titulo
  - slug
  - resumo
  - dataDePublicacao
  - conteudo
  - imagemDeCapa
  - categoria

### Imóveis
- Model: imoveiss
- Campos usados no frontend:
  - nomeDoImovel
  - slug
  - descricao
  - preco
  - tipoDeOferta
  - cidade
  - bairro
  - quantidadeDeQuartos
  - vagasNaGaragem
  - area
  - imagemDeDestaque
  - imagens
  - estadoDoImovel
  - caracteristicasPrincipais
  - oQueHaProximo
  - linkDoMapa
  - destacarNaPaginaInicial

### Vagas
- Model: vagasTrabalhos
- Campos usados no frontend:
  - nomeDaVaga
  - localizacao
  - descricao
  - requisitos
  - imagem
  - slug
  - exibir

### Investimentos
- Model: portalInvestimentos
- Campos usados no frontend:
  - titulo
  - descricao
  - imagem
  - slug
  - exibir

---

## 9. Checklist antes de publicar

Antes de clicar em Publicar, confirme:

- O model está correto.
- O slug está preenchido e é único.
- O título está profissional.
- A imagem foi carregada.
- A descrição está completa.
- O conteúdo aparece bem formatado.
- O campo de visibilidade está activo quando necessário.
- A página do site foi verificada após publicação.

---

## 10. Erros comuns e como evitar

### O conteúdo não aparece no website

Possíveis causas:

- Nome do campo diferente do esperado.
- Modelo com nome diferente.
- O campo `exibir` está desativado.
- O slug está em falta ou duplicado.
- A entrada ainda está em rascunho.

### Página do blog/imóvel não abre

Possíveis causas:

- Slug duplicado.
- Slug com caracteres inválidos.
- Conteúdo não publicado.
- Link do site atualizado mas entrada ainda não publicada.

### Imagem não aparece

Possíveis causas:

- Arquivo não carregado.
- Campo de imagem não preenchido.
- Asset inválido ou em formato não suportado.

### Vaga não aparece na página de emprego

Possíveis causas:

- Campo `exibir` desligado.
- Nome de campo diferente do esperado (`nomeDaVaga` em vez de `title`, por exemplo).
- Modelo errado ou estrutura compatível não encontrada.

---

## 11. Regras práticas para a equipa

- Não altere nomes de campos sem validar o impacto no frontend.
- Mantenha consistência nos nomes dos modelos.
- Use slug uniforme e fácil de memorizar.
- Escreva sempre em português claro e profissional.
- Use imagens boas, sem cortes estranhos ou qualidade baixa.
- Faça publicação apenas quando o conteúdo estiver pronto.

---

## 12. Resumo executivo

Em poucas palavras, para gerir o website no Hygraph a equipa deve saber que:

- Blog = modelo `blogs`
- Imóveis = modelo `imoveiss`
- Vagas = modelo `vagasTrabalhos`
- Investimentos = modelo `portalInvestimentos`

Não basta criar o texto. É fundamental garantir que os nomes dos campos e os valores esperados coincidam com aquilo que o frontend procura.

Se o nome dos campos estiver correto e a entrada estiver publicada, o conteúdo aparece automaticamente no website.

---

## 13. Checklist de publicação por tipo de conteúdo

### Blog
- titulo
- slug
- resumo
- dataDePublicacao
- conteudo
- imagemDeCapa
- categoria
- publicar

### Imóvel
- nomeDoImovel
- slug
- tipoDeOferta
- preco
- cidade
- bairro
- quantidadeDeQuartos
- vagasNaGaragem
- area
- descricao
- imagens
- imagemDeDestaque
- estadoDoImovel
- publicar

### Vaga
- nomeDaVaga
- localizacao
- descricao
- requisitos
- exibir
- publicar

### Investimento
- titulo
- descricao
- imagem
- slug
- exibir
- publicar

---

## 14. Conclusão

Este manual foi desenhado para que a equipa cliente consiga gerir o conteúdo do website no Hygraph de forma autónoma, com instruções práticas, exatas e alinhadas ao código do projeto.

Se seguir este guia, a gestão de blog, imóveis, vagas e oportunidades de investimento será simples, rápida e segura.
