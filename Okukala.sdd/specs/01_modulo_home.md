# ESPECIFICAÇÃO - MÓDULO HOME (Início)

## 1. Seção Hero (Banner Principal)
- **O que tem:** Uma imagem de fundo de um imóvel luxuoso (vinda do Hygraph ou estática).
- **Texto:** "Encontre o imóvel dos seus sonhos" (H1) e um subtítulo menor.
- **Botão:** "Ver Imóveis" que redireciona para a página de listagem `/imoveis`.
- **Comportamento:** Ocupar 100% da altura da tela (full viewport height) ou 80%.

## 2. Barra de Pesquisa Rápida
- **Campos:** 
  - Tipo (Compra ou Arrendamento - dropdown).
  - Localização (texto).
  - Botão "Buscar".
- **Comportamento:** Ao clicar em "Buscar", redireciona para `/imoveis` com os filtros aplicados na URL.

## 3. Imóveis em Destaque
- **Título:** "Imóveis em Destaque".
- **Fonte dos dados:** Hygraph (campo `destaque = true`).
- **Layout:** Exibir 3 ou 4 cartões lado a lado (grid).
- **Cada cartão:** Foto, Preço, Endereço, Botão "Ver detalhes" (link para página individual).

## 4. Serviços da OKUKALA
- **Exemplo:** "Compra", "Venda", "Arrendamento", "Avaliação de Imóveis".
- **Layout:** 4 ícones ou cards em linha.

## 5. Oportunidades de Investimento
- **Título:** "Oportunidades de Investimento".
- **Layout:** Cards com descrição curta e botão "Saiba mais".

## 6. Últimos Artigos do Blog
- **Título:** "Dicas e Notícias".
- **Fonte dos dados:** Hygraph (últimos 3 posts).
- **Layout:** Lista vertical ou cards pequenos.

## 7. Botões de Contato Rápido (WhatsApp e Telefone)
- Ícones fixos no canto direito (WhatsApp) e no rodapé (Telefone).