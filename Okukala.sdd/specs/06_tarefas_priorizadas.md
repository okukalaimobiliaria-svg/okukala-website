# LISTA DE TAREFAS - OKUKALA (Ordem de Execução)

## ✅ TAREFA 0 (JÁ FEITA - Não refazer)
- Configurar variáveis de ambiente para Hygraph e EmailJS.
- Criar a conexão básica com Hygraph.

## 🚀 TAREFA 1: Estrutura Base e Layout Global
- [ ] Criar o arquivo `layout.js` (Next.js App Router) com o HTML base.
- [ ] Criar o **Header** (logo, menu com links: Início, Sobre, Imóveis, Blog, Contacto) e o botão "Comprar Imóvel".
- [ ] Criar o **Footer** (com dados institucionais, redes sociais e contato).
- [ ] Instalar e configurar o **Tailwind CSS** para facilitar a estilização.
- [ ] Criar o **Botão Flutuante do WhatsApp** (fixo na tela).

## 🚀 TAREFA 2: Página Home (Início)
- [ ] Implementar a Seção Hero (com imagem e botão).
- [ ] Implementar a Barra de Pesquisa Rápida (apenas HTML/CSS, a lógica de redirecionamento virá depois).
- [ ] Implementar a Seção "Imóveis em Destaque" (puxar dados do Hygraph).
- [ ] Implementar a Seção "Serviços".
- [ ] Implementar a Seção "Oportunidades de Investimento".
- [ ] Implementar a Seção "Últimos Artigos do Blog".

## 🚀 TAREFA 3: Página de Listagem de Imóveis
- [ ] Criar a página `/imoveis`.
- [ ] Implementar os Filtros (Localização, Preço, Tipologia, Quartos).
- [ ] Implementar a listagem em Grid (12 imóveis por página, com paginação ou scroll infinito).
- [ ] Separar por abas: "Compra", "Arrendamento", "Lançamentos".

## 🚀 TAREFA 4: Página Individual do Imóvel (Detalhe)
- [ ] Criar a rota `/imoveis/[slug]`.
- [ ] Implementar a Galeria de Imagens (carrossel ou thumbnail).
- [ ] Implementar a Descrição e Ficha Técnica.
- [ ] Implementar o Formulário de "Solicitar Informações" (integrar com EmailJS).
- [ ] Implementar o Formulário de "Agendar Visita" (integrar com EmailJS).
- [ ] Adicionar botão "Falar no WhatsApp" específico para o imóvel.

## 🚀 TAREFA 5: Página Sobre
- [ ] Criar a página `/sobre`.
- [ ] Implementar "Quem somos", "História", "Missão, Visão e Valores".
- [ ] Implementar a "Equipa" (fotos e nomes).
- [ ] Implementar o Organigrama e Parceiros.

## 🚀 TAREFA 6: Página do Blog (Listagem)
- [ ] Criar a página `/blog`.
- [ ] Listar todos os artigos com foto, título, resumo e data.
- [ ] Implementar categorias (Mercado, Dicas, Financiamento, Notícias).

## 🚀 TAREFA 7: Página Individual do Blog (Artigo)
- [ ] Criar a rota `/blog/[slug]`.
- [ ] Exibir o artigo completo (título, data, conteúdo HTML vindo do Hygraph).
- [ ] Exibir "Artigos Relacionados" ao final.

## 🚀 TAREFA 8: Página Contacto (com 3 Tabs)
- [ ] Criar a página `/contacto`.
- [ ] **Tab 1 (Fale Connosco):** Formulário de contacto geral (Nome, Email, Mensagem).
- [ ] **Tab 2 (Trabalhe Connosco):** Listar vagas do Hygraph. Ao clicar, abrir detalhes + formulário de candidatura.
- [ ] **Tab 3 (Portal do Investidor):** Conteúdo institucional + formulário específico para investidores.

## 🚀 TAREFA 9: Ajustes Finais e SEO
- [ ] Configurar meta tags (título, descrição) dinamicamente para cada página.
- [ ] Configurar Google Analytics (código de tracking).
- [ ] Testar responsividade em todos os tamanhos de tela.
- [ ] Otimizar performance (imagens com next/image, lazy loading).