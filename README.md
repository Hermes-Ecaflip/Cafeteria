<div align="center">

# ☕ EYZE Coffee

**Site institucional e catálogo de uma cafeteria artesanal — 100% estático, responsivo e funcional.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![No Build](https://img.shields.io/badge/build-nenhum-success)
![GitHub Pages Ready](https://img.shields.io/badge/GitHub%20Pages-ready-brightgreen)

</div>

---

## ✨ Sobre o projeto

Site multipágina de uma cafeteria fictícia (**EYZE Coffee**), construído apenas com
**HTML, CSS e JavaScript puro** — sem frameworks, sem etapa de build e sem dependências
de instalação. Basta abrir o `index.html` no navegador.

A versão anterior usava imagens SVG de **20–30 MB cada** (mais de 230 MB no total) e
funcionalidades quebradas. Esta versão foi reconstruída do zero: imagens otimizadas
(**~2 MB no total**), carrinho de compras funcional, formulário validado e layout
totalmente responsivo.

## 🚀 Funcionalidades

| Recurso | Descrição |
| --- | --- |
| 🎠 **Carrossel** | Banner principal com autoplay, navegação por setas e indicadores |
| 🛒 **Carrinho de compras** | Adicionar, remover, alterar quantidade e total automático |
| 💾 **Persistência** | O carrinho é salvo no `localStorage` e mantido entre as páginas |
| 🔎 **Filtro de catálogo** | Filtra produtos por categoria (Quentes, Gelados, Doces) |
| 📨 **Formulário de contato** | Validação de campos e feedback de envio |
| 📱 **Responsivo** | Layout adaptável com menu hambúrguer no mobile |
| ♿ **Acessibilidade** | `aria-labels`, navegação por teclado e `prefers-reduced-motion` |
| ✨ **Animações** | Revelação suave ao rolar a página (com fallback sem JS) |

## 📂 Estrutura

```
.
├── index.html          # Página inicial (hero, destaques, sobre, CTA)
├── catalogo.html       # Catálogo com filtros e carrinho
├── sobre.html          # História, números e galeria
├── parceiras.html      # Parcerias + formulário de contato
├── assets/
│   ├── css/
│   │   └── style.css   # Estilos (variáveis CSS, responsivo)
│   ├── js/
│   │   └── main.js     # Carrossel, carrinho, filtros, formulário
│   └── img/            # Imagens otimizadas (.jpg / .png)
├── LICENSE
└── README.md
```

## 🖥️ Como executar localmente

Como o site é 100% estático, não há nada para instalar.

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/eyze-coffee.git
cd eyze-coffee

# 2. Abra o index.html no navegador
#    (ou use um servidor local, opcional)
python3 -m http.server 8000
# acesse http://localhost:8000
```

## 🌐 Publicar no GitHub Pages

Como todos os arquivos `.html` ficam na **raiz** do repositório, basta:

1. Vá em **Settings → Pages**
2. Em **Source**, selecione a branch `main` e a pasta `/ (root)`
3. Salve — o site ficará disponível em
   `https://SEU-USUARIO.github.io/eyze-coffee/`

## 🎨 Paleta de cores

| Cor | Hex |
| --- | --- |
| Espresso | `#2c1810` |
| Café | `#3c1c14` |
| Terracota (destaque) | `#ca5b2b` |
| Creme | `#f7f5ed` |
| Latte | `#c9b29b` |

**Tipografia:** [Fraunces](https://fonts.google.com/specimen/Fraunces) (títulos) ·
[Manrope](https://fonts.google.com/specimen/Manrope) (texto).

## 📄 Licença

Distribuído sob a licença incluída no arquivo [`LICENSE`](LICENSE).

---

<div align="center">
Feito com ☕ e muito CSS.
</div>
