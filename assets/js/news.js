//This imports the actual news links from data/news.json

export async function initNews() {
  const list = document.getElementById("news-list");
  if (!list) return;

  try {
    const response = await fetch("data/news.json");
    if (!response.ok) throw new Error("Failed to load news.json");

    const localNews = await response.json();

    localNews.forEach(item => {
      const card = document.createElement("article");
      card.className = "card news-item";

      const d = new Date(item.date);
      const prettyDate = d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });

      card.innerHTML = `
        <div class="news-item-head">
          <span class="dot" style="--dot:${item.dot || 'var(--accent)'}"></span>
          <h3 style="margin:0">
            <a href="${item.url}" target="_blank" rel="noopener" style="text-decoration:none">${item.title}</a>
          </h3>
        </div>
        <p class="small muted" style="margin:.2rem 0 .8rem">${item.source} • ${prettyDate}</p>
        <p>${item.excerpt}</p>
      `;
      list.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    list.innerHTML = "<p>Sorry, the news feed couldn't be loaded.</p>";
  }
}
