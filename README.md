# Otimização de Performance - Diário de Bordo PWA

Este repositório documenta a aplicação de técnicas de otimização de performance e Web Vitals em um projeto de Progressive Web App (PWA).

## 📊 1. Análise Inicial
No primeiro relatório gerado pelo Lighthouse, a aplicação obteve os seguintes resultados:
- **Performance:** 100
- **Acessibilidade:** 89
- **Melhores Práticas:** 100
- **SEO:** 90

**Gargalos encontrados:**
- Os arquivos HTML, CSS e JS não estavam minificados, gerando tempo de download desnecessário.
- Ausência de formatos de imagem modernos.

## 🛠️ 2. Otimizações Aplicadas
As seguintes melhorias foram implementadas no código:

1. **Otimização de Imagens:** - A imagem de logotipo foi convertida do formato `.png` para o formato de próxima geração **`.webp`**.
   - O atributo `loading="lazy"` foi adicionado à tag `<img>` no HTML, garantindo que a renderização da página não seja bloqueada pelo carregamento da imagem.
2. **Minificação de Código:**
   - O arquivo `index.html` teve quebras de linha e espaços removidos.
   - O arquivo `style.css` foi completamente minificado.
   - O `script.js` sofreu minificação, tendo variáveis encurtadas e espaços de compilação reduzidos.
3. **Limpeza de Código:** Remoção de comentários desnecessários no ambiente de produção.

4. **Melhorias de Acessibilidade (A11y):**
   - Inclusão de atributos `aria-label` em todos os campos de formulário e botões, garantindo suporte completo a leitores de tela.
   - Adição do atributo `aria-live="polite"` na lista de registros para anunciar adições dinâmicas de conteúdo.
   - Ajuste na paleta de cores (botões e bordas) para garantir uma taxa de contraste superior a 4.5:1, conforme as diretrizes WCAG AA.
   - Adição da tag `<meta name="description">` para melhor indexação e contexto.
   
## 🚀 3. Reanálise e Resultados (Pós-Otimização)
Após a aplicação das técnicas acima, um novo relatório do Lighthouse foi gerado:
- **Performance:** 100
- **Acessibilidade:** 100
- **Melhores Práticas:** 100
- **SEO:** 100

**Conclusão:**
A técnica de minificação trouxe o maior impacto na fluidez do Parse do documento, enquanto o uso do formato `.webp` com `lazy loading` garantiu que a métrica de "Largest Contentful Paint (LCP)" atingisse a excelência. O projeto agora carrega instantaneamente e consome uma fração da banda original.

*(Os prints de Antes e Depois foram enviados nos anexos da atividade, estando também disponíveis na pasta "screenshots").*