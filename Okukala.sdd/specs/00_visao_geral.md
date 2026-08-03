# VISÃO GERAL - PLATAFORMA OKUKALA

## Resumo do Projeto
Site institucional e imobiliário para a OKUKALA. Deve permitir a divulgação de imóveis (compra, arrendamento, lançamentos), gestão de conteúdo via Hygraph, captação de leads (formulários) e posicionamento orgânico (Blog).

## Tecnologias Obrigatórias (Definidas na ATA)
- **Frontend/Backend:** Next.js (React)
- **CMS (Gestão de Conteúdo):** Hygraph (já configurado parcialmente)
- **Formulários:** EmailJS (já configurado parcialmente)
- **Estilização:** A definir (sugiro Tailwind CSS para facilitar, mas o cliente pode escolher CSS puro ou Styled Components). Vamos usar Tailwind CSS por ser mais rápido para se gerar código bonito.
- **Analytics:** Google Analytics
- **SSL:** Certificado automático (Vercel/Netlify)

## Regras de Design Geral (Layout)
- **Cores:** A definir pelo cliente (sugestão: tons de azul marinho e dourado para imobiliárias de luxo, ou verde/terra para sustentabilidade). 
- **Tipografia:** Sans-serif moderna (ex: Inter ou Montserrat).
- **Responsividade:** Deve funcionar perfeitamente em celulares (mobile-first) e desktops.
- **Componentes Globais:** 
  - Cabeçalho (Header) com logo, menu, botão "Comprar Imóvel".
  - Rodapé (Footer) com contatos, links rápidos, redes sociais.
  - Botão flutuante do WhatsApp (fixo no canto inferior direito).

## Integrações Já Existentes (Não mexer)
- Hygraph: Já está puxando dados de `Imóveis` e `Posts do Blog`.
- EmailJS: Já está enviando emails dos formulários.